import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class ChatViewComponent extends Component {
  state = {
    hasAccepted: false
  };
  // componentDidUpdate = () => {
  //   const container = document.getElementById("chatview-container");
  //   if (container) {
  //     container.scrollTo(0, container.scrollHeight);
  //   }
  // };

  userHasAccepted(msg, index) {
    this.props.userHasAcceptedFn(msg, index);
  }
  //  = msg => {
  //   console.log(msg);

  //   // this.setState({ hasAccepted: true });
  // };

  userHasRejected = () => {
    console.log("rejected");
  };

  render() {
    const { classes, chat, user } = this.props;

    if (chat === undefined) {
      return <main id="chatview-container" className={classes.content}></main>;
    } else {
      return (
        <div>
          <div className={classes.chatHeader}>
            Your conversation with {chat.users.filter(usr => usr !== user)[0]}
          </div>
          <main id="chatview-container" className={classes.content}>
            {chat.messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === user ? classes.userSent : classes.friendSent
                }
              >
                {msg.sender !== user ? (
                  <h2>{msg.sender.split("@")[0]} chce się z Tobą wymienić</h2>
                ) : null}
                <div>
                  {msg.sender !== user ? (
                    <p>Oferuje Ci:</p>
                  ) : (
                    <h3>
                      W wymianie z użytkownikiem "
                      {chat.users.filter(usr => usr !== user)[0].split("@")[0]}"
                      oferujesz:
                    </h3>
                  )}
                  <div>
                    {msg.myOffer.item} w ilości {msg.myOffer.quantity} szt.
                  </div>
                </div>
                <div>
                  {msg.sender !== user ? (
                    <p>Chce w zamian:</p>
                  ) : (
                    <p>Chcesz w zamian:</p>
                  )}
                  <div>
                    {msg.whatIWant.item} w ilości {msg.whatIWant.quantity} szt.
                  </div>
                </div>
                <div>
                  {msg.sender === user ? null : (
                    <>
                      <button
                        className={classes.acceptBtn}
                        onClick={() => this.userHasAccepted(msg, index)}
                      >
                        akceptuj
                      </button>
                      <button
                        className={classes.rejectBtn}
                        onClick={this.userHasRejected}
                      >
                        odrzuć
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
