name := "procfs-server"
version := "1.0"
scalaVersion := "2.12.2"

coverageMinimum := 85
coverageFailOnMinimum := true
parallelExecution in Test := true
coverageExcludedPackages := "org.procfs.server.RestController;org.procfs.server.CorsSupport"

libraryDependencies ++= {
  val akkaV       = "2.5.4"
  val akkaHttpV   = "10.0.9"
  val scalaTestV  = "3.0.1"

  Seq(
    "com.typesafe.akka" %% "akka-actor" % akkaV,
    "com.typesafe.akka" %% "akka-stream" % akkaV,
    "com.typesafe.akka" %% "akka-http" % akkaHttpV,
    "com.typesafe.akka" %% "akka-http-testkit" % akkaHttpV,
    "org.scalatest"     %% "scalatest" % scalaTestV % "test")
}