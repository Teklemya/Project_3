/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import FlashcardDeck from './Flashcards/Flashcards'
function App() {

  const [count, setCount] = useState(0)

  return (
    <div className="header">
        <h1>Med Quiz</h1>
        <h3>Test your knowledge of your medications</h3>
        <h3>Count: {count}</h3>
      <FlashcardDeck />
    </div>
  
  )
}

export default App
