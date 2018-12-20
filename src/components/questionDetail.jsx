import React from 'react';
import Markdown from 'react-markdown'
// import htmlParser from 'react-markdown/plugins/html-parser'
import TagsList from './tagsList'
import { connect } from 'react-redux'

const QuestionDetailDisplay = ({
    title, body, answer_count, tags
}) => {
    console.log('this comp is HIT@');
    
    return ( <div>
        <h3>{title}</h3>
        {
            body 
            ? (
                <div>
                    <div className='mb-2'>
                        <TagsList tags={tags} />
                    </div>
                    <Markdown source={body} escapeHTML={false}/>
                    <div>
                        {answer_count} Answers
                    </div>
                </div>
            )
            : (<div>... Question is loading...</div>)  
        }
    </div> )
}

const mapStateToProps = (state, ownProps)=>({
    ...state.questions.find(({question_id}) => question_id == ownProps.question_id)
})
 
export default connect(mapStateToProps)(QuestionDetailDisplay);