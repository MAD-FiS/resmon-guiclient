import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppLayout from '../index.js';

Enzyme.configure({adapter: new Adapter()});

it('contains Res-Mon title', () => {
    const layout = shallow(<AppLayout location={{ pathname: 'test-pathname' }} />);
    expect(layout.find('.title').children().text()).toEqual('Res-Mon');
});
