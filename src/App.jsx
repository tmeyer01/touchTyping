
import './App.css';
import { generate } from './utils/words';
import { currentTime } from './utils/time';
import useKeyPress from './hooks/useKeyPress';
import React, { useState } from 'react';

const initialWords = generate();


function App() {
  
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );

  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  
  
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

 
  useKeyPress(key => {
    
    // Set the start time when the users starts typing the first Char 
    if (!startTime)  {
      setStartTime(currentTime());
    }
    
    // Temp varibles for outgoingChars and incomingChars
    // these will used multiple times thats why temp vars 
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    // Check to see if user hits correct keystroke
    // If wrong key is no change to the state of the typing line 
    if (key === currentChar) {
      //reduce the leftpadding by one char
      //this condition will be true for the first 20 crrect keystrokes
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      //apend the currentChar to outgoingChar
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      //Update the currentChar with the first character of incomingChars
      setCurrentChar(incomingChars.charAt(0));

      //Removing the frist character from incomingChars
      //check if the incomingChars stil has enough words
      //If not replendish 10 or more new words with generate 
      updatedIncomingChars = incomingChars.substr(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);

      //Recalculate WPM when the users is about to finish the word 
      if (incomingChars.charAt(0) === ' '){
        //increase word count 
        setWordCount(wordCount + 1);
        // calculate time passed  
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        //set wpm limit the bumber of decc places to two 
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }

      // update TypedChars by appending all keys that have been pressed
      const updatedTypedChars = typedChars + key;
      setTypedChars(updatedTypedChars);
      setAccuracy(
        ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
          2,
        ),
      );
  });

  return (
    <div className="App">
      JSblitz
    <p className="Character">
    <span className="Character-out">
      {(leftPadding + outgoingChars).slice(-20)}
    </span>
    <span className="Character-current">{currentChar}</span>
    <span>{incomingChars.substr(0, 20)}</span>

    </p>
      <h3> WPM: {wpm} | ACC: {accuracy}%</h3>
    </div>
  );
}

export default App;
