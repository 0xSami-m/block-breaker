// import { checkLevelCompletion, advanceLevel } from "./GameLogic";


// export const checkBrickCollision = (ballX, ballY, ballSpeedY, bricks, brickWidth, brickHeight, updateTransactions, levelIndex, setLevelIndex, setBricks, resetBallAndPaddle) => {
//     let newBallSpeedY = ballSpeedY;
//     let allBricksCleared = true;
    
//     bricks.forEach((column) => {
//         column.forEach((brick) => {
//             if (brick.status === 1) {
//                 if (
//                     ballX > brick.x &&
//                     ballX < brick.x + brickWidth &&
//                     ballY > brick.y &&
//                     ballY < brick.y + brickHeight
//                 ) {
//                     newBallSpeedY = -ballSpeedY;
//                     brick.status = 0;
//                     updateTransactions();
//                 } else {
//                     allBricksCleared = false; // At least one brick remains
//                 }
//             }
//         });
//     });

//     if (allBricksCleared) {
//         advanceLevel(levelIndex, setLevelIndex, setBricks, resetBallAndPaddle);
//     }

//     return newBallSpeedY;
// };

// export const checkWallCollision = (ballX, ballY, ballRadius, ballSpeedX, ballSpeedY, canvasWidth, canvasHeight, updateTransactions) => {
//     let newBallSpeedX = ballSpeedX;
//     let newBallSpeedY = ballSpeedY;

//     if (ballX + ballRadius > canvasWidth || ballX - ballRadius < 0) {
//         newBallSpeedX = -ballSpeedX;
//         updateTransactions();
//     }

//     if (ballY - ballRadius < 0) {
//         newBallSpeedY = -ballSpeedY;
//         updateTransactions();
//     }

//     return { newBallSpeedX, newBallSpeedY };
// };

// export const checkPaddleCollision = (ballX, ballY, ballRadius, ballSpeedY, paddleX, paddleWidth, canvasHeight, updateTransactions) => {
//     let newBallSpeedY = ballSpeedY;
    
//     if (ballY + ballRadius > canvasHeight) {
//         if (ballX > paddleX.current && ballX < paddleX.current + paddleWidth) {
//             newBallSpeedY = -ballSpeedY;
//             updateTransactions();
//         } else {
//             return { newBallSpeedY, lostLife: true };
//         }
//     }

//     return { newBallSpeedY, lostLife: false };
// };

import { checkLevelCompletion, advanceLevel } from "./GameLogic";

export const checkBrickCollision = async (ballX, ballY, ballSpeedY, bricks, brickWidth, brickHeight, updateTransactions, levelIndex, setLevelIndex, setBricks, resetBallAndPaddle) => {
    let newBallSpeedY = ballSpeedY;
    let allBricksCleared = true;
    
    for (const column of bricks) {
        for (const brick of column) {
            if (brick.status === 1) {
                if (
                    ballX > brick.x &&
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight
                ) {
                    newBallSpeedY = -ballSpeedY;
                    brick.status = 0;
                    await updateTransactions();
                } else {
                    allBricksCleared = false;
                }
            }
        }
    }

    if (allBricksCleared) {
        advanceLevel(levelIndex, setLevelIndex, setBricks, resetBallAndPaddle);
    }

    return newBallSpeedY;
};

export const checkWallCollision = async (ballX, ballY, ballRadius, ballSpeedX, ballSpeedY, canvasWidth, canvasHeight, updateTransactions) => {
    let newBallSpeedX = ballSpeedX;
    let newBallSpeedY = ballSpeedY;

    if (ballX + ballRadius > canvasWidth || ballX - ballRadius < 0) {
        newBallSpeedX = -ballSpeedX;
        await updateTransactions();
    }

    if (ballY - ballRadius < 0) {
        newBallSpeedY = -ballSpeedY;
        await updateTransactions();
    }

    return { newBallSpeedX, newBallSpeedY };
};

export const checkPaddleCollision = async (ballX, ballY, ballRadius, ballSpeedY, paddleX, paddleWidth, canvasHeight, updateTransactions) => {
    let newBallSpeedY = ballSpeedY;
    
    if (ballY + ballRadius > canvasHeight) {
        if (ballX > paddleX.current && ballX < paddleX.current + paddleWidth) {
            newBallSpeedY = -ballSpeedY;
            await updateTransactions();
        } else {
            return { newBallSpeedY, lostLife: true };
        }
    }

    return { newBallSpeedY, lostLife: false };
};
