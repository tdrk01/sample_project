import React from 'react';

import black from "../../assets/images/logo/black.svg";
import white from "../../assets/images/logo/white.svg";
import gray from "../../assets/images/logo/gray.svg";
import icon from "../../assets/images/logo/icon.svg";

export const LogoB = (props) => {
    return (<img {...props} src={white} />);
}

export const Logo = (props) => {
    return (<img {...props} src={black} />);
}

export const LogoG = (props) => {
    return (<img {...props} src={gray} />);
}

export const LogoIcon = (props) => {
    return (<img {...props} src={icon} />);
}