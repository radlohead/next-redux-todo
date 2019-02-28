import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

interface IAppProps {
    type: string;
    text: string;
    changeText: string;
    onAddTodo(e: string): void;
    onChangeText(e: string): void;
}

class App extends React.Component<IAppProps, {}> {
    constructor(props: IAppProps) {
        super(props);
    }
    public handleClick(e: Event): void {
        e.preventDefault();
        const { changeText, onAddTodo } = this.props;
        const refName: string = 'inputText';
        const ref = ReactDOM.findDOMNode(this.refs[refName]) as HTMLInputElement;
        
        onAddTodo(changeText);
        ref.value = '';
    }
    
    public render(): JSX.Element {
        const { text, onChangeText } = this.props;
        return (
            <>
                <input type="text" ref="inputText" onChange={e => onChangeText(e.target.value)} />
                <button onClick={this.handleClick.bind(this)}>click</button>
                <ul>
                    {(text as any).map((v: string) => <li key={v}>{v}</li>)}
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state: IAppProps) => {
    return {
        type: state.type,
        text: state.text,
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