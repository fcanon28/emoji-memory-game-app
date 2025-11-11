import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Score from "./components/Score";

function App() {
  const [emojiData, setEmojiData] = useState([]);
  const [currentEmojiId, setCurrentEmojiId] = useState("");
  const [clickedEmojiIds, setClickedEmojiIds] = useState([]);
  const [score, setScore] = useState(0);
  const [scoreRecord, setScoreRecord] = useState([0]);
  const [isGameOver, setIsGameOver] = useState(false);

  const xApiKey = "h3s9JuJlkeEA7+z3VMHUnA==U6wzrT1yslXm8rGv";
  const apiUrl = "https://api.api-ninjas.com/v1/emoji?group=smileys_emotion";

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          "X-Api-Key": xApiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEmojiData(response.data.slice(0, 12));
        // console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleCardClick(emojiId) {
    console.log("id/code", emojiId);
    setCurrentEmojiId(emojiId);

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
    setCurrentEmojiId(emojiId);
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
    console.log("tempEmojiData", tempEmojiData);
    return tempEmojiData;
  }

  console.log("clicked array", clickedEmojiIds);
  console.log("score record", scoreRecord);
  console.log("emojidata state", emojiData);

  return (
    <>
      <h2>Emoji Memory Game 🧠⚡</h2>
      <h3>
        Test your memory! Earn points by clicking on each image — but be
        careful, you can only click each one once!
      </h3>
      <Score score={score} bestScore={Math.max(...scoreRecord)} />
      {isGameOver ? <p className="gameover">Game Over!</p> : <p> </p>}

      <Card emojiData={emojiData} handleCardClick={handleCardClick} />
    </>
  );
}

export default App;
