import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";
import Score from "./components/Score";
import { fetchEmojis, fetchFlagEmojis } from "./services/emojiApi";

function App() {
  const [emojiData, setEmojiData] = useState([]);
  const [clickedEmojiIds, setClickedEmojiIds] = useState([]);
  const [score, setScore] = useState(0);
  const [scoreRecord, setScoreRecord] = useState([0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [error, setError] = useState("");
  const [gameChoice, setGameChoice] = useState(0);

  useEffect(() => {
    setScore(0);
    setScoreRecord([0])
    switch (gameChoice) {
      case 0:
        fetchEmojis()
          .then((data) => setEmojiData(data.slice(0, 12)))
          .catch((error) => setError(error.message));
        break;
      case 1:
        fetchFlagEmojis()
          .then((data) => setEmojiData(data.slice(0, 12)))
          .catch((error) => setError(error.message));
        break;
    }
  }, [gameChoice]);

  console.log("emojiData", emojiData);

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
      </nav>
      <h1>Emoji Memory Game 🧠⚡</h1>
      <h2>Test your memory! Earn points by clicking on each emoji</h2>
      <h2>But be careful, you can only click each one once!</h2>
      <Score score={score} bestScore={Math.max(...scoreRecord)} />
      {isGameOver ? <p className="gameover">Game Over!</p> : <p> </p>}

      <Card emojiData={emojiData} handleCardClick={handleCardClick} />
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default App;
