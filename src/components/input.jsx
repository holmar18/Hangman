import "../styles.css";
import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function Input(props) {
  // For autoFocus on Stateupdate
  const textInput = React.useRef(null);

  React.useEffect(() => {
    // when the comp updates we want to autofocus again
    textInput.current.focus();
  }, [props.inpWord]);

  return (
    <InputGroup className='mb-3'>
      <InputGroup.Prepend>
        <InputGroup.Text id='inputGroup-sizing-default' className='points'>
          Enter a letter
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-label='Default'
        aria-describedby='inputGroup-sizing-default'
        value={props.inpWord}
        onChange={(e) => props.setInpWord(e.target.value)}
        ref={textInput}
        autoFocus
      />
    </InputGroup>
  );
}

Input.propTypes = {
  inpWord: PropTypes.string,
  textInput: PropTypes.string,
  setInpWord: PropTypes.func,
};
