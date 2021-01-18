import React from "react";
import { CSSTransition } from "react-transition-group";

const Message = ({ type, title, setMessage, isSet }) => {
  return isSet ? (
    <CSSTransition timeout={500} classNames="message">
      <div className={`message ${type.toLowerCase()}-message`}>
        <h1>{`${type}: ${title}`}</h1>
        <span
          onClick={() => {
            setMessage({ type: null, title: "", isSet: false });
          }}
        >
          &times;
        </span>
      </div>
    </CSSTransition>
  ) : null;
};
export default Message;
