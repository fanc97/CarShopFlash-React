import React from "react";

import { firebase } from "../../config";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Page from "../../common/Page";
import ChatList from "../../components/chat/chatList/ChatList";
import { withStyles } from "@material-ui/styles";
import styles from "./MessageStyle";
import { Button } from "@material-ui/core";
import ChatView from "../../components/chat/chatView/ChatView";
import ChatTextBox from "../../components/chat/chatTextBox/ChatTextBox";
import NewChat from "../../components/chat/newChat/NewChat";

class Message extends Page {
  constructor(props) {
    super(props);
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      chats: [],
      email: "",
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", this.props.user.email)
      .onSnapshot(async (res) => {
        const chats = res.docs.map((_doc) => _doc.data());
        await this.setState({ email: this.props.user.email, chats: chats });
      });
  }

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  selectedChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex });
    this.messageRead();
  };

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (_user) => _user !== this.props.user.email
      )[0]
    );
    if (this.clickendChatWhereNotSend(this.state.selectedChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
    }
  };

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  };

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find((_chat) =>
      usersInChat.every((_user) => _chat.users.includes(_user))
    );
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email,
          },
        ],
        users: [this.state.email, chatObj.sendTo],
        receiverHasRead: false,
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };

  clickendChatWhereNotSend = (chatIndex) =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.props.user.email;

  submitMessage = (message) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (_usr) => _usr !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.props.user.email,
          message: message,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };

  buildDocKey = (friend) => [this.props.user.email, friend].sort().join(":");

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.list}>
          <ChatList
            history={this.props.history}
            newChatBtnClickedFn={this.newChatBtnClicked}
            selectChatFn={this.selectedChat}
            chats={this.state.chats}
            userEmail={this.props.user.email}
            selecetedChatIndex={this.state.selectedChat}
          />
        </div>
        <div className={classes.chatView}>
          {this.state.newChatFormVisible ? null : (
            <ChatView
              chat={this.state.chats[this.state.selectedChat]}
              user={this.props.user}
            />
          )}
          {this.state.selectedChat !== null &&
          !this.state.newChatFormVisible ? (
            <ChatTextBox
              messageReadFn={this.messageRead}
              userClickedInputFn={this.messageRead}
              submitMessageFn={this.submitMessage}
            />
          ) : null}
          {this.state.newChatFormVisible ? (
            <NewChat
              goToChatFn={this.goToChat}
              newChatSubmitFn={this.newChatSubmit}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeFullScreen: Actions.changeFullScreen,
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers, authReducers }) {
  return { menu: menuReducers, user: authReducers.user };
}

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))
);
