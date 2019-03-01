import * as React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../components/App';

describe('App test', () => {
    it('render test', () => {
        const component = shallow(
            <App />
        );
        expect(component).toEqual(1);
    })
})