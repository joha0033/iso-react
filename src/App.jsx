import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './components/questionsList'
import QuestionDetail from './components/questionDetail'
import {
    Route,
    Link
} from 'react-router-dom'

const AppDisplay = () => (
    <div >
            <h1>
            <Link to={`/`}>
                AJ Devs
            </Link>
            </h1>
            <h2>
            <Link to={`/`}>
                Blog
            </Link>
            <Link to={`/about`}>
                About
            </Link>
            <Link to={`/contact`}>
                Contact
            </Link>
            </h2>
            
            
        
        <div>
            {/* <QuestionList /> */}
            <Route exact path={`/`} 
                render={() => <QuestionList />}
            />
            <Route exact path={`/questions/:id`} 
                render={({match}) => <QuestionDetail 
                question_id={match.params.id}/>}
            />
        </div>
    </div>
)

const mapStateToProps =(state, ownProps)=>{
    return {
        ...state
    }
}

export default connect(mapStateToProps)(AppDisplay)