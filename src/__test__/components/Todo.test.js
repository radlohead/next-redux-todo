import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from '../../components/Todo';
import store from '../../stores';
configure({ adapter: new Adapter() });

it('Todo test', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Todo />
        </Provider>, 
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});