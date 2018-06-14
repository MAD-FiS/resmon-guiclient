export const fakeData = [
    {
        hostname: 'www.host1.fis.pl',
        metadata: [
            {
                id: 'OS',
                name: 'Os Version',
                value: 'Ubuntu 12.2'
            },
            {
                id: 'MAX_RAM',
                name: 'Max RAM',
                value: '12 GB'
            }
        ],
        metrics: [
            {
                id: 'CPU',
                description: 'CPU usage',
                parent_id: null,
                unit: '%',
                removable: false
            },{
                id: 'RAM',
                description: 'RAM usage',
                parent_id: null,
                unit: 'Mb',
                removable: false
            }, {
                id: 'ADV_1',
                description: 'Taka sobie metryka złożona',
                parent_id: 'CPU',
                unit: '%',
                moving_window_duration: 50,
                interval: 1,
                removable: true
            }, {
                id: 'RAM_ADV5',
                description: 'Inna metryka złożona (RAM)',
                parent_id: 'RAM',
                unit: 'Mb',
                moving_window_duration: 21,
                interval: 6,
                removable: false
            }
        ]
    },
    {
        hostname: 'www.host2.fis.pl',
        metadata: [
            {
                id: 'OS',
                name: 'Os Version',
                value: 'Ubuntu 12.2'
            }, {
                id: 'MAX_RAM',
                name: 'Max RAM',
                value: '12 GB'
            }, {
                id: 'DISC_USG',
                name: 'Disc usage',
                value: '38%'
            }
        ],
        metrics: [
            {
                id: 'CPU',
                description: 'CPU usage',
                parent_id: null,
                unit: '%',
                removable: false
            }, {
                id: 'ADV_1',
                description: 'Taka sobie metryka złożona',
                parent_id: 'CPU',
                unit: '%',
                moving_window_duration: 50,
                interval: 1,
                removable: true
            }
        ]
    }
];

export const fakeColumns = [

];

/*
const fakeModel = [
    {
        __editMode: false,
        key: 1,
        col1: { __editMode: false, __value: "val1" },
        col2: { __editMode: true, __value: "val2", __oldValue: "new value 2" },
    },
    {
        __editMode: false,
        key: 2,
        col1: { __editMode: false, __value: "val3" },
        col2: { __editMode: true, __value: "val4", __oldValue: "new value 4" },
    },
];
*/
