import React from "react";

export class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            age: props.initialAge,
            status:'none',
            counter: 0,
            homeLink: props.initialLinkName
        };
        // setTimeout(() => {
        //     this.setState({
        //         status: 1
        //     });
        // },3000);
        console.log("Constructor");
    }

    componentWillMount() {
       
            this.setState({
                status: 'willmount'
            });
             console.log("Component will mount",this.state.status);
       
    }

    componentDidMount() {
        
         this.setState({
                status: 'didMount'
            });
         console.log("Component did mount!",this.state.status);

    }

    componentWillReceiveProps(nextProps) {
        //console.log("Component will receive props", nextProps);
        this.setState({
                status: 'componentWillReceiveProps'
            });
         console.log("componentWillReceiveProps !",this.state.status);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log("Should Component update", nextProps, nextState);
        this.setState({
                status: 'shouldComponentUpdate'
            });
         console.log("shouldComponentUpdate !",this.state.status);
        // if (nextState.status === 1) {
        //     return false;
        // }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        //console.log("Component will update", nextProps, nextState);
        // this.setState({
        //         status: 'componentWillUpdate'
        //     });
        //  console.log("Component did mount!",this.state.status);
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log("Component did update", prevProps, prevState);
        // this.setState({
        //         status: 'componentDidUpdate'
        //     });
        //  console.log("Component did mount!",this.state.status);
    }

    componentWillUnmount() {
        //console.log("Component will unmount");
        this.setState({
                status: 'componentWillUnmount'
            });
         console.log("componentWillUnmount !",this.state.status);
    }

    onMakeOlder() {
        this.setState({
            age: this.state.age + 3
        });
    }

    onChangeLink() {
        this.props.changeLink(this.state.homeLink);
    }

    onHandleChange(event) {
        this.setState({
            homeLink: event.target.value
        });
    }
handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
    render() {
        console.log("render",this.state.status)
       if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
        return (
            <div>
            <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        
      </ErrorBoundary>
            <h1 onClick={this.handleClick.bind(this)}>{this.state.counter}</h1>
                <p>In a new Component!</p>
                <p>Your name is {this.props.name}, your age is {this.state.age}</p>
                <p>Status: {this.state.status}</p>
                <hr/>
                <button onClick={() => this.onMakeOlder()} className="btn btn-primary">Make me older!</button>
                <hr/>
                <button onClick={this.props.greet} className="btn btn-primary">Greet</button>
                <hr/>

                <input type="text" value={this.state.homeLink}
                       onChange={(event) => this.onHandleChange(event)} />
                <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header Link</button>
            </div>
        );
    }

}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
       return this.props.children;
  }  
}

function App() {
  return (
    <div>
    <ErrorBoundary>
        <Home/>
      </ErrorBoundary>
    </div>
    );
}

Home.propTypes = {
    name: React.PropTypes.string,
    initialAge: React.PropTypes.number,
    greet: React.PropTypes.func,
    initialLinkName: React.PropTypes.string
};