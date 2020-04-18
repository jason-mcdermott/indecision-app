import React from 'react'
import Action from './Action'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'

export default class IndecisionApp extends React.Component {
    state = {
        options: []
    }
    handleAddOption = (option)  => {
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat([option]) 
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options[randomNum])
    }
    handleDeleteOption = (option) => {
        this.setState((prevState) => ({ 
            options: prevState.options.filter((item) => item !== option)
        }));
    }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }
    componentDidMount() {
        try {
            const data = localStorage.getItem('options');
            const options = JSON.parse(data);
            if(options) {
                this.setState(() => ({ options }));
            }
        } catch(ex) {
            // do nothing
        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const data = JSON.stringify(this.state.options);
            localStorage.setItem('options', data);
        }
    }
    componentWillUnmount() {
        // will fire when component is removed
        console.log('componentWillUnmount fired')
    }
    render() {
        return (
            <div>
                <Header />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}/>
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}/>
                <AddOption 
                    handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}