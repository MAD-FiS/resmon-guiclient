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

const mapData = (data, withDataLabel) => {
    if (withDataLabel) {
        return data.map(({ time, value }, i) => ({
            x: moment(time + 'Z').valueOf(),
            y: value
        }));
    } else {
        return data.map(({ time, value }) => [ moment(time).valueOf(), value ]);
    }
};

class ChartEngine extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.metric1Measurements !== nextProps.metric1Measurements
            || this.props.metric2Measurements !== nextProps.metric2Measurements;
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate(prevProps) {
        if (this.props.metric1LastUpdate && this.props.metric1LastUpdate !== prevProps.metric1LastUpdate) {
            this.addPoints();
        }
        else {
            this.destroyChart();
            this.createChart();
        }
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    addPoints() {
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
    }

    createChart() {
        const {
            metric1Info, metric1Measurements,
            metric2Info, metric2Measurements,
            navigatorDisabled, withDataLabel
        } = this.props;
        let yAxis = [
            {
                id: metric1Info.id,
                title: {
                    text: metric1Info.id
                },
                labels: {
                    format: '{value}' + metric1Info.unit
                },
                opposite: false
            }
        ];
        let series = Object.entries(metric1Measurements).map(([ host, data ]) => ({
            name: `${metric1Info.id}, ${host}`,
            id: `${metric1Info.id}:${host}`,
            data: mapData(data, withDataLabel),
            color: strToColor(host),
            yAxis: metric1Info.id,
            tooltip: {
                valueSuffix: metric1Info.unit
            }
        }));
        if (metric2Measurements && Object.keys(metric2Measurements).length > 0) {
            yAxis.push({
                id: metric2Info.id,
                title: {
                    text: metric2Info.id
                },
                labels: {
                    format: '{value}' + metric2Info.unit
                },
                gridLineWidth: 0,
                opposite: true
            });
            series = series.concat(Object.entries(metric2Measurements || []).map(([ host, data ]) => ({
                name: `${metric2Info.id}, ${host}`,
                id: `${metric2Info.id}:${host}`,
                data: mapData(data, withDataLabel),
                color: strToColor(host),
                yAxis: metric2Info.id,
                tooltip: {
                    valueSuffix: metric2Info.unit
                },
                dashStyle: 'Dash'
            })));
        }
        this.chart = Highcharts.stockChart(this.refs.chart, {
            series,
            plotOptions: {
                /*line: {
                    dataGrouping: {
                        enabled: false
                    }
                }*/
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
        return <div className="chart" ref="chart"></div>;
    }

}

export default ChartEngine;
