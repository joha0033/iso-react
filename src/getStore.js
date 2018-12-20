import { createStore, combineReducers, applyMiddleware } from 'redux'
import { identity } from 'lodash'
import createSagaMIddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import fetchQuestionsSaga from './sagas/fetch-questions-saga'
import fetchQuestionSaga from './sagas/fetch-question-saga'
import * as reducers from './reducers'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'
// import createHistory from 'history'

export default function (history, defaultState) {
    const sagaMiddleware = createSagaMIddleware()
    const middleware = routerMiddleware(history)
    const middlewareChain = [middleware, sagaMiddleware]
    process.env.NODE_ENV === 'development'
        ? middlewareChain.push(createLogger())
        : null

    const store = createStore(combineReducers({
        ...reducers,
        router
    }), defaultState, applyMiddleware(...middlewareChain))
    sagaMiddleware.run(fetchQuestionsSaga)
    sagaMiddleware.run(fetchQuestionSaga)
    return store
}