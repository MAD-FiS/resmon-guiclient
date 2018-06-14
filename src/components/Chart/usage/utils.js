import moment from 'moment';

export const metrices = {
    'CPU': {
        unit: '%',
        hosts: [
            'host1.agh.edu.pl',
            'host2.agh.edu.pl',
            'host3.agh.edu.pl',
            'host4.agh.edu.pl',
            'host5.agh.edu.pl'
        ]
    },
    'CPU1': {
        unit: '%',
        hosts: [
            'host1.agh.edu.pl',
            'host2.agh.edu.pl',
            'host4.agh.edu.pl'
        ]
    },
    'CPU2': {
        unit: '%',
        hosts: [
            'host1.agh.edu.pl',
            'host2.agh.edu.pl',
            'host4.agh.edu.pl'
        ]
    },
    'RAM': {
        unit: 'GB',
        hosts: [
            'host1.agh.edu.pl',
            'host2.agh.edu.pl',
            'host3.agh.edu.pl',
            'host4.agh.edu.pl',
            'host5.agh.edu.pl'
        ]
    },
    'Disk': {
        unit: 'MB',
        hosts: [
            'host1.agh.edu.pl',
            'host2.agh.edu.pl',
            'host3.agh.edu.pl',
            'host4.agh.edu.pl',
            'host5.agh.edu.pl'
        ]
    },
    'Complex 1': {
        unit: '%',
        hosts: [
            'host1.agh.edu.pl',
            'host4.agh.edu.pl'
        ]
    },
    'Complex 2': {
        unit: '%',
        hosts: [
            'host3.agh.edu.pl',
            'host4.agh.edu.pl'
        ]
    }
};

const steps = 60 * 60 * 24 / 5;

const getSeriesDayTemplate = () => {
    const startVal = 20 * Math.random() + 3;
    let val = startVal;
    const data = Array.from({ length: steps }).map(() => {
        val += (Math.random() - 0.5);
        return val;
    });
    const diff = val - startVal;
    return data.map((value, i) => value - (diff * i / steps));
};

const seriesTemplates = Object.entries(metrices).reduce((metricCumm, [ metric, metricData ]) => {
    return Object.assign({
        [metric]: metricData.hosts.reduce((hostCumm, host) => {
            return Object.assign({
                [host]: getSeriesDayTemplate()
            }, hostCumm);
        }, {})
    }, metricCumm);
}, {});

export const getData = (from, to, metric, hosts) => {
    const momStart = moment(from);
    const momEnd = moment(to);
    const diff5min = Math.floor(momEnd.diff(momStart, 'seconds') / 5);
    return Object.values(hosts).reduce((cumm, host) => {
        const template = seriesTemplates[metric][host];
        let momIter = moment(momStart);
        let templateIdx = Math.floor(momIter.unix() / 5);
        const measurements = Array.from({ length: diff5min }).map(() => {
            momIter = momIter.add(5, 'seconds');
            templateIdx = (templateIdx + 1) % steps;
            return {
                time: momIter.format(),
                value: template[templateIdx]
            };
        });
        return Object.assign({
            [host]: measurements
        }, cumm);
    }, {});
};
