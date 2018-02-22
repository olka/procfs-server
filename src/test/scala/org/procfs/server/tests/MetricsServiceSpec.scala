package org.procfs.server.tests

import akka.event.NoLogging
import akka.http.scaladsl.model.ContentTypes._
import akka.http.scaladsl.model.{MediaRange, MediaTypes}
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.headers.Accept
import akka.http.scaladsl.testkit.{RouteTestTimeout, ScalatestRouteTest}
import org.procfs.server.stream.MetricsService
import org.scalatest._
import org.scalatest.concurrent.{Eventually, IntegrationPatience}

import scala.concurrent.duration._

class MetricsServiceSpec extends AsyncFlatSpec with Matchers with ScalatestRouteTest with Eventually with IntegrationPatience{
  override def testConfigSource = "akka.loglevel = DEBUG"
  def config = testConfig
  val logger = NoLogging
  implicit val timeout = RouteTestTimeout(15.seconds)

  val AcceptCsv = Accept(MediaRange(MediaTypes.`text/csv`))

  val streamService = new MetricsService(1)

  "MetricsService" should "handle /metrics endpoint properly" in {
      Get(s"/metrics").withHeaders(AcceptCsv) ~> streamService.route ~> check {
        status shouldBe OK
        contentType shouldBe `text/csv(UTF-8)`
        responseAs[String] should  include  ("Example Domain")
    }
  }
}
