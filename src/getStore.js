import { createStore, combineReducers, applyMiddleware } from 'redux'
import { identity } from 'lodash'
import createSagaMIddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import fetchQuestionsSaga from './sagas/fetch-questions.saga'
import * as reducers from './reducers'

export default function (defaultState) {
    const sagaMiddleware = createSagaMIddleware()
    const middlewareChain = [sagaMiddleware]
    process.env.NODE_ENV === 'development'
        ? middlewareChain.push(createLogger())
        : null

    const store = createStore(combineReducers({...reducers}), defaultState, applyMiddleware(...middlewareChain))
    sagaMiddleware.run(fetchQuestionsSaga)
    return store
}