import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentUser: {name: "Anonymous"}, 
      messages: [],
      counter: 0
    }
  }    

 
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = () =>{
      console.log('server connected')
    }
    
    this.socket.addEventListener('message', (event) => {
      let message = JSON.parse(event.data)
      if(message.type === "counter"){
        this.setState({counter:message.data}) 
      }
      else{
        this.setState({ messages: [...this.state.messages, message] })
      }
    });
  }
  
  changeUser = (event) =>{
      const oldUser = this.state.currentUser.name
      const newUser = event.target.value ? event.target.value:"Anonymous" 
      const newUserName = {name:newUser}
      this.setState({currentUser: newUserName})
      if (oldUser !== newUser){
        const newNotification = {
          type: "postNotification",
          content: `${oldUser} has changed their name to ${newUser}`
        }
        this.socket.send(JSON.stringify(newNotification));
        
      }
     
  }

  addMessage = (event) =>{
    let textInput =  event.target.value
    if (event.key === "Enter" && textInput){
      let messages = this.state.messages
      const newMessage = {
        type:"postMessage",
        username: this.state.currentUser.name,
        content: textInput,
       }
       this.socket.send(JSON.stringify(newMessage));
       event.target.value = "";
      }
  }

  render() {
   
      return (
      <div>
        <NavBar counter = {this.state.counter}/>
        <MessageList messages = {this.state.messages}/>
        <ChatBar addMessage= {this.addMessage} changeUser = {this.changeUser} currentUser= {this.state.currentUser.name}/>
      </div>
      );
      
  }
}
export default App;
