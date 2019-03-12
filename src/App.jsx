import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";


export 




class App extends Component {

  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {loading: true};
  }
  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false}); // this triggers a re-render!
    }, 3000)
  }
  
  render() {
    if (this.state.loading){
      return <h1>Loading...</h1>
    } else {
    return (
    <div>
    <NavBar/>
    <Message/>
    <ChatBar/>
    </div>
    );
    }
  }
}
export default App;
