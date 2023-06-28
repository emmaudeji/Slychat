import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '@/reducers';
import  {Footer}  from '../components/footer/Footer'
import {Heading} from '../components/heading/Heading'

const store = createStore(reducers, compose(applyMiddleware(thunk)));


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Heading/>
          <Component {...pageProps} />
       <Footer/>
    </Provider>)
}
