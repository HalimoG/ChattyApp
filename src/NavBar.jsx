import React, {Component} from 'react';
const spanStyle = {
    float:'right',
    margin: '20px'
}

function NavBar(props){ 
    var user =props.counter > 1? "users":"user"
    return (
     
    <nav className="navbar">
        <span style = {spanStyle} >{props.counter} {user} online</span>
         <a href="/" className="navbar-brand">Chatty</a>
    </nav>

    )
}

export default NavBar