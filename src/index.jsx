import App from './App'
import ReactDom from 'React-dom'
import React from 'react';

const render = (_App) => {
    ReactDOM.render(
        <_App/>,
        document.getElementById('AppContainer')
    )
}

render(App)