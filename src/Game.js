import React, { useEffect, useRef, useState } from "react";
import useTracking from "./Tracking";
import LatencyGraph from "./LatencyGraph";
import { drawBall, drawPaddle, drawBricks } from "./Render";
import GameStats from "./GameStats";
import useControls from "./useControls";
import { checkBrickCollision, checkWallCollision, checkPaddleCollision } from "./Collision";
import { initializeBricks, LEVELS } from "./Levels"; 
import { CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, BALL_RADIUS, PADDLE_COLOR, BACKGROUND_COLOR, BALL_COLOR } from "./Constants";
import { loseLife, resetBallAndPaddle } from "./GameLogic";

const Game = () => {
    const { totalTransactions, latency, updateTransactions } = useTracking();
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const livesRef = useRef(3);
    const [gameOver, setGameOver] = useState(false);

    const levelIndex = 0;
    const levelConfig = LEVELS[levelIndex];
    const [bricks, setBricks] = useState(() => initializeBricks(levelIndex));

    const { paddleX, updatePaddlePosition } = useControls(CANVAS_WIDTH, PADDLE_WIDTH);

    const ballX = useRef(CANVAS_WIDTH / 2);
    const ballY = useRef(CANVAS_HEIGHT - 30);
    const ballSpeedX = useRef(2);
    const ballSpeedY = useRef(-2);
    const animationFrameId = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        ctxRef.current = canvas.getContext("2d");
        canvas.width = CANVAS_WIDTH; 
        canvas.height = CANVAS_HEIGHT;
    }, []);

    useEffect(() => {
        function updateGame() {
            if (gameOver) return;

            const ctx = ctxRef.current;
            if (!ctx) return;

            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            ctx.fillStyle = BACKGROUND_COLOR; // 🎨 Set background color
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


            drawBricks(ctx, bricks, levelConfig.width, levelConfig.height, levelConfig.padding, levelConfig.offsetLeft, levelConfig.offsetTop, levelConfig.brickColor);
            drawBall(ctx, ballX.current, ballY.current, BALL_RADIUS, BALL_COLOR);
            drawPaddle(ctx, paddleX.current, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);

            ballSpeedY.current = checkBrickCollision(ballX.current, ballY.current, ballSpeedY.current, bricks, levelConfig.width, levelConfig.height, updateTransactions);

            const wallCollision = checkWallCollision(
                ballX.current, ballY.current, BALL_RADIUS, 
                ballSpeedX.current, ballSpeedY.current, CANVAS_WIDTH, CANVAS_HEIGHT, updateTransactions
            );
            ballSpeedX.current = wallCollision.newBallSpeedX;
            ballSpeedY.current = wallCollision.newBallSpeedY;

            const paddleCollision = checkPaddleCollision(
                ballX.current, ballY.current, BALL_RADIUS, ballSpeedY.current, 
                paddleX, PADDLE_WIDTH, CANVAS_HEIGHT, updateTransactions
            );
            ballSpeedY.current = paddleCollision.newBallSpeedY;

            if (paddleCollision.lostLife) {
                loseLife(livesRef, setGameOver, () => {
                    resetBallAndPaddle(ballX, ballY, ballSpeedX, ballSpeedY, paddleX);
                });
            }

            updatePaddlePosition();

            ballX.current += ballSpeedX.current;
            ballY.current += ballSpeedY.current;

            animationFrameId.current = requestAnimationFrame(updateGame);
        }

        animationFrameId.current = requestAnimationFrame(updateGame);

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [gameOver, bricks]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH} 
                height={CANVAS_HEIGHT}
                style={{ background: "#eee", display: "block", margin: "auto" }}
            />
            <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
            <LatencyGraph latency={latency} />
            {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
        </>
    );
};

export default Game;
