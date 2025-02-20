// import { initializeBricks, LEVELS } from "./Levels";
// import { BALL_SPEED_X, BALL_SPEED_Y, CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH } from "./Constants";

// export function resetBallAndPaddle(ballX, ballY, ballSpeedX, ballSpeedY, paddleX) {
//     ballX.current = CANVAS_WIDTH / 2;
//     ballY.current = CANVAS_HEIGHT - 30;
//     ballSpeedX.current = BALL_SPEED_X;
//     ballSpeedY.current = BALL_SPEED_Y;
//     paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
// }

// export function loseLife(livesRef, resetBallAndPaddleFn, setGameOver) {
//     if (livesRef.current > 1) {
//         livesRef.current -= 1;
//         resetBallAndPaddleFn();
//     } else {
//         setGameOver(true);
//         setTimeout(() => alert("Game Over!"), 100);
//     }
// }

// export function nextLevel(currentLevel, setCurrentLevel, setBricks, resetBallAndPaddleFn) {
//     if (currentLevel < LEVELS.length - 1) {
//         setCurrentLevel(prev => prev + 1);
//         setBricks(initializeBricks(currentLevel + 1));
//         resetBallAndPaddleFn();
//     } else {
//         alert("You completed all levels!");
//     }
// }
