export default function Score() {
    let score = 0
    return (
        <div className="scoreboard">
            <p>Score: <span>{score}</span></p>
            <p>Best Score: <span>{score}</span></p>
        </div>
    )
}