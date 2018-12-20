import React from 'react'
import { connect } from 'react-redux'
import TagList from './tageList'

const QuestionsListItem = ( {title, tags} ) => (
    <div className="mb-3">
        <h3>{title}</h3>
        <TagList tags={tags} />
    </div>
)

const QuestionsList = ({ questions }) => (
    <div>
        { 
            questions && questions.length 
                ?   <div>
                        { questions.map(question => <QuestionsListItem key={question.question_id} { ...question}/>) }
                    </div>
                :   <div>
                        ... Loading Questions...
                    </div>
        }
    </div>
)

const mapStateToProps =({questions})=>({
    questions
})

export default connect(mapStateToProps)(QuestionsList)