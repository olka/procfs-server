package org.procfs.server

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.typesafe.config.ConfigFactory
import org.procfs.server.stream.MetricsService

object RestController extends App with CorsSupport {
  implicit val system = ActorSystem()
  implicit val executor = system.dispatcher
  implicit val materializer = ActorMaterializer()
  val log = system.log

  val config = ConfigFactory.load()
  val metricsService = new MetricsService
  val webRoute = pathPrefix("") {getFromResourceDirectory("web/") ~ getFromResource("web/index.html")}

  val routes = metricsService.route ~ webRoute

  val bindingFuture = Http().bindAndHandle(corsHandler(routes), config.getString("http.interface"), config.getInt("http.port"))
  bindingFuture.map(_.localAddress).map(addr => s"Bound to $addr").foreach(log.info)
  sys.addShutdownHook(system.terminate())
}
