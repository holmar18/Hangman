import "../styles.css";
import React from "react";
import PropTypes from "prop-types";

export default function Points(props) {
  return (
    <span>
      <span className='points'>{"Points:  "}</span>
      {props.points}
    </span>
  );
}

Points.propTypes = {
  points: PropTypes.number,
};
