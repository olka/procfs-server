var loadChart = echarts.init(document.getElementById('load_chart'));
loadChart.setOption({
    title: {
        text: 'Load average 1m',
    },
    series:
        {
            type: 'gauge',
            radius: '85%',
            min: 0,
            max: 2,
            itemStyle: {
                color: '#096'
            },
            pointer: {
                width: 5,
                length: 120
            },
            splitLine: {
                length: 20
            },
            axisLine: {
                lineStyle: {
                    width: 1
                }
            },

            detail: { formatter: '{value}' },
            data: [{ value: 0 }]
        }
});
