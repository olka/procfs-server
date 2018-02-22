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