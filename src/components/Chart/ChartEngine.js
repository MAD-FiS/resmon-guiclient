import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsBoost from 'highcharts/modules/boost';
import strToColor from '../../utils/strToColor';
import moment from 'moment';

HighchartsBoost(Highcharts);

Highcharts.setOptions({
    lang: {
        months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        shortMonths: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
        weekdays: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
    },
    global: {
        useUTC: false
    }
});

const metricGeneral = metric => metric[Object.keys(metric)[0]];

const mapData = (data, withDataLabel) => {
    if (withDataLabel) {
        return data.map(({ time, value }) => ({
            x: moment(time).valueOf(),
            y: value
        }));
    } else {
        return data.map(({ time, value }) => [ moment(time).valueOf(), value ]);
    }
};

class ChartEngine extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.metric1Measurements !== prevProps.metric1Measurements
            || this.props.metric1Measurements !== prevProps.metric2Measurements
        ) {
            this.destroyChart();
            this.createChart();
        }
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    /*addPoints() {
        const { metric1Info, metric1LastUpdate, metric1Measurements, metric1HostsSelected } = this.props;
        metric1HostsSelected
            .map(host => ({
                host,
                points: metric1Measurements[host].slice(-metric1LastUpdate[host])
            }))
            .forEach(({ host, points }) => {
                let series = this.chart.get(`${metric1Info.id}:${host}`);
                points.forEach(({ time, value }) => {
                    series.removePoint(0, false);
                    series.addPoint({
                        x: moment(time).valueOf(),
                        y: value
                    }, false);
                });
            });
        this.chart.redraw(true);
    }*/

    createChart() {
        const {
            metric1, metric1Measurements,
            metric2, metric2Measurements,
            navigatorDisabled, withDataLabel
        } = this.props;
        const metric1General = metricGeneral(metric1);
        let yAxis = [
            {
                id: metric1General.id,
                title: {
                    text: metric1General.id
                },
                labels: {
                    format: '{value}' + metric1General.unit
                },
                opposite: false
            }
        ];
        let series = Object.entries(metric1Measurements).map(([ host, data ]) => ({
            name: `${metric1General.id}, ${host}`,
            id: `${metric1General.id}:${host}`,
            data: mapData(data, withDataLabel),
            color: strToColor(host),
            yAxis: metric1General.id,
            tooltip: {
                valueSuffix: metric1General.unit
            }
        }));
        if (metric2Measurements && Object.keys(metric2Measurements).length > 0) {
            const metric2General = metricGeneral(metric2);
            yAxis.push({
                id: metric2General.id,
                title: {
                    text: metric2General.id
                },
                labels: {
                    format: '{value}' + metric2General.unit
                },
                gridLineWidth: 0,
                opposite: true
            });
            series = series.concat(Object.entries(metric2Measurements || []).map(([ host, data ]) => ({
                name: `${metric2General.id}, ${host}`,
                id: `${metric2General.id}:${host}`,
                data: mapData(data, withDataLabel),
                color: strToColor(host),
                yAxis: metric2General.id,
                tooltip: {
                    valueSuffix: metric2General.unit
                },
                dashStyle: 'Dash'
            })));
        }
        this.chart = Highcharts.stockChart(this.chartRef.current, {
            series,
            plotOptions: {
                series: {
                    dataLabels: {
                        formatter: function() {
                            if (this.point.index !== this.series.data.length - 1) {
                                return null;
                            }
                            return `
                                <span style="color: ${this.color};">${this.series.name}</span><br />
                                <strong style="color: ${this.color};">${Highcharts.numberFormat(this.y, this.series.tooltipOptions.valueDecimals)}${this.series.tooltipOptions.valueSuffix}</strong>
                            `;
                        },
                        enabled: withDataLabel
                    }
                }
            },
            chart: {
                backgroundColor: 'transparent'
            },
            tooltip: {
                split: true,
                crosshairs: true,
                valueDecimals: 2
            },
            boost: {
                useGPUTranslations: true
            },
            scrollbar: {
                liveRedraw: false,
                enabled: !navigatorDisabled
            },
            rangeSelector: {
                inputEnabled: false
            },
            navigator: {
                enabled: !navigatorDisabled
            },
            yAxis
        });
        this.chartLoadTimeout = setTimeout(() => this.chart.reflow());
    }

    destroyChart() {
        if (this.chartLoadTimeout) {
            clearTimeout(this.chartLoadTimeout);
        }
        this.chart.destroy();
        this.chart = null;
    }

    render() {
        return <div className={`chart ${this.props.invalidated ? 'indeterminate' : ''}`} ref={this.chartRef}></div>;
    }

}

export default ChartEngine;
