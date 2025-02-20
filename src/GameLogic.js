import { CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH } from "./Constants";
import { initializeBricks, LEVELS } from "./Levels";

export function resetBallAndPaddle(ballX, ballY, ballSpeedX, ballSpeedY, paddleX) {
    ballX.current = CANVAS_WIDTH / 2;
    ballY.current = CANVAS_HEIGHT - 30;
    ballSpeedX.current = 2;
    ballSpeedY.current = -2;
    paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH);
}

export function loseLife(livesRef, setGameOver, resetBallAndPaddle) {
    if (livesRef.current > 1) {
        livesRef.current -= 1;
        resetBallAndPaddle();
    } else {
        setGameOver(true);
        setTimeout(() => alert("Game Over!"), 100);
    }
}


export function checkLevelCompletion(bricks) {
    return bricks.every(column => column.every(brick => brick.status === 0));
}



export function advanceLevel(currentLevelIndex, setLevelIndex, setBricks, resetBallAndPaddle) {
    const nextLevelIndex = currentLevelIndex + 1; // ✅ Compute the next level

    if (nextLevelIndex < LEVELS.length) {
        setLevelIndex(nextLevelIndex); // ✅ Move to the next level
        setBricks(initializeBricks(nextLevelIndex)); // ✅ Initialize bricks for new level
        resetBallAndPaddle();
    } else {
        setTimeout(() => alert("You won! 🎉"), 100); // ✅ Delay to avoid state update conflict
        window.location.reload(); // ✅ Restart the game after winning
    }
}