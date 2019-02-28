import { ADD_TODO, CHANGE_TEXT } from '../actions';

const initialState = {
    type: ADD_TODO,
    text: [],
    changeText: ''
}

const reducers = (state = initialState, action: any) => {
    switch(action.type) {
        case ADD_TODO:
            return {
                ...state,
                type: action.type,
                text: [
                    ...state.text,
                    action.text
                ]
            }
        case CHANGE_TEXT:
            return {
                ...state,
                type: action.type,
                changeText: action.changeText
            }
        default:
            return state;
    }
}

export default reducers;