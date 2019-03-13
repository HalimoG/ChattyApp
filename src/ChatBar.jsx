import React, {Component} from 'react';


class ChatBar extends Component {
    constructor(){
    super();
    }
    
    render(){
        return (
            <footer className="chatbar">
                    <input className="chatbar-username" value ={this.props.username} />
                    <input onKeyPress = {this.props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
             </footer>
        )
    }
}


export default ChatBar