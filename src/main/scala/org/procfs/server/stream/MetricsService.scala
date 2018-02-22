package org.procfs.server.stream

import akka.NotUsed
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.coding.{Deflate, Gzip, NoCoding}
import akka.http.scaladsl.common.EntityStreamingSupport
import akka.http.scaladsl.marshalling.{Marshaller, Marshalling}
import akka.http.scaladsl.model.headers.HttpEncodings
import akka.http.scaladsl.model.{ContentTypes, HttpRequest, HttpResponse}
import akka.http.scaladsl.server.Directives._
import akka.stream.{ActorMaterializer, ThrottleMode}
import akka.stream.scaladsl.Source
import akka.util.ByteString
import com.typesafe.config.ConfigFactory
import org.procfs.server.RestController.config

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

class MetricsService(max: Int=0) {
  implicit val system = ActorSystem()
  implicit val executor = system.dispatcher
  implicit val materializer = ActorMaterializer()

  implicit val csvStreaming = EntityStreamingSupport.csv()
  val refreshRate = ConfigFactory.load().getInt("metrics.refreshRate")
  val uri = ConfigFactory.load().getString("metrics.host")

  implicit val csvMarshaller = Marshaller.strict[ByteString, ByteString] { res =>
    Marshalling.WithFixedContentType(ContentTypes.`text/csv(UTF-8)`, ()=>res)
  }

  def metricsSource = {
    def responseFuture: Future[HttpResponse] = Http().singleRequest(HttpRequest(uri = uri)).map(decodeResponse(_))
    def response = Await.result(responseFuture, 2.second).entity.toStrict(500.millis).map {_.data.utf8String}
    def nextEvenTick(i: Int) = {
      if(max!=0 && i>max) {println(i);None}//for testing purpose
      else if(i>0)Some(i+1, response.map(res=>ByteString(res.split("\n")(1))))
      else Some(i+1, response.map(res=>ByteString(res)))
    }
    Source.unfold(0)(nextEvenTick)
  }

  def decodeResponse(response: HttpResponse): HttpResponse = {
    val decoder = response.encoding match {
      case HttpEncodings.gzip ⇒ Gzip
      case HttpEncodings.deflate ⇒ Deflate
      case HttpEncodings.identity ⇒ NoCoding
    }
    decoder.decodeMessage(response)
  }

  val route =
    pathPrefix("metrics") {
      pathEnd {
        (get) (encodeResponse(complete(metricsSource.throttle(1, per = refreshRate.seconds, 1, ThrottleMode.shaping))))
      }
    }
}