export function drawBall(ctx, ballX, ballY, ballRadius, ballColor) {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

export function drawPaddle(ctx, paddleX, canvasHeight, paddleWidth, paddleHeight, paddleColor) {
    ctx.beginPath();
    ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

export function drawBricks(ctx, bricks, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, brickColor) {

    bricks.forEach((column, c) => {
        column.forEach((brick, r) => {
            if (brick.status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                brick.x = brickX;
                brick.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        });
    });
}
