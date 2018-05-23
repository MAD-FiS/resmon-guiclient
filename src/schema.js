import { schema } from 'normalizr';

export const metric = new schema.Entity('metrics');

export const host = new schema.Entity('hosts', {
    metrics: [metric]
}, {
    idAttribute: 'hostname'
});
