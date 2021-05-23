import "../styles.css";
import React from "react";
import PropTypes from "prop-types";

export default function Letter(props) {
  return (
    <span className={`guessWord ${props.className}`}>{props.element}</span>
  );
}

Letter.propTypes = {
  element: PropTypes.string,
  className: PropTypes.string,
};
