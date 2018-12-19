import { createStore, combineReducers, applyMiddleware } from 'redux'
import { identity } from 'lodash'

export default function (defaultState ={ test: 'TESTER'}) {
    const store = createStore(identity, defaultState)
}