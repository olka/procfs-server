[![Coverage Status](https://coveralls.io/repos/github/olka/procfs-server/badge.svg?branch=master)](https://coveralls.io/github/olka/procfs-server?branch=master)
[![Build Status](https://travis-ci.org/olka/procfs-server.svg?branch=master)](https://travis-ci.org/olka/procfs-server)

Simple web GUI for [procfs-exporter](https://github.com/olka/procfs-exporter)

## Endpoints
`http://localhost:9000/metrics` - stream of metrics in CSV format
`http://localhost:9000` - GUI

![Execution example](https://raw.github.com/olka/procfs-server/master/src/test/resources/GX38z5N9D0.gif)

## Run

```
sbt run
```

Check configuration in src/main/resources/application.conf