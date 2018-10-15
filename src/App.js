import React, {Component} from 'react';
import './App.css';

class Button extends Component {
    render() {
        return <button onClick={this.props.onClick}>{this.props.text}</button>
    }
}


class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            expression: '0',
            numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
            operations: {
                '+': (x, y) => x + y,
                '-': (x, y) => x - y,
                '/': (x, y) => x / y,
                '*': (x, y) => x * y
            },
            nextOperation: null,
            _isSecond: false,
            firstExp: null,
            secondExp: null
        }
    }

    click(text) {
        this.setState((prevState) => {
            if (this.state._isSecond) {
                return {secondExp: (prevState.secondExp == null ? text : prevState.secondExp + text)}
            } else {
                return {firstExp: (prevState.firstExp == null ? text : prevState.firstExp + text)}
            }
        })
    }

    setOperation(operation) {
        this.run();
        this.setState({
            nextOperation: operation,
            _isSecond: true
        })
    }

    clear() {
        this.setState({
            nextOperation: null,
            _isSecond: false,
            firstExp: null,
            secondExp: null
        })
    }

    run() {
        if (this.state.firstExp !== null && this.state.secondExp !== null) {
            this.setState({
                nextOperation: null,
                _isSecond: null,
                firstExp: this.state.operations[this.state.nextOperation](parseFloat(this.state.firstExp), parseFloat(this.state.secondExp)),
                secondExp: null
            })
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.firstExp == null ? '0' : this.state.firstExp} {this.state.nextOperation} {this.state.secondExp}</p>
                {this.state.numbers.map(number => <Button onClick={() => this.click(number)} text={number}/>)}
                {Object.keys(this.state.operations).map(operation => <Button onClick={() => this.setOperation(operation)} text={operation}/>)}
                <Button onClick={() => this.clear()} text='AC'/>
                <Button onClick={() => this.run()} text='='/>
            </div>
        )
    }
}

export default Calculator;
