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

  userHasAccepted(index) {
    this.props.userHasAcceptedFn(index);
  }
  userHasRejected(index) {
    this.props.userHasRejectedFn(index);
  }

  // userHasRejected = () => {
  //   console.log("rejected");
  // };

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
                  {msg.sender !== user &&
                  !msg.hasAccepted &&
                  !msg.hasRejected ? (
                    <>
                      <button
                        className={classes.acceptBtn}
                        onClick={() => this.userHasAccepted(index)}
                      >
                        akceptuj
                      </button>
                      <button
                        className={classes.rejectBtn}
                        onClick={() => this.userHasRejected(index)}
                      >
                        odrzuć
                      </button>
                    </>
                  ) : null}
                </div>
                {msg.hasAccepted === true ? (
                  msg.sender === user ? null : (
                    <h3 style={{ color: "green" }}>
                      Twoja prośba została zaakceptowana
                    </h3>
                  )
                ) : null}
                {msg.hasRejected === true ? (
                  msg.sender !== user ? null : (
                    <h3 style={{ color: "red" }}>
                      Twoja prośba została odrzucona
                    </h3>
                  )
                ) : null}
              </div>
            ))}
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
