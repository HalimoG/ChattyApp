import React, {Component} from 'react';
import {generateRandomId} from './utl';
function Message(prop) {
  return ( 
    <div>
      <div className="message">
      <span className="message-username">{prop.message.username}</span>
      <span className="message-content">{prop.message.content}</span>
    </div>
    <div className="message system">
      {/* Anonymous1 changed their name to nomnom. */}
    </div>
    </div>)
}

class MessageList extends Component {
      
    render(){
      const message = this.props.messages.map((message) =>{
          return <Message key= {generateRandomId()} message= {message} />
      });
    
        return(
          <main className="messages">
            {message}
          </main>
        )
    }    
}

export default MessageList