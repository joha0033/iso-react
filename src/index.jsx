import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';
import getStore from './getStore'
import { Provider } from 'react-redux'

const store = getStore()

const fetchDataForLocation = ()=> {
    store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS'})
}

const render = (_App) => {
    ReactDOM.render(
        <Provider store={store}>
            <_App/>
        </Provider>,
        document.getElementById('AppContainer')
    )
}

if (module.hot) {
    module.hot.accept('./App', () => {
        const nextApp = require('./App').default
        render(nextApp)
    })
}

// render(App)
store.subscribe(() => {
    const state = store.getState()
    if( state.questions.length > 0 ) {
        console.log('Mounting App')
        render(App)
    }else{
        console.log('App is not mounting yet. hold your...');
        
    }
})
fetchDataForLocation()