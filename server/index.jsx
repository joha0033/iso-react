import express from "express";
import yields from "express-yields";
import fs from "fs-extra";
import webpack from 'webpack'
import { argv } from 'optimist'
import { get } from 'request-promise'
import { delay } from 'redux-saga'
import { question as questionURL, questions } from '../data/urls'
import getStore from '../src/getStore'
import { renderToString } from 'react-dom/server'
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory'
import { Provider } from 'react-redux'
import React from 'react'
import App from '../src/App'
import questionDetail from "../src/components/questionDetail";
import path from 'path'

/**
 * create port and express app
 */
const port = process.env.PORT || 3030
const app = express()

/**
 * use live data from API
 */
const useLiveData = argv.useLiveData === 'true'
const useServerRender = argv.useServerRender === 'true'

function * getQuestions () {
    let data
    useLiveData
        ? data = yield get(questions, {gzip:true})
        : data = yield fs.readFile('./data/data.json', 'utf-8')

    return JSON.parse(data)
}

function * getQuestion (question_id)  {
    let data 
    let questions
    let question
    useLiveData
        ? (data = yield get(questionURL(question_id), {gzip:true, json:true}))
        : ( questions = yield getQuestions(),
            question = questions.items
                .find(_question => ~~_question.question_id === ~~question_id),
            question.body = `Mock question body: ${question_id}`,
            data = { items: [question] } )

    return data
}

app.get('/api/questions', function * (req, res) {
    const data = yield getQuestions()
    yield delay(200)
    res.json(data)
})

app.get('/api/questions/:id', function * (req, res) {
    const data = yield getQuestion(req.params.id)
    yield delay(200)
    res.json(data)
})

/**
 * Adds a compiler during development mode
 */
if (process.env.NODE_ENV === 'development') {
    // get dev config from webpack
    const config = require('../webpack.config.dev.babel').default

    // create webpack compiler - bundle.js output
    const compiler = webpack(config)

    // creates bundle.js in memory and updates automatically
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true // limits logs
    }))

    // adding hot reloading for pages to reload automatically on file changes
    app.use(require('webpack-hot-middleware')(compiler))
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')))
}

/**
 * creates routes with mulitple entry points wiht array
 */
app.get(['/', '/questions/:id'], function * (req, res) {
    let index = yield fs.readFile('./public/index.html', 'utf-8')
    const initialState = {
        questions: []
    }

    const history = createHistory({
        initialEntries:[req.path]
    })

    if(req.params.id){
        const question_id = req.params.id
        const response = yield getQuestion(question_id)
        const questionDetails = response.items[0]
        initialState.questions = [{...questionDetails, question_id}]
    } else {
        const questions = yield getQuestions()
        initialState.questions = questions.items
    }
    
    

    const store = getStore(history, initialState)

    if(useServerRender){
        const appRendered = renderToString(
            <Provider store={store}>
                <ConnectedRouter store={store} history={history}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        )
        index = index.replace(`<%= preloadedApplication %>`, appRendered)
    } else {
        index = index.replace(`<%= preloadedApplication %>`, `Loading some datas, wait... hold on.`)
    }

    
    res.send(index)
})
/**
 * listen on the specified port
 */
app.listen(port, '0.0.0.0', () => console.log(`App listening on ${port}`))