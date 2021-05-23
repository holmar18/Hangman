import "../styles.css";
import React from "react";
import PropTypes from "prop-types";
import Btn from "react-bootstrap/Button";

export default function Button(props) {
  return (
    <Btn
      variant='light'
      className='guess-btn'
      size='lg'
      onClick={(e) => props.draw(e)}>
      {props.title}
    </Btn>
  );
}

Button.propTypes = {
  draw: PropTypes.func,
  title: PropTypes.string,
};
