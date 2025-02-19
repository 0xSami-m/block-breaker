// import { drawBall, drawPaddle, drawBricks } from "./Render";


// export const initializeBricks = () => {
//     const brickRowCount = 5;
//     const brickColumnCount = 8;
//     const brickWidth = 75;
//     const brickHeight = 20;
//     const brickPadding = 10;
//     const brickOffsetTop = 30;
//     const brickOffsetLeft = 30;

//     let bricks = [];
//     for (let c = 0; c < brickColumnCount; c++) {
//         bricks[c] = [];
//         for (let r = 0; r < brickRowCount; r++) {
//             bricks[c][r] = { x: 0, y: 0, status: 1 };
//         }
//     }
//     return bricks;
// };

// export const handleGameLogic = ({ ctx, canvas, livesRef, setGameOver, bricks, updateTransactions, rightPressed, leftPressed }) => {
//     let ballX = canvas.width / 2;
//     let ballY = canvas.height - 30;
//     let ballSpeedX = 2;
//     let ballSpeedY = -2;
//     let ballRadius = 10;

//     const paddleHeight = 10;
//     const paddleWidth = 100;
//     let paddleX = (canvas.width - paddleWidth) / 2;

//     const updateGame = () => {
//         if (setGameOver) return;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         drawBricks(ctx, bricks, 75, 20, 10, 30, 30);
//         drawBall(ctx, ballX, ballY, ballRadius);
//         drawPaddle(ctx, paddleX, canvas.height, paddleWidth, paddleHeight);

//         ballX += ballSpeedX;
//         ballY += ballSpeedY;

//         if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 5;
//         if (leftPressed && paddleX > 0) paddleX -= 5;

//         requestAnimationFrame(updateGame);
//     };
    
//     updateGame();
// };

// export const collisionDetection = ({ bricks, ballX, ballY, ballSpeedY, brickWidth, brickHeight, updateTransactions }) => {
//     bricks.forEach((column) => {
//         column.forEach((brick) => {
//             if (brick.status === 1) {
//                 if (
//                     ballX > brick.x &&
//                     ballX < brick.x + brickWidth &&
//                     ballY > brick.y &&
//                     ballY < brick.y + brickHeight
//                 ) {
//                     ballSpeedY = -ballSpeedY;
//                     brick.status = 0;
//                     updateTransactions();  // **transaction event**
//                 }
//             }
//         });
//     });
//     return ballSpeedY; // Return updated ballSpeedY to apply changes
// };

// export const resetBallAndPaddle = ({ canvas, paddleWidth }) => {
//     return {
//         ballX: canvas.width / 2,
//         ballY: canvas.height - 30,
//         ballSpeedX: 2,
//         ballSpeedY: -2,
//         paddleX: (canvas.width - paddleWidth) / 2,
//     };
// };

// export const loseLife = ({ livesRef, setGameOver, resetBallAndPaddle, canvas, paddleWidth }) => {
//     if (livesRef.current > 1) {
//         livesRef.current -= 1;
//         return resetBallAndPaddle({ canvas, paddleWidth }); // Reset game state
//     } else {
//         setGameOver(true);
//         setTimeout(() => alert("Game Over!"), 100);
//         return null;
//     }
// };

import { drawBall, drawPaddle, drawBricks } from "./Render";

export const initializeBricks = () => {
    const brickRowCount = 5;
    const brickColumnCount = 8;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    return bricks;
};

export const handleGameLogic = ({
    ctx,
    canvas,
    livesRef,
    setGameOver,
    gameOver,
    bricks,
    updateTransactions,
    rightPressed,
    leftPressed
}) => {
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 30;
    let ballSpeedX = 2;
    let ballSpeedY = -2;
    let ballRadius = 10;

    const paddleHeight = 10;
    const paddleWidth = 100;
    let paddleX = (canvas.width - paddleWidth) / 2;

    const updateGame = () => {
        if (gameOver) return; // Use `gameOver` instead of `setGameOver`

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks(ctx, bricks, 75, 20, 10, 30, 30);
        drawBall(ctx, ballX, ballY, ballRadius);
        drawPaddle(ctx, paddleX, canvas.height, paddleWidth, paddleHeight);

        // Collision detection
        ballSpeedY = collisionDetection({
            bricks,
            ballX,
            ballY,
            ballSpeedY,
            brickWidth: 75,
            brickHeight: 20,
            updateTransactions
        });

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Detect collision with side walls
        if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            ballSpeedX = -ballSpeedX;
            updateTransactions();
        }

        // Detect collision with top wall
        if (ballY - ballRadius < 0) {
            ballSpeedY = -ballSpeedY;
            updateTransactions();
        } 
        // Detect collision with bottom (paddle or lose life)
        else if (ballY + ballRadius > canvas.height) {
            if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                ballSpeedY = -ballSpeedY;
                updateTransactions();
            } else {
                const newState = loseLife({
                    livesRef,
                    setGameOver,
                    resetBallAndPaddle,
                    canvas,
                    paddleWidth
                });
                if (newState) {
                    ballX = newState.ballX;
                    ballY = newState.ballY;
                    ballSpeedX = newState.ballSpeedX;
                    ballSpeedY = newState.ballSpeedY;
                    paddleX = newState.paddleX;
                }
            }
        }

        // Move paddle left or right
        if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 5;
        if (leftPressed && paddleX > 0) paddleX -= 5;

        requestAnimationFrame(updateGame);
    };

    updateGame();
};

export const collisionDetection = ({ bricks, ballX, ballY, ballSpeedY, brickWidth, brickHeight, updateTransactions }) => {
    bricks.forEach((column) => {
        column.forEach((brick) => {
            if (brick.status === 1) {
                if (
                    ballX > brick.x &&
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight
                ) {
                    ballSpeedY = -ballSpeedY;
                    brick.status = 0;
                    updateTransactions();  // **transaction event**
                }
            }
        });
    });
    return ballSpeedY; // Return updated ballSpeedY to apply changes
};

export const resetBallAndPaddle = ({ canvas, paddleWidth }) => {
    return {
        ballX: canvas.width / 2,
        ballY: canvas.height - 30,
        ballSpeedX: 2,
        ballSpeedY: -2,
        paddleX: (canvas.width - paddleWidth) / 2,
    };
};

export const loseLife = ({ livesRef, setGameOver, resetBallAndPaddle, canvas, paddleWidth }) => {
    if (livesRef.current > 1) {
        livesRef.current -= 1;
        return resetBallAndPaddle({ canvas, paddleWidth }); // Reset game state
    } else {
        setGameOver(true);
        setTimeout(() => alert("Game Over!"), 100);
        return null;
    }
};
