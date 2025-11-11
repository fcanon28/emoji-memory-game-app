export default function Score({score, bestScore}) {
    return (
        <div className="scoreboard">
            <p>Score: <span>{score}</span></p>
            <p>Best Score: <span>{bestScore}</span></p>
        </div>
    )
}