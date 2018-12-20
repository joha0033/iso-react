import unionWith from 'lodash/unionWith'

export const questions =  (state = [], {type,questions}) => {
    const questionEquality = (a={}, b={})=> {
        return a.question_id === b.question_id
    }

    type==='FETCHED_QUESTIONS'
        ? state = unionWith(state, questions, questionEquality)
        : null

    return state
}