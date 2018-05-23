const authApp = require('./auth').app; 
const getMonitor = require('./monitor'); 

authApp.listen(3001, () => console.log('Auth server is running on port 3001!'));

const repeatableMetrics = [
    {
        id: 'cpu',
        description: 'CPU Usage',
        parent_id: null,
        unit: 'MHz',
        moving_window_duration: 0,
        interval: 15,
        removable: false
    },
    {
        id: 'ram',
        description: 'RAM Usage',
        parent_id: null,
        unit: 'MB',
        moving_window_duration: 0,
        interval: 30,
        removable: false
    },
    {
        id: 'disk_perc',
        description: 'Disk Utilization',
        parent_id: null,
        unit: '%',
        moving_window_duration: 0,
        interval: 15,
        removable: false
    }
];

const cpx1 = {
    id: 'cpx_cpu_120_30',
    description: 'Custom RAM Usage',
    parent_id: 'cpu',
    unit: 'MHz',
    moving_window_duration: 120,
    interval: 30,
    removable: true
};

const cpx2 = {
    id: 'cpx_ram_240_60',
    description: 'Custom RAM Usage',
    parent_id: 'ram',
    unit: 'MB',
    moving_window_duration: 240,
    interval: 60,
    removable: false
};

const host1 = {
    hostname: 'host1.agh.edu.pl',
    metrics: [
        ...repeatableMetrics,
        cpx1
    ],
    metadata: [
        {
            id: 'os',
            name: 'Operating System',
            value: 'GNU/Linux Debian 9'
        },
        {
            id: 'max_ram',
            name: 'Total RAM',
            value: '32GB'
        }
    ]
};

const host2 = {
    hostname: 'host2.agh.edu.pl',
    metrics: [
        ...repeatableMetrics
    ],
    metadata: [
        {
            id: 'os',
            name: 'Operating System',
            value: 'GNU/Linux Ubuntu 16.04'
        },
        {
            id: 'max_ram',
            name: 'Total RAM',
            value: '16GB'
        }
    ]
};

const host3 = {
    hostname: 'host3.agh.edu.pl',
    metrics: [
        ...repeatableMetrics,
        cpx1,
        cpx2
    ],
    metadata: [
        {
            id: 'os',
            name: 'Operating System',
            value: 'MS Windows Server 2008'
        },
        {
            id: 'max_ram',
            name: 'Total RAM',
            value: '2GB'
        }
    ]
};

const host4 = {
    hostname: 'host4.agh.edu.pl',
    metrics: [
        ...repeatableMetrics,
        cpx2
    ],
    metadata: [
        {
            id: 'os',
            name: 'Operating System',
            value: 'Darvin'
        },
        {
            id: 'max_ram',
            name: 'Total RAM',
            value: '16GB'
        }
    ]
};

const host5 = {
    hostname: 'host5.agh.edu.pl',
    metrics: [
        ...repeatableMetrics,
        cpx1
    ],
    metadata: [
        {
            id: 'os',
            name: 'Operating System',
            value: 'MS Windows XP'
        },
        {
            id: 'max_ram',
            name: 'Total RAM',
            value: '2GB'
        }
    ]
};

const host6 = {
    hostname: 'host6.agh.edu.pl',
    metrics: [
        ...repeatableMetrics
    ],
    metadata: [
        {
            id: 'os',
            name: 'Operating System',
            value: 'GNU/Linux Debian 9'
        },
        {
            id: 'max_ram',
            name: 'Total RAM',
            value: '32GB'
        }
    ]
};

const monitorsConfig = [
    {
        port: 3002,
        hosts: [
            host1,
            host2,
            host3
        ]
    },
    {
        port: 3003,
        hosts: [
            host4
        ]
    },
    {
        port: 3004,
        hosts: [
            host5,
            host6
        ]
    }
];

monitorsConfig.forEach(({ port, hosts }) => {
    const monitorApp = getMonitor(hosts);
    monitorApp.listen(port, () => console.log('Monitor server is running on port ' + port + '!'));
});
