import React from 'react'

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }

    }
    handleChages = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('final', this.state.message)
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })

    }
    render() {
        const placeholderMsg = this.props.disabled === true? "Select Room First":"Type your message and hit ENTER";
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChages}
                    value={this.state.message}
                    placeholder={placeholderMsg}
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm