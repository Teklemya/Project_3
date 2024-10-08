import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import Medcardpair from '../MedCards/Medcard.jsx'; // Import the array of card pairs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Flashcard component to display individual cards
const Flashcard = ({ question, answer, handleNextCard, handleBackCard }) => {
  Flashcard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    handleNextCard: PropTypes.func.isRequired,
    handleBackCard: PropTypes.func.isRequired,
  };

  const [isFlipped, setIsFlipped] = useState(false); // State to handle flipping of card
  const [guess, setGuess] = useState(''); // State for the user's guess
  const [feedback, setFeedback] = useState(null); // State for feedback (correct/incorrect)
  const [isAnswered, setIsAnswered] = useState(false); // State to disable input after guess

  const handleClick = () => {
    setIsFlipped(!isFlipped); // Toggle between front and back side of the card
    setFeedback(null); // Reset feedback on flip
    setIsAnswered(false); // Allow new input on flip
    setGuess(''); // Reset guess input
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === answer.toLowerCase()) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setIsAnswered(true); // Disable input after the user has guessed
  };

  const getCardStyle = () => {
    if (feedback === 'correct') return { border: '2px solid green', backgroundColor: '#d4edda' };
    if (feedback === 'incorrect') return { border: '2px solid red', backgroundColor: '#f8d7da' };
    return { border: '1px solid #ccc' }; // Default styling
  };

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front side (question) */}
        <div
          onClick={handleClick}
          className="card front"
          style={{
            ...getCardStyle(),
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <h2>{question}</h2>
          <p>Click to see the answer</p>
        </div>

        {/* Back side (answer) */}
        <div
          onClick={handleClick}
          className="card back"
          style={{
            ...getCardStyle(),
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <h2>{answer}</h2>
          <p>Click to go back</p>
        </div>
      </ReactCardFlip>

      {/* Input for user's guess */}
      {!isFlipped && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={isAnswered} // Disable input after guess
            placeholder="Enter your guess"
            style={{ padding: '10px', width: '200px', marginRight: '10px' }}
          />
          <button
            onClick={handleGuess}
            disabled={isAnswered} // Disable button after guess
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Next Card Button */}
      <button
        onClick={() => {
          setIsFlipped(false); // Reset flip state when navigating
          handleNextCard();
        }}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Next Card &nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {/* Previous Card Button */}
      <button
        onClick={() => {
          setIsFlipped(false); // Reset flip state when navigating
          handleBackCard(); // Handle going back to the previous card
        }}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
        Previous Card
      </button>

      {/* Randomize Card Button */}
      <button
        onClick={() => {
          setIsFlipped(false); // Reset flip state when navigating
          handleNextCard(); // Call the same handler for randomizing (can be adjusted as needed)
        }}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Randomize Card
      </button>
    </div>
  );
};

// FlashcardDeck component to handle deck logic
const FlashcardDeck = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track the current card index

  // Function to handle moving to the next card
  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      (prevIndex + 1) % Medcardpair.length // Move forward and loop around if needed
    );
  };

  // Function to handle moving to the previous card
  const handleBackCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? Medcardpair.length - 1 : prevIndex - 1 // Move backward and loop to the last card if needed
    );
  };

  const currentCard = Medcardpair[currentCardIndex]; // Get the current card details

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Flashcard
        question={currentCard.question}
        answer={currentCard.answer}
        handleNextCard={handleNextCard}
        handleBackCard={handleBackCard} // Pass the handleBackCard function
      />
    </div>
  );
};

export default FlashcardDeck;
