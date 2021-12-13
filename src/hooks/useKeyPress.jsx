import { useState, useEffect } from 'react';

const useKeyPress = callback =>{
  // useState to create a state for the pressed Key
  // everytime a key is pressed setKeyPressed to update current key
  const [keyPressed, setKeyPressed] = useState();

  // useEffect where all operations take place. 
  useEffect(() => {

    //downHandler handler for when a key is down
    //update key pressed via conditions
    const downHandler = ({ key }) => { 
      if (keyPressed !== key && key.length === 1){
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    //upHandler the handler to see if a key is released
    //set the current key state to null 
    const upHandler = () => {
      setKeyPressed(null);
    }
    //register the handlers with the browsers window
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      //End of the useEffect return a fun. that does the cleanup
      //deregisters the handlers with the browsers window
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };

  });
  //returning the keypressed state to the caller
  return keyPressed;

};

export default useKeyPress;