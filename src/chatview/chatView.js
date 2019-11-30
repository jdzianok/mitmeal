import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import smile from "../assets/smile.svg";
import yes from "../assets/yes.svg";
import no from "../assets/no.svg";
import pending from "../assets/pending.svg";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";

class ChatViewComponent extends Component {
  userHasAccepted(index) {
    this.props.userHasAcceptedFn(index);
  }
  userHasRejected(index) {
    this.props.userHasRejectedFn(index);
  }
  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { classes, chat, user } = this.props;

    if (chat === undefined) {
      return null;
    } else {
      return (
        <div>
          <main id="chatview-container" className={classes.content}>
            {chat.messages.map((msg, index) => (
              <div
                key={index}
                style={{ order: chat.messages.length - index }}
                className={classes.message}
              >
                <div className={classes.left}>
                  {msg.sender === user ? (
                    <div className={classes.icon}>
                      {!msg.hasAccepted && !msg.hasRejected ? (
                        <img src={pending} alt="pending" />
                      ) : msg.hasAccepted ? (
                        <img src={yes} alt="yes" />
                      ) : msg.hasRejected ? (
                        <img src={no} alt="no"></img>
                      ) : null}
                    </div>
                  ) : (
                    <div className={classes.icon}>
                      {!msg.hasAccepted && !msg.hasRejected ? (
                        <img src={smile} alt="smile" />
                      ) : msg.hasAccepted ? (
                        <img src={yes} alt="yes" />
                      ) : msg.hasRejected ? (
                        <img src={no} alt="no"></img>
                      ) : null}
                    </div>
                  )}
                  {msg.sender === user ? (
                    <div className={classes.info}>
                      {!msg.hasAccepted && !msg.hasRejected ? (
                        <>
                          <p className={classes.firstP}>
                            Twoja propozycja wymiany
                            <br /> została wysłana
                          </p>
                          <p className={classes.secondP}>
                            Czekaj na zaakceptowanie
                            <br /> oferty ze strony lokalu
                          </p>
                        </>
                      ) : msg.hasAccepted ? (
                        <>
                          <p className={classes.firstP}>
                            Twoja propozycja wymiany
                            <br /> została zaakceptowana!
                          </p>
                          <p className={classes.secondP}>
                            Czekaj na kontakt telefoniczny
                            <br /> w sprawie dostawy
                          </p>
                        </>
                      ) : msg.hasRejected ? (
                        <>
                          <p className={classes.firstP}>
                            Twoja propozycja wymiany
                            <br /> została odrzucona
                          </p>
                          <p className={classes.secondP}>
                            Nie martw się, na pewno znajdziesz innego partnera
                            do wymiany
                          </p>
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <div className={classes.info}>
                      {!msg.hasAccepted && !msg.hasRejected ? (
                        <>
                          <p className={classes.firstP}>
                            Masz nową propozycję wymiany od{" "}
                            {this.capitalizeFirstLetter(
                              msg.sender.split("@")[0]
                            )}
                            !
                          </p>
                          <button
                            className={classes.acceptBtn}
                            onClick={() => this.userHasAccepted(index)}
                          >
                            zaakceptuj
                          </button>
                          <button
                            className={classes.rejectBtn}
                            onClick={() => this.userHasRejected(index)}
                          >
                            odrzuć
                          </button>
                        </>
                      ) : msg.hasAccepted ? (
                        <p className={classes.firstP}>
                          Zaakceptowałeś propozycję wymiany z{" "}
                          {this.capitalizeFirstLetter(msg.sender.split("@")[0])}
                          !
                        </p>
                      ) : msg.hasRejected ? (
                        <p className={classes.firstP}>
                          Odrzuciłeś propozycję wymiany z{" "}
                          {this.capitalizeFirstLetter(msg.sender.split("@")[0])}
                          !
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className={classes.right}>
                  {msg.sender === user ? (
                    <>
                      <p className={classes.thirdP}>
                        Wymiana z{" "}
                        {this.capitalizeFirstLetter(
                          chat.users
                            .filter(usr => usr !== user)[0]
                            .split("@")[0]
                        )}
                      </p>
                      <div className={classes.offerExchange}>
                        <img src={arrowRight} alt="arrowR" />
                        <p className={classes.fourthP}>
                          Oferujesz: {msg.myOffer.item} &#215;
                          {msg.myOffer.quantity}
                        </p>
                      </div>
                      <div className={classes.offerExchange}>
                        <img src={arrowLeft} alt="arrowL" />
                        <p className={classes.fourthP}>
                          Otrzymujesz: {msg.whatIWant.item} &#215;
                          {msg.whatIWant.quantity}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={classes.thirdP}>
                        W wymianie z{" "}
                        {this.capitalizeFirstLetter(msg.sender.split("@")[0])}
                      </p>
                      <div className={classes.offerExchange}>
                        <img src={arrowRight} alt="arrowR" />
                        <p className={classes.fourthP}>
                          Oferujesz: {msg.whatIWant.item} &#215;
                          {msg.whatIWant.quantity}
                        </p>
                      </div>
                      <div className={classes.offerExchange}>
                        <img src={arrowLeft} alt="arrowL" />
                        <p className={classes.fourthP}>
                          Otrzymujesz: {msg.myOffer.item} &#215;
                          {msg.myOffer.quantity}
                        </p>
                      </div>
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
