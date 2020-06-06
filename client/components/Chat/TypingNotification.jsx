import React from "react";

const TypingNotification = (props) => {
  const { typingUsers } = props;

  const singleTyper = (typingUsers) => {
    return `${typingUsers[0]} is typing...`;
  };

  const fewTypers = (typingUsers) => {
    return `${typingUsers.join(", ")} are typing...`;
  };

  const manyTypers = (typingUsers) => {
    let firstFew = typingUsers.slice(0, 3).join(", ") + " ";
    let lastFew = `${typingUsers.slice(3).length} more users`;
    return `${firstFew} + ${lastFew} are typing...`;
  };

  const getNotification = (typersArr) => {
    if (!typersArr.length) return "";
    if (typersArr.length === 1) return singleTyper(typersArr);
    else if (typersArr.length <= 3) return fewTypers(typersArr);
    else return manyTypers(typersArr);
  };
  return <div className="typing-display">{getNotification(typingUsers)}</div>;
};

export default TypingNotification;
