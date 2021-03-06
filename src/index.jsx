import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';
import getStore from './getStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const store = getStore(history)



const render = (_App) => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter store={store} history={history}>
                <_App/>
            </ConnectedRouter>
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
        render(App)
    }else{
        console.log('App is not mounting yet. hold your...');
        
    }
})

const fetchDataForLocation = (location)=> {
    if (location.pathname === "/"){
        store.dispatch({type:`REQUEST_FETCH_QUESTIONS`})
    }
    if (location.pathname.includes(`questions`)) {
        store.dispatch({type:`REQUEST_FETCH_QUESTION`,question_id:location.pathname.split('/')[2]});
    }
}

fetchDataForLocation(history.location)
history.listen(fetchDataForLocation)