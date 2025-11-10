import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Score from "./components/Score";

function App() {
  const [emojiData, setEmojiData] = useState([]);
  const [currentEmojiId, setCurrentEmojiId] = useState("");
  const [clickedEmojiIds, setClickedEmojiIds] = useState([])

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
        setEmojiData(response.data);
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleCardClick(emojiId) {
    console.log("id/code", emojiId);
    setCurrentEmojiId(emojiId);

    if (clickedEmojiIds.includes(emojiId)) {
      console.log('Game over!');
      setClickedEmojiIds([])
      //add reset score logic here
      return
    }

    setClickedEmojiIds((prevIds) => [...prevIds, emojiId])
    setCurrentEmojiId(emojiId)
  }

  console.log("clicked array", clickedEmojiIds);

  return (
    <>
      <h2>Emoji Memory Game</h2>
      <h3>
        Test your memory! Earn points by clicking on each image — but be
        careful, you can only click each one once!
      </h3>
      <Score />

      <Card emojiData={emojiData} handleCardClick={handleCardClick} />
    </>
  );
}

export default App;
