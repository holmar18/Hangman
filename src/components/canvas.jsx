import React, {Component} from "react";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalGuesses: 0,
      wrongGuesses: 0,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
    });
  };

  componentDidUpdate = () => {
    console.log("TOTAL GUESSES: ", this.state.totalGuesses);
    console.log("State: ", this.state);
  };

  incrTotalGuessBy = (val) => {
    const {totalGuesses} = this.state;
    console.log("INCR VAL: ", val);
    this.setState({...this.state, totalGuesses: totalGuesses + val});
  };

  incrTotalGuess = (isIncorrect) => {
    const {totalGuesses, wrongGuesses} = this.state;
    if (!isIncorrect) {
      this.setState({
        ...this.state,
        totalGuesses: totalGuesses + 1,
        wrongGuesses: wrongGuesses + 1,
      });
    } else {
      this.setState({...this.state, totalGuesses: totalGuesses + 1});
    }

    return wrongGuesses;
  };

  getTotalGuess = () => {
    return this.state.totalGuesses;
  };

  getWrongGuesses = () => {
    return this.state.wrongGuesses;
  };

  setWrongGuess = (inp) => {
    this.setState({...this.state, wrongGuesses: inp});
  };

  playAgain = () => {
    this.setState({...this.state, totalGuesses: 0, wrongGuesses: 0});
  };

  render() {
    const {wrongGuesses} = this.state;

    return (
      <div id='canvas'>
        <img
          src={`img/${wrongGuesses}.png`}
          alt='img'
          className='slide-in-fwd-center'
          style={{width: "100%", height: "100%", borderRadius: "0.9rem"}}
        />
      </div>
    );
  }
}
