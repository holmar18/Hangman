import "../styles.css";
import React from "react";
import Letter from "./letter";
import PropTypes from "prop-types";

export default function Letters(props) {
  return (
    <div className='word-container'>
      {props.currGuess.map((element, index) => {
        return (
          <React.Fragment key={props.index}>
            <Letter
              index={index}
              element={element}
              key={props.index}
              className={
                props.currwordOrGuessed && element !== "X"
                  ? "flip-diagonal-1-tr"
                  : !props.currwordOrGuessed
                  ? "vibrate-2"
                  : ""
              }
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

Letters.propTypes = {
  currGuess: PropTypes.array,
  currwordOrGuessed: PropTypes.bool,
};
