import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './components/questionsList'

const AppDisplay = () => (
    <div>
        <h1>
            ISO REACT, ISO COOL
        </h1>
        <div>
            <QuestionList />
        </div>
    </div>
)

const mapStateToProps =(state, ownProps)=>{
    return {
        ...state
    }
}

export default connect(mapStateToProps)(AppDisplay)