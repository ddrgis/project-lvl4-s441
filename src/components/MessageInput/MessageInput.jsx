import React, { Component } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

import MessageInputForm from '../MessageInputForm/MessageInputForm';
import { createMessage } from '../../store/actions';
import UserContext from '../../userContext';

const mapStateToProps = state => ({
  newMessageLoading: state.ui.messages.newMessageLoading,
});

const mapDispatchToProps = dispatch => ({
  handleMessageCreation: (channelId, message) =>
    dispatch(createMessage(channelId, message)),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class MessageInput extends Component {
  static contextType = UserContext;

  handleSubmit = values => {
    const userName = this.context;
    const { handleMessageCreation } = this.props;
    const message = { ...values, userName };
    handleMessageCreation(1, message);
  };

  render() {
    const { classNames, newMessageLoading } = this.props;
    const loaderSelfClasses = 'spinner-border spinner-border-sm text-dark mx-2';
    const loader = (
      <div
        className={cn(loaderSelfClasses, {
          invisible: !newMessageLoading,
          visible: newMessageLoading,
        })}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
    const containerSelfClasses = 'd-flex align-items-center';
    return (
      <div className={cn(classNames, containerSelfClasses)}>
        <MessageInputForm
          onSubmit={this.handleSubmit}
          className="input-group mb-3"
        />
        {loader}
      </div>
    );
  }
}
export default MessageInput;
