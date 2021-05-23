import "./styles.css";
import React from "react";
import {w} from "./const";
import Canvas from "./components/canvas";
import Letters from "./components/letters";
import Input from "./components/input";
import Button from "./components/button";
import Points from "./components/points";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/fonts.css";

export default function App() {
  // Array of the current word
  const [word, setWord] = React.useState([]);
  // This is a copy of the word arr but filled with X
  const [currGuess, setCurrGuess] = React.useState([]);
  // Current word guess
  const [inpWord, setInpWord] = React.useState("");
  // For classcom
  const canClass = React.useRef(null);
  // Points
  const [points, setPoints] = React.useState(0);
  // playagain btn display
  const [playAgain, setPlayAgain] = React.useState(false);
  // guessed letters
  const [guessedLetter, setGuessedLetters] = React.useState([]);

  // Gets random word
  const getWord = () => {
    // Set the current word to guess
    let wordInd = Math.floor(Math.random() * w.ANIMAL.length);
    // split so the word to guess is letters in an array
    let ww = w.ANIMAL[wordInd].split("");
    ww[0] = ww[0].toLocaleLowerCase();
    setWord(ww);
    // Create another array with 0 and 1 to represent right guess in that pos
    setCurrGuess(new Array(w.ANIMAL[wordInd].length).fill("X"));
  };

  React.useEffect(() => {
    getWord();
  }, []);

  React.useEffect(() => {
    // if canvas updates
    console.log("Canvasin uppfærðist");
    console.log("Guess word ARR IN UPDATE: ", currGuess);
    console.log(word);
    console.log("guessedLetter: ", guessedLetter);
  }, [currGuess, word, guessedLetter]);

  function checkIfLetterExist(letter) {
    return word.includes(letter);
  }

  function letterIndex(letter) {
    return word.indexOf(letter);
  }

  function checkWin(condition) {
    const handlFuncLoss = () => {
      // Function to prevent repition
      canClass.current.setWrongGuess("8");
      // Create timeout to display last image of hangman for 3 sec
      setTimeout(function () {
        canClass.current.setWrongGuess("loose");
        setPlayAgain(true);
      }, 3000);
    };

    console.log("CHEKCWIN: ", canClass.current.getTotalGuess() + 1);
    console.log("CHEKCWIN currGuess.length: ", currGuess.length);
    if (condition) {
      if (currGuess.length === canClass.current.getTotalGuess() + 1) {
        canClass.current.setWrongGuess("win");
        setTimeout(function () {
          setPlayAgain(true);
        }, 1500);
      } else if (canClass.current.getWrongGuesses() === 7) {
        handlFuncLoss();
      }
    } else {
      if (canClass.current.getWrongGuesses() === 7) {
        handlFuncLoss();
      }
    }
  }

  function handleHint() {
    let bool = true;
    // create a loop bc. if the letter is already showing we want to
    // roll again
    while (bool) {
      // random number for random letter
      let wordInd = Math.floor(Math.random() * word.length);
      if (currGuess[wordInd] === "X") {
        // add the letter to the display array
        currGuess[wordInd] = word[wordInd].toUpperCase();
        // Increment total guesses
        canClass.current.incrTotalGuess(false);
        // if the word finishes with hints
        checkWin(true);
        setCurrGuess([...currGuess]);
        bool = false;
      }
    }
  }

  function handlePlayAgain() {
    canClass.current.playAgain();
    getWord();
    setGuessedLetters([]);
    setPlayAgain(false);
  }

  function guess(e) {
    const dupesCount = (findLetter) => {
      let count = 0;
      word.map((w) => {
        w === findLetter ? (count += 1) : count;
        return count;
      });

      return count;
    };
    e.preventDefault();
    // if the inp is empty return
    if (inpWord === "") return;
    let inp = inpWord.toLocaleLowerCase();
    // if the letter does not exist draw & return
    if (!checkIfLetterExist(inp)) {
      // Increment total guesses
      canClass.current.incrTotalGuess(false);
      // check win/loss status
      checkWin(false);
      // add the letter to and array for display gussed letters
      let d = [...guessedLetter, inp.toUpperCase()];
      setGuessedLetters([...d]);
      //clear the input
      setInpWord("");
      return;
    }
    // Right Guess
    let dupeCount = dupesCount(inp);
    // only single letter matches
    if (dupeCount === 1) {
      // find the index of the letter.
      let letIndex = letterIndex(inp);
      currGuess[letIndex] = inp.toUpperCase();
      // Increment total guesses
      canClass.current.incrTotalGuess(true);
    } else {
      // find each letter and change it
      for (var i = 0; i < currGuess.length; i++) {
        if (word[i] === inp) {
          currGuess[i] = inp.toUpperCase();
        }
      }

      // if dupecount is 2 there are 2 letter that are the same.
      // to finish the came it follows counters so need to increment totalGuess = dupeCount - 1   <--- -1 bc outside loop it ads 1.
      canClass.current.incrTotalGuessBy(dupeCount);
    }

    // check if letter has any duplicates

    setCurrGuess([...currGuess]);
    // Clear the inp
    setInpWord("");
    // Add to score
    let tmp = points + 10;
    setPoints(tmp);

    // check win/loss status
    checkWin(true);
  }

  return (
    <div className='App'>
      {/* Points */}
      <div className='titlePoint-cont'>
        <div className='point-cont'>
          <Points points={points} />
        </div>
        {/* Points - END */}

        {/* GUESS title */}
        <div className='title-cont'>
          <h2>Guess The Word!</h2>
        </div>
      </div>
      {/* GUESS title - END */}

      {/* GUESS IMG DISPLAY */}
      <Canvas ref={canClass} />
      {/* GUESS IMG DISPLAY - END */}

      {/* GUESS LETTERS DISPLAY */}
      <Letters currGuess={currGuess} currwordOrGuessed={true} />
      {/* GUESS LETTERS DISPLAY - END */}

      {playAgain ? (
        <div className='playagain-container'>
          <Button
            draw={handlePlayAgain}
            title={"PLAY AGAIN"}
            className='playagain-btn'
          />
        </div>
      ) : null}

      <div className='lettersdispl-container'>
        <Input inpWord={inpWord} setInpWord={setInpWord} />
        <Button draw={guess} title={"Guess"} />
        <Button draw={handleHint} title={"Hint"} />
      </div>

      {/* GUESSED LETTERS DISPLAY */}
      <div className='guessedLetters-container'>
        <Letters currGuess={guessedLetter} currwordOrGuessed={false} />
      </div>
      {/* GUESSED LETTERS DISPLAY - END */}
    </div>
  );
}
