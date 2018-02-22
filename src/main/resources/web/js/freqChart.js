var freqChart = echarts.init(document.getElementById('freq_chart'));
freqChart.setOption({
    title: {
        text: 'CPU frequency'
    },
    tooltip: {},
    dataset: {
        source: [['cpu0_freq', 'cpu1_freq', 'ctxt_switches', 'uptime', 'last_pid', 'blocked', 'sirq_hi', 'sirq_timer', 'sirq_NetTx', 'sirq_NetRx', 'sirq_block', 'sirq_block_io_poll', 'sirq_tasklet', 'sirq_scheduler', 'sirq_hr_timer', 'sirq_rcu', 'sirq_total']],
    },
    xAxis: {
        type: 'category'
    },
    yAxis: [{
        type: 'value',
    }, {
        show: false,
        type: 'value',
    }],
    series: [{
        type: 'line',
        lineStyle: {
            normal: {
                width: 3,
                color: '#096'
            }
        },
        encode: {
            x: ['uptime'],
            y: ['cpu0_freq'],
            tooltip: ['cpu0_freq'],
        }
    },
    {
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2,
                color: '#cc0033'
            }
        },
        encode: {
            x: ['uptime'],
            y: ['cpu1_freq'],
            tooltip: ['cpu1_freq']
        }
    },
    {
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        lineStyle: {
            normal: {
                width: 1,
                color: '#c0c0c0'
            }
        },
        encode: {
            x: ['uptime'],
            y: ['ctxt_switches'],
            tooltip: ['ctxt_switches']
        }
    }
    ]
});