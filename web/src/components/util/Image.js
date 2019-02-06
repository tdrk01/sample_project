import React from 'react';

export const Image = (props) => {
  var src = imageUrl(props.src);
  return (
    <img id={props.id} className={props.className} src={src} alt="" />
  );
}

export const imageUrl = (url) => {
    if(url == null){
        return null;
    }
    return process.env.REACT_APP_STORAGE_PREFIX + "/"+ url;
}