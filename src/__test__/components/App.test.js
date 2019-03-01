import * as React from 'react';
import { Provider } from 'react-redux';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../stores';
import App from '../../components/App';
import { default as Todo } from '../../components/Todo';
configure({ adapter: new Adapter() });

describe('App test', () => {
    const component = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );

    it('render test', () => {
        expect(component.length).toEqual(1);
    });

    it('render Todo test', () => {
        expect(component.find(Todo).length).toEqual(1);
    });
});