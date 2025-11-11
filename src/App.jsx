import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";
import Score from "./components/Score";
import {
  fetchEmojis,
  fetchFlagEmojis,
  fetchHandEmojis,
  fetchSportEmojis,
  fetchWarningEmojis,
} from "./services/emojiApi";

function App() {
  const [emojiData, setEmojiData] = useState([]);
  const [clickedEmojiIds, setClickedEmojiIds] = useState([]);
  const [score, setScore] = useState(0);
  const [scoreRecord, setScoreRecord] = useState([0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [error, setError] = useState("");
  const [gameChoice, setGameChoice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setScore(0);
    setScoreRecord([0]);
    setError("");
    setLoading(true);
    switch (gameChoice) {
      case 0:
        fetchEmojis()
          .then((data) => setEmojiData(data.slice(0, 20)))
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false));
        break;
      case 1:
        fetchFlagEmojis()
          .then((data) => setEmojiData(data.slice(0, 20)))
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false));
        break;
      case 2:
        fetchHandEmojis()
          .then((data) => setEmojiData(data.slice(0, 20)))
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false));
        break;
      case 3:
        fetchSportEmojis()
          .then((data) => setEmojiData(data.slice(0, 20)))
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false));
        break;
      case 4:
        fetchWarningEmojis()
          .then((data) => setEmojiData(data.slice(0, 13)))
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false));
        break;
      default:
        setLoading(false);
    }
  }, [gameChoice]);

  function handleCardClick(emojiId) {
    if (clickedEmojiIds.includes(emojiId)) {
      setClickedEmojiIds([]);
      setScore(0);
      setScoreRecord((prev) => [...prev, score]);
      setIsGameOver(true);
      setTimeout(() => {
        setIsGameOver(false);
      }, 1500);
      return;
    }

    setClickedEmojiIds((prevIds) => [...prevIds, emojiId]);
    setScore((prevScore) => prevScore + 1);
    setEmojiData(shuffleCards(emojiData));
  }

  function shuffleCards(emojiData) {
    const tempEmojiData = [...emojiData];
    for (let i = emojiData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempEmojiData[i], tempEmojiData[j]] = [
        tempEmojiData[j],
        tempEmojiData[i],
      ];
    }
    return tempEmojiData;
  }

  return (
    <>
      <nav className="navbar">
        <div key="smiley" onClick={() => setGameChoice(0)}>
          Smiley Emoji Memory Game
        </div>
        <div key="flag" onClick={() => setGameChoice(1)}>
          Flag Emoji Memory Game
        </div>
        <div key="hand" onClick={() => setGameChoice(2)}>
          Hand Emoji Memory Game
        </div>
        <div key="sport" onClick={() => setGameChoice(3)}>
          Sport Emoji Memory Game
        </div>
        <div key="warning" onClick={() => setGameChoice(4)}>
          Signs Emoji Memory Game
        </div>
      </nav>
      <h1>Emoji Memory Game 🧠⚡</h1>
      <h2>Test your memory! Earn points by clicking on each emoji</h2>
      <h2>But be careful, you can only click each one once!</h2>
      <Score score={score} bestScore={Math.max(...scoreRecord)} />
      {isGameOver ? <p className="gameover">Game Over!</p> : <p> </p>}

      {loading ? (
        <div className="spinner-overlay" aria-live="polite" aria-busy="true">
          <div className="spinner" />
        </div>
      ) : (
        <Card emojiData={emojiData} handleCardClick={handleCardClick} />
      )}

      {error && <p className="error">{error}</p>}
    </>
  );
}

export default App;
