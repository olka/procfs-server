var timeframe = 30;
var data = [];
var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.status == 200) {
                aCallback(anHttpRequest.responseText);
            }
        }
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

function updateTimeframe(val) {
    timeframe = val;
};

var client = new HttpClient();


client.get(window.location.href + 'metrics', function (res) {
    data = res.split("\n").map(x => x.split(",").map(y => y.trim()))
    if (data.length > timeframe) data.splice(1, data.length - timeframe);
    cpuChart.setOption({
        series: {
            data: [{ value: data[data.length - 1][6], name: "user" },
            { value: data[data.length - 1][7], name: "sys" },
            { value: data[data.length - 1][8], name: "idle" },
            { value: data[data.length - 1][9], name: "wait_io" },
            { value: data[data.length - 1][10], name: "irq" },
            { value: data[data.length - 1][10], name: "soft_irq" },
            ]
        }
    });

    loadChart.setOption({
        series: {
            data: [{ value: data[data.length - 1][0] }]
        }
    });

    freqChart.setOption({
        dataset: {
            source: data
        }
    });

    irqChart.setOption({
        series: {
            data: [
                { name: 'Hi', value: data[data.length - 1][30] },
                { name: 'Timer', value: data[data.length - 1][31] },
                { name: 'NetTx', value: data[data.length - 1][32] },
                { name: 'NetRx', value: data[data.length - 1][33] },
                { name: 'Block', value: data[data.length - 1][34] },
                { name: 'Block IO Poll', value: data[data.length - 1][35] },
                { name: 'Tasklet', value: data[data.length - 1][36] },
                { name: 'Scheduler', value: data[data.length - 1][37] },
                { name: 'HR Timer', value: data[data.length - 1][38] },
                { name: 'RCU', value: data[data.length - 1][39] },
            ]
        }
    });
});