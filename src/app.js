class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.state = {
            options: []
        };
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
    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat([option]) 
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options[randomNum])
    }
    handleDeleteOption(option) {
        this.setState((prevState) => ({ 
            options: prevState.options.filter((item) => item !== option)
        }));
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
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

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>Put your life in the hands of a computer</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}>What should I do?</button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started.</p>}    
            <ol>
                {
                    props.options.map((option, idx) => 
                        <Option 
                            key={idx} 
                            item={option} 
                            handleDeleteOption={props.handleDeleteOption}/>)
                }
            </ol>
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            <li>{props.item}</li>
            <button onClick={(e) => {
                props.handleDeleteOption(props.item);
            }}>remove</button>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)

        this.setState(() => ({ error }));

        if(!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))