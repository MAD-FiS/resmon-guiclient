export const fakeData = [
    {
        col1: '195.254.125.41',
        col2: 'Wydział FiIS'
    },
    {
        col1: '25.245.120.65',
        col2: 'Katedra Informatyki'
    },
];

export const fakeColumns = [
    {
        name: 'Adres',
        id: 'col1',
        editable: true,
        sortable: true,
        width: '40%',
    },
    {
        name: 'Opis',
        id: 'col2',
        editable: true,
        sortable: true,
        width: '40%',
    },
    {
        name: 'Menu',
        type: 'menu',
        buttons: [
            {
                name: 'Edytuj',
                type: 'edit',
            },
            {
                name: 'Usuń',
                type: 'delete',
            },
        ]
    }
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
