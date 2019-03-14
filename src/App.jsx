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
      currentUser: {name: "Anonymous"}, 
      messages: [],
      counter: 0
                    }
                  }    

  socket = new WebSocket('ws://localhost:3001')
  componentDidMount() {
  this.socket.onopen = () =>{
    console.log('server connected')
  }
  this.socket.addEventListener('message', (event) => {
    let message = JSON.parse(event.data)
    console.log('received message...', message);
    this.setState({ messages: [...this.state.messages, message] })

  });
  this.socket.addEventListener('on', (event) => {
    let counter = JSON.parse(event.data)
    console.log('received counter...', counter);
    this.setState({ counter: counter })

  });

    console.log("componentDidMount <App />");

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

    if (event.key === "Enter"){
      let messages = this.state.messages
      const newMessage = {
        type:"postMessage",
        username: this.state.currentUser.name,
        content: event.target.value,
       }
       this.socket.send(JSON.stringify(newMessage));
       event.target.value = "";
      }
  }

  render() {
   
      return (
      <div>
      <NavBar/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar addMessage= {this.addMessage} changeUser = {this.changeUser} currentUser= {this.state.currentUser.name}/>
      </div>
      );
      
  }
}
export default App;
