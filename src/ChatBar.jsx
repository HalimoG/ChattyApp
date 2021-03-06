import React, {Component} from 'react';


class ChatBar extends Component {
    constructor(){
    super();
    }
    
    render(){
        return (
            <footer className="chatbar">
                    <input onBlur= {this.props.changeUser} className="chatbar-username" placeholder="Your Name (optional)"/>
                    <input onKeyPress = {this.props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
             </footer>
        )
    }
}


export default ChatBar