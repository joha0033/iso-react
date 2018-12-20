import React from 'react'
import { connect } from 'react-redux'
import TagList from './tagsList'
import { Link } from 'react-router-dom'

const QuestionsListItem = ( {title, tags, question_id} ) => (
    <div className="mb-3">
        <h3>{title}</h3>
        <div className="mb-2">
            <TagList tags={tags} />
        </div>
        <div>
            <Link to={`/questions/${question_id}`}>
                <button>more info.</button>
            </Link>
        </div>
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