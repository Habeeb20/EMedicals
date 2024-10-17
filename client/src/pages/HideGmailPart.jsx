import React from 'react';

const HideGmailPart = ({ email }) => {

  const username = email.split('@')[0];

  return <span>{username}</span>;
};

export default HideGmailPart;
