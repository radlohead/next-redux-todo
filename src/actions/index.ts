export const ADD_TODO = 'ADD_TODO';
export const CHANGE_TEXT = 'ADD_CHANGE_TODO';

export const changeText = (changeText: string) => {
    return {
        type: CHANGE_TEXT,
        changeText
    }
}

export const addTodo = (text: string) => {
    return {
        type: ADD_TODO,
        text
    }
}