import React, { useEffect, useState } from 'react'
import data from "./data.json"

const App = () => {

  const keys_1 = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p"
  ]

  const keys_2 = [
    "a", "s", "d", "f", "g", "h", "j", "k", "l"
  ]

  const keys_3 = [
    "z", "x", "c", "v", "b", "n", "m"
  ]

  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState(null);
  const [points, setPoints] = useState(0)

  const randomIndex = Math.floor(Math.random() * data.length)
  const randomWord = data[randomIndex]

  const initialGameState = {
    currentWord: randomWord,
    wordTyped: '',
    score: 0,
    completed: false,
  };

  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    const id = setInterval(() => setTimer((timer) => timer + 1), 1000)
    setIntervalId(id);
    return () => clearInterval(id)
  }, [])

  const handleKeyPress = (key) => {
    const { currentWord, wordTyped, score, completed } = gameState;

    if (completed) return;

    const nextWordTyped = wordTyped + key.target.textContent;
    const isCorrect = nextWordTyped === currentWord.substring(0, nextWordTyped.length);

    if (!isCorrect) {
      setGameState({
        ...gameState,
        score: score - 1,
      });
      return;
    }

    const nextScore = isCorrect ? score + 1 : score - 1;
    const nextCompleted = nextWordTyped === currentWord;

    const nextGameState = {
      currentWord,
      wordTyped: nextWordTyped,
      score: nextScore,
      completed: nextCompleted,
    };

    setGameState(nextGameState);

    if (nextCompleted) {
      setPoints(nextScore);
      clearInterval(intervalId);
    }
  };

  return (
    <>
      {gameState.completed ? 
      
      <div className='bg-gradient-to-b from-black to-violet-500 h-[100vh] flex flex-col items-center'>
        <div className='flex w-full h-40 justify-center text-4xl font-black mt-36 text-violet-200'>
          <h1>Hai totalizzato {points} punti in {timer} secondi</h1>
        </div>
        <button className="bg-violet-300 border-solid border-2 border-violet-900 rounded-md shadow-md shadow-black hover:bg-violet-700 hover:text-violet-200 font-extrabold text-2xl p-4"
                onClick={() => {window.location.reload()}}>Gioca di nuovo</button>
      </div>
      
      :
  
      <div className='bg-gradient-to-b from-black to-violet-500 h-[100vh] flex flex-col items-center'>
        <div className='flex w-full justify-between p-10 text-xl font-bold text-violet-200'>
          <h3>Punti: {gameState.score}</h3>
          <h3>Timer: {timer}</h3>
        </div>
        <div className='flex w-full h-40 justify-center text-4xl font-black mt-36 text-violet-200'>
          <h1><span className='text-green-600'>{gameState.currentWord.substring(0, gameState.wordTyped.length)}</span>{gameState.currentWord.substring(gameState.wordTyped.length)}</h1>
        </div>
        <div className='flex flex-col w-full items-center justify-center gap-3 text-lg font-semibold' >
          <div className='flex items-center justify-center gap-2 h-10'>
            {keys_1.map((key, i) => (
              <button key={i}
                className="bg-violet-300 w-8 h-full border-solid border-2 border-violet-900 rounded-md shadow-md shadow-black hover:bg-violet-700 hover:text-violet-200"
                onClick={handleKeyPress}
              >{key}</button>
            ))}
          </div>
          <div className='flex items-center justify-center gap-2 h-10'>
            {keys_2.map((key, i) => (
              <button key={i}
                className=" bg-violet-300  w-8 h-full border-solid border-2 border-violet-900 rounded-md shadow-md shadow-black hover:bg-violet-700 hover:text-violet-200"
                onClick={handleKeyPress}
              >{key}</button>
            ))}
          </div>
          <div className='flex items-center justify-center gap-2 h-10'>
            {keys_3.map((key, i) => (
              <button key={i}
                className=" bg-violet-300 w-8 h-full border-solid border-2 border-violet-900 rounded-md shadow-md shadow-black hover:bg-violet-700 hover:text-violet-200"
                onClick={handleKeyPress}
              >{key}</button>
            ))}
          </div>
        </div>
      </div>}
    </>
  )

}




export default App
