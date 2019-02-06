import React from 'react';


export const HeaderText = (props) => {
  return (
    <h2 className={"uk-text-center uk-header-marked "+props.className}>
      {props.children}
    </h2>
  );
}

export const Header2Text = (props) => {
  return (
    <h3 className={"uk-h2 uk-text-primary "+props.className}>
      {props.children}
    </h3>
  );
}