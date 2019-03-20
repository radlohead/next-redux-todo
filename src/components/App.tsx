import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as Types from '../types';
import './App.scss';
import Todo from './Todo';

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

class App extends React.Component {
    constructor(props: IAppProps) {
        super(props);
    }

    public handleAddTodo(): void {
        const { changeText, onAddTodo, onChangeText }: any = this.props;
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
    
    public render(): JSX.Element {
        const { onChangeText }: any = this.props;
        return (
            <>
                <input 
                    type="text" 
                    ref="inputText" 
                    onChange={e => onChangeText(e.target.value)}
                    onKeyDown={this.handleKeyAddTodo.bind(this)} />
                <button onClick={this.handleAddTodo.bind(this)}>click</button>
                <Todo />
            </>
        )
    }
}

const mapStateToProps = (state: IAppProps) => {
    return {
        type: state.type,
        editing: state.editing,
        changeText: state.changeText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddTodo: bindActionCreators(actions.addTodo, dispatch),
        onChangeText: bindActionCreators(actions.changeText, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);