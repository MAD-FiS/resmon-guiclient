import React from 'react';
import { shallow } from 'enzyme';
import AppLayout from '../index.js';

it('contains Res-Mon title', () => {
    const layout = shallow(<AppLayout location={{ pathname: 'test-pathname' }}>Junk</AppLayout>);
    expect(layout.find('.title').children().text()).toEqual('Res-Mon');
});
