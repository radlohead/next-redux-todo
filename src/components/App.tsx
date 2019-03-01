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
    onChangeText(e: string): void;
}

class App extends React.Component<IAppProps, {}> {
    constructor(props: IAppProps) {
        super(props);
    }

    public handleAddTodo(e: Event): void {
        e.preventDefault();
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

    public handleDeleteTodo(id: string, e: Event): void {
        e.preventDefault();
        const { todo, onDeleteTodo } = this.props;
        const findIndex = (todo as any).findIndex(v => v.id === id);
        (todo as any).splice(findIndex, 1);
        
        onDeleteTodo(todo);
    }

    public handleEditTodo(id: string, e: Event): void {
        e.preventDefault();
        const { onEditTodo } = this.props;
        onEditTodo(id);
    }
    
    public render(): JSX.Element {
        const { editing, todo, onChangeText } = this.props;
        return (
            <>
                <input type="text" ref="inputText" onChange={e => onChangeText(e.target.value)} />
                <button onClick={this.handleAddTodo.bind(this)}>click</button>
                <ul>
                    {(todo as any).map((v: Types.ITodo) => {
                        return (
                            <li key={v.id} className={v.id === editing ? 'editing' : ''}>
                                <span className="text" onDoubleClick={this.handleEditTodo.bind(this, v.id)}>{v.text}</span>
                                <button onClick={this.handleDeleteTodo.bind(this, v.id)}>close</button>
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
        onChangeText: bindActionCreators(actions.changeText, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);