import React from 'react';

class SendMessageForm extends React.Component {

    //  constructor method to initialise the state
    constructor(){
        super()
        this.state = {
            message: ''
        }
        // binding "this" to handlechange 
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    // defining handlechange method updating state
    handleChange(e){
        this.setState ({
            message: e.target.value
        })
    }

    // Inverse data flow submitting data to parent APP.JS. Sendmessage method borrowed from app.js
    handleSubmit(e){    
        e.preventDefault()
        this.props.SendMessage(this.state.message)

        // cleaning up the input field automatically after sending message 
        this.setState({
            message: ''
        })
    }

    render(){
        return (
            <form 
                // event listener to send of message to chatkit
                onSubmit={this.handleChange.submit}
                className="send-message-form">
                <input 
                    // onchange event listener, whenever value changes,function specified in onchange is executed
                    onChange={this.handleChange}
                    // setting value of input field
                    value = {this.state.message}
                    placeholder="Type and Hit ENTER" type="text"/>
            </form>
        )
    }
}

export default SendMessageForm;