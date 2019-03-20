import * as React from 'react';
import Head from 'next/head';
import App from '../src/components/App';

class Index extends React.Component {
    public render(): JSX.Element {
        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="Description" content="Put your description here." />
                    <title>title test!!!</title>
                </Head>
                <App />
            </>
        )
    }
}

export default Index;