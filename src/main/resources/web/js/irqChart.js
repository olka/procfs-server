var irqChart = echarts.init(document.getElementById('irq_chart'));
irqChart.setOption({
    title: {
        text: 'Soft IRQs',
        padding: [0, 0, 20, 0]
    },
    xAxis: { type: 'category' },
    yAxis: { show: false },
    series: [{
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data) / 110;
        },
        label: {
            normal: {
                show: true,
                formatter: function (param) {
                    if ((Math.sqrt(param.data.value) / 100) > 10)
                        return param.data.name;
                    else return "";
                },
                position: 'bottom'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                }])
            }
        }
    }]
});