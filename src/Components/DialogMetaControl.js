import React from 'react';
import ChatStore from '../Stores/ChatStore';
import {getLastMessageDate} from '../Utils/Chat';
import './DialogMetaControl.css';

class DialogMetaControl extends React.Component {
    constructor(props){
        super(props);

        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount(){
        ChatStore.on('updateChatDraftMessage', this.onUpdate);
        ChatStore.on('updateChatLastMessage', this.onUpdate);
    }

    componentWillUnmount(){
        ChatStore.removeListener('updateChatDraftMessage', this.onUpdate);
        ChatStore.removeListener('updateChatLastMessage', this.onUpdate);
    }

    onUpdate(update) {
        if (!this.props.chatId) return;
        if (this.props.chatId !== update.chat_id) return;

        this.forceUpdate();
    }

    render() {
        const chat = ChatStore.get(this.props.chatId);

        const date = getLastMessageDate(chat);

        return (
            <React.Fragment>
                {date && <div className='dialog-meta-date'>{date}</div>}
            </React.Fragment>
        );
    }
}
export default DialogMetaControl;