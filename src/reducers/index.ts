import { ADD_TODO, DELETE_TODO, EDIT_TODO, SAVE_TODO, CHANGE_TEXT } from '../actions';
import * as Types from '../types';

interface IInitialState {
    type: string;
    todo: Types.ITodo[],
    editing: null|string,
    changeText: string;
}

const initialState: IInitialState = {
    type: ADD_TODO,
    todo: [],
    editing: null,
    changeText: ''
}

const reducers = (state = initialState, action: any) => {
    switch(action.type) {
        case ADD_TODO:
            return {
                ...state,
                type: action.type,
                todo: [...state.todo,
                    {
                        id: action.todo.id,
                        text: action.todo.text
                    }
                ]
            }
        case DELETE_TODO:
            return {
                ...state,
                type: action.type,
                todo: [...state.todo]
            }
        case EDIT_TODO:
            return {
                ...state,
                type: action.type,
                editing: action.editing
            }
        case SAVE_TODO:
            return {
                ...state,
                type: action.type,
                todo: [...state.todo]
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