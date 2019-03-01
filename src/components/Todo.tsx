import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../actions';
import * as Types from '../types';

interface ITodoProps {
    todo: Types.ITodo;
    editing: string;
    onEditTodo(e: string): void;
    onDeleteTodo(e: Types.ITodo): void;
    onSaveTodo(e: Types.ITodo): void;
}

class Todo extends React.Component<ITodoProps, {}> {
    public handleEditTodo(todos: Types.ITodo, e: Event): void {
        e.preventDefault();
        const { onEditTodo } = this.props;
        const refName = `editText_${todos.id}`;
        const ref = ReactDOM.findDOMNode(this.refs[refName]) as HTMLInputElement;
        
        onEditTodo(todos.id);
        ref.value = todos.text;
    }

    public handleDeleteTodo(id: string, e: Event): void {
        e.preventDefault();
        const { todo, onDeleteTodo } = this.props;
        const findIndex = (todo as any).findIndex(v => v.id === id);
        (todo as any).splice(findIndex, 1);
        
        onDeleteTodo(todo);
    }

    public handleBlur(e: Event): void {
        e.preventDefault();
        const { onEditTodo } = this.props;
        onEditTodo(null);
    }

    public handleSaveTodo(todos: Types.ITodo, e: KeyboardEvent): void {
        const { onSaveTodo, onEditTodo } = this.props;
        const refName = `editText_${todos.id}`;
        const ref = ReactDOM.findDOMNode(this.refs[refName]) as HTMLInputElement;
        todos.text = ref.value;

        if(e.keyCode !== 13) return;
        onSaveTodo(todos);
        onEditTodo(null);
    }

    public onFocus(): void {
        const { editing } = this.props;
        const refName = `editText_${editing}`;
        const ref = ReactDOM.findDOMNode(this.refs[refName]) as HTMLInputElement;

        if(editing) ref.focus();
    }

    componentDidUpdate() {
        this.onFocus();
    }

    public render(): JSX.Element {
        const { todo, editing } = this.props;
        return (
            <>
                <ul>
                    {(todo as any).map((v: Types.ITodo) => {
                        return (
                            <li key={v.id} className={v.id === editing ? 'editing' : ''}>
                                <span 
                                    className="text" 
                                    onDoubleClick={this.handleEditTodo.bind(this, v)}>{v.text}</span>
                                <button onClick={this.handleDeleteTodo.bind(this, v.id)}>X</button>
                                <input 
                                    type="text" 
                                    ref={`editText_${v.id}`} 
                                    className="edit__input"
                                    onBlur={this.handleBlur.bind(this)}
                                    onKeyDown={this.handleSaveTodo.bind(this, v)} />
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state: ITodoProps) => {
    return {
        todo: state.todo,
        editing: state.editing
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onEditTodo: bindActionCreators(actions.editTodo, dispatch),
        onDeleteTodo: bindActionCreators(actions.deleteTodo, dispatch),
        onSaveTodo: bindActionCreators(actions.saveTodo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);