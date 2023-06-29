import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '@/reducers';
import  {Footer}  from '../components/footer/Footer'
import {Heading} from '../components/heading/Heading'
import Head from 'next/head';

const store = createStore(reducers, compose(applyMiddleware(thunk)));


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Head>
        <title>{`Slychat`}</title>
        <link rel="icon" href="data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2300FF00'><text x='0' y='13' font-size='18'>S</text></svg>" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="keyword" content={`chat, app, Nextjs`}/>
        <meta name="author" content="Gogrene"/>
        <meta name="description" content={`Chat with your friends and save the memory`} />
      </Head>
        <Heading/>
          <Component {...pageProps} />
       <Footer/>
    </Provider>)
}
