import React, {Component} from 'react';

function Message(prop) {
  return ( 
    <div>
      <div className="message">
      <span className="message-username">{prop.message.username}</span>
      <span className="message-content">{prop.message.content}</span>
     </div>
    </div>)
}

function Notification(prop) {
  return ( 
    <div>
      <div className="notification">
      <span className="notification-content">{prop.message.content}</span>
    </div>
    </div>)
}

class MessageList extends Component {
      
    render(){
      const message = this.props.messages.map((message) =>{
          if( message.type === "incomingNotification"){
            return <Notification key={message.id}  message= {message}/>
          }
          else{
          return <Message key={message.id}  message= {message} />
        }
      });
    
        return(
          <main className="messages">
            {message}
          </main>
        )
    }    
}

export default MessageList