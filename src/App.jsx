import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Score from "./components/Score";

function App() {
  const [emojiData, setEmojiData] = useState([]);
  const [temp, setTemp] = useState(false)

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
  }, [temp])
  

  return (
    <>
      <h2>Emoji Memory Game</h2>
      <h3>
        Test your memory! Earn points by clicking on each image — but be
        careful, you can only click each one once!
      </h3>
      <Score />

      <Card emojiData={emojiData} />
      <button onClick={() => setTemp(!temp)}>temp</button>
    </>
  );
}

export default App;
