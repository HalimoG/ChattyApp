import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

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
                         id: 11
                        },
                        {
                          username: "Anonymous",
                          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
                          id: 12
                        }
                      ]
                    }
                  }
  
  componentDidMount() {
   
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
  
      console.log(messages)
      this.setState({messages: messages})
  }, 2000);
  }
  
  render() {
   
      return (
      <div>
      <NavBar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser= {this.state.currentUser.name}/>
      </div>
      );
      
  }
}
export default App;
