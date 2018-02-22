
var cpuChart = echarts.init(document.getElementById('cpu_chart'));
cpuChart.setOption({
    title: {
        text: 'CPU usage'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {d}%"
    },
    series: [
        {
            type: 'pie',
            avoidLabelOverlap: false,
            radius: ['50%', '84%'],
            avoidLabelOverlap: true,
            labelLine: {
                show: false,
                length: 4,
            },
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    textStyle: {
                        fontSize: '22',
                        fontWeight: 'bold'
                    },

                    formatter: function (label) {
                        if (label.data.value > 2)
                            return label.data.name;
                        else return ""
                    }
                },
                emphasis: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                data: [{ value: 100 }]
            },
        }
    ]
});