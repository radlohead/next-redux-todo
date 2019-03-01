import * as Types from '../types';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_TEXT = 'ADD_CHANGE_TODO';

export const changeText = (changeText: string) => {
    return {
        type: CHANGE_TEXT,
        changeText
    }
}

export const addTodo = (todo: Types.ITodo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

export const deleteTodo = (todo: Types.ITodo) => {
    return {
        type: DELETE_TODO,
        todo
    }
}