import * as Types from '../types';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SAVE_TODO = 'SAVE_TODO';
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

export const editTodo = (editing: null|string) => {
    return {
        type: EDIT_TODO,
        editing
    }
}

export const saveTodo = (todo: Types.ITodo) => {
    return {
        type: SAVE_TODO,
        todo
    }
}