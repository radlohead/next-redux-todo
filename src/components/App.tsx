import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as Types from '../types';
import './App.scss';

interface IAppProps {
    type: string;
    todo: Types.ITodo;
    editing: null|string;
    changeText: string;
    onAddTodo(e: any): void;
    onDeleteTodo(e: any): void;
    onEditTodo(e: any): void;
    onSaveTodo(e: any): void;
    onChangeText(e: string): void;
}

class App extends React.Component<IAppProps, {}> {
    constructor(props: IAppProps) {
        super(props);
    }

    private editInput = null;

    public handleAddTodo(): void {
        const { changeText, onAddTodo, onChangeText } = this.props;
        const refName: string = 'inputText';
        const ref = ReactDOM.findDOMNode(this.refs[refName]) as HTMLInputElement;

        if(!changeText) return;
        onAddTodo({
            id: Date.now(),
            text: changeText
        });
        onChangeText('');
        ref.value = '';
    }

    public handleKeyAddTodo(e: KeyboardEvent): void {
        if(e.keyCode !== 13) return;
        this.handleAddTodo();
    }

    public handleDeleteTodo(id: string, e: Event): void {
        e.preventDefault();
        const { todo, onDeleteTodo } = this.props;
        const findIndex = (todo as any).findIndex(v => v.id === id);
        (todo as any).splice(findIndex, 1);
        
        onDeleteTodo(todo);
    }

    public handleEditTodo(todos: Types.ITodo, e: Event): void {
        e.preventDefault();
        const { onEditTodo } = this.props;
        const refName = `editText_${todos.id}`;
        const ref = ReactDOM.findDOMNode(this.refs[refName]) as HTMLInputElement;
        
        onEditTodo(todos.id);
        ref.value = todos.text;
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
        const { editing, todo, onChangeText } = this.props;
        return (
            <>
                <input 
                    type="text" 
                    ref="inputText" 
                    onChange={e => onChangeText(e.target.value)}
                    onKeyDown={this.handleKeyAddTodo.bind(this)} />
                <button onClick={this.handleAddTodo.bind(this)}>click</button>
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

const mapStateToProps = (state: IAppProps) => {
    return {
        type: state.type,
        todo: state.todo,
        editing: state.editing,
        changeText: state.changeText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddTodo: bindActionCreators(actions.addTodo, dispatch),
        onDeleteTodo: bindActionCreators(actions.deleteTodo, dispatch),
        onEditTodo: bindActionCreators(actions.editTodo, dispatch),
        onSaveTodo: bindActionCreators(actions.saveTodo, dispatch),
        onChangeText: bindActionCreators(actions.changeText, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);