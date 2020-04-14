// React component version:

class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.state = {
            visibility: false
        }
    }
    toggleDisplay() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.toggleDisplay}>
                    { this.state.visibility ? 'Hide details' : 'Show details'}
                </button>
                { 
                    this.state.visibility && (<p>Hey. These are some details you can now see!</p>) 
                }
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'));

// non-component version:

// let visibility = false;

// const toggleDisplay = () => {
//     visibility = !visibility;
//     renderApp()
// }

// const renderApp = () => {
//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggleDisplay}>
//                 { visibility ? 'Hide details' : 'Show details'}
//             </button>
//             { 
//                 visibility && (<p>Hey. These are some details you can now see!</p>) 
//             }
//         </div>
//     );

//     ReactDOM.render(template, appRoot);
// };

// let appRoot = document.getElementById('app');

// renderApp();