import './App.css'
import FlashcardDeck from './Flashcards/Flashcards'
function App() {

  return (
    <div className="header">
        <h1>Medicine Quiz</h1>
        <h3>Test your knowledge of your medications</h3>
        <h3>Count: 40</h3>
        
      <FlashcardDeck />
    </div>
  
  )
}

export default App
