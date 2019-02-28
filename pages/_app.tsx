import App, { Container } from 'next/app';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../src/reducers';

const store = createStore(
    reducer
);

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default MyApp;