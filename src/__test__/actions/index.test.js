import * as Types from '../../actions';

describe('actions test', () => {
    const mockText = 'change text';
    const mockTodo = {
        id: '141521515',
        text: 'mock todo test'
    }

    it('changeText test', () => {
        const mockData = {
            type: Types.CHANGE_TEXT,
            changeText: mockText
        };
        expect(Types.changeText(mockText)).toEqual(mockData);
    });
    
    it('addTodo test', () => {
        const mockData = {
            type: Types.ADD_TODO,
            todo: mockTodo
        }
        expect(Types.addTodo(mockTodo)).toEqual(mockData);
    });
    
    it('deleteTodo test', () => {
        const mockData = {
            type: Types.DELETE_TODO,
            todo: mockTodo
        }
        expect(Types.deleteTodo(mockTodo)).toEqual(mockData);
    });

    it('editTodo test', () => {
        const mockData = {
            type: Types.EDIT_TODO,
            editing: mockText
        }
        expect(Types.editTodo(mockText)).toEqual(mockData);
    });

    it('saveTodo test', () => {
        const mockData = {
            type: Types.SAVE_TODO,
            todo: mockTodo
        }
        expect(Types.saveTodo(mockTodo)).toEqual(mockData);
    });
});