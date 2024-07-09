import React from 'react';

const OpenLinkInBackground = ({ children }) => {
    const url="https://www.google.com";
  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    window.open(url , '_blank', 'noopener,noreferrer');
  };

  return (
    <a href={url} onClick={handleClick}>
      {children}
    </a>
  );
};

export default OpenLinkInBackground;
