import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";


export 




class App extends Component {

  constructor() {
    super();
    // this is the *only* time you should assign directly to state:
    this.state = {
      loading: true,
      currentUser: {name: "Bob"}, 
      messages: [
                  {
                         username: "Bob",
                         content: "Has anyone seen my marbles?",
                        },
                        {
                          username: "Anonymous",
                          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                        }
                      ]
                    }
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
      <ChatBar currentUser= {this.state.currentUser.name}/>
      </div>
      );
      }
  }
}
export default App;
