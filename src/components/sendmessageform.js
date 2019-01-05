import React from 'react';

class SendMessageForm extends React.Component {
    constructor(){
        super()
        this.state = {
            message: ''
        }
        this.handlechange = this.handleChange.bind(this)
        this.handlechange = this.handleSubmit.bind(this)
    }

    handlechange(e){
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render(){
        return(
            <form>
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input>
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type Your Mesasge Here"
                </input>
            </form>
        )
    }
}

export default SendMessageForm;