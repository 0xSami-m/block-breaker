export function collisionDetection() {
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
}


export function resetBallAndPaddle() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballSpeedX = 2;
    ballSpeedY = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}

export function loseLife() {
    if (livesRef.current > 1) {
        livesRef.current -= 1;
        //setLives(livesRef.current);
        resetBallAndPaddle();
    } else {
        setGameOver(true);
        setTimeout(() => alert("Game Over!"), 100);
    }
}