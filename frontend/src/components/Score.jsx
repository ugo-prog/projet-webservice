import React, { useState } from "react";
import './Score.css'

const Score = ({scoreInitial}) => {

    var initScore = scoreInitial || 0
    const [score, setScore] = useState(parseInt(initScore))

    return (
        <div className="grid">
            <button onClick={() => setScore((score) => score = score +1)}>+</button>
            <button onClick={() => setScore((score) => score = score-1)}>-</button>

            <p>Score initial : {scoreInitial}</p>
            <p>Score : {score}</p>
        </div>
    );
}

export default Score;