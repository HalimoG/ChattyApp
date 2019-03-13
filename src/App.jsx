import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import { generateRandomId } from './utl.js';

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
  
  addMessage = (event) =>{

    if (event.key === "Enter"){
      let messages = this.state.messages
       const newMessage = {
        username: event.target.previousSibling.value,
        content: event.target.value
       }
       messages.push(newMessage)
       console.log(messages)
       this.setState(messages);
       event.target.value = "";
      }
  }

  render() {
   
      return (
      <div>
      <NavBar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar addMessage= {this.addMessage} currentUser= {this.state.currentUser.name}/>
      </div>
      );
      
  }
}
export default App;
