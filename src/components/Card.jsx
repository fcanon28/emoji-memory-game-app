
export default function Card({ emojiData, handleCardClick }) {

  const cards = emojiData.slice(0, 8).map((emoji) => (
    <div className="card" key={emoji.code} onClick={() => handleCardClick(emoji.code)}>
      <img src={emoji.image} />
      <h2>{emoji.name}</h2>
    </div>
  ));

  return <div className="cards-container">{cards}</div>;
}
