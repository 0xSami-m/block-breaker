Decided to change TPS to Transactiosn 



import React, { useEffect, useRef, useState } from "react";
import useTracking from "./Tracking";
import { applyBigSequencerEnergy, applyParallelExecution, applyExecutionAtRuntime } from "./PowerUps";



const Game = () => {

    const keyDownHandler = (event) => {
        if (event.key === "Right" || event.key === "ArrowRight") {
            rightPressed = true;
        } else if (event.key === "Left" || event.key === "ArrowLeft") {
            leftPressed = true;
        }
    };
    
    const keyUpHandler = (event) => {
        if (event.key === "Right" || event.key === "ArrowRight") {
            rightPressed = false;
        } else if (event.key === "Left" || event.key === "ArrowLeft") {
            leftPressed = false;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
    
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, []);
    
   // const { tps, latency } = useTracking();
   //const { tps, latency, updateTPS } = useTracking();
   const { totalTransactions, latency, updateTransactions } = useTracking();
   const [powerUp, setPowerUp] = useState(null);

    const canvasRef = useRef(null);
    const livesRef = useRef(3); // Use ref to track lives
    //const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    
    const brickRowCount = 5;
    const brickColumnCount = 8;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    const [bricks] = useState(() => {
        let brickArray = [];
        for (let c = 0; c < brickColumnCount; c++) {
            brickArray[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                brickArray[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        return brickArray;
    });
    

    // function drawStats(ctx, latency, tps, livesRef, canvasWidth) {
    //     ctx.font = "16px Arial";
    //     ctx.fillStyle = "black";
    
    //     // Ensure values exist, fallback if undefined
    //     const lives = livesRef?.current ?? 3; // Default to 3 if undefined
    //     const latencyValue = latency ?? 0;
    //     const tpsValue = tps ?? 0;
    
    //     ctx.clearRect(0, 0, 200, 80); // Clear the old stats before drawing new ones
    //     ctx.fillText(`Lives: ${lives}`, canvasWidth - 120, 20);
    //     ctx.fillText(`Latency: ${latencyValue.toFixed(2)}ms`, 20, 40);
    //     ctx.fillText(`TPS: ${tpsValue}`, 20, 60);
    // }
    
    function GameStats({ totalTransactions, latency, lives }) {
        return (
            <div style={{
                position: "absolute",
                top: "60px",
                left: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif"
            }}>
                <p>Lives: {lives}</p>
                <p>Latency: {latency.toFixed(2)}ms</p>
                <p>Total Transactions: {totalTransactions}</p>
            </div>
        );
    }
    
    
    

    useEffect(() => {
        if (!canvasRef.current) return; // Prevent running if canvas is not ready
    
        const interval = setInterval(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
    
            ctx.clearRect(0, 0, 200, 80); // Clear only the stats area
          //  drawStats(ctx, latency, tps, livesRef, canvas.width);
        }, 1000); // Update stats every second
    
        return () => clearInterval(interval);
    }, [totalTransactions, latency]); // Ensure this runs every time TPS or Latency changes
    
    
    
    

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 500;

        // let ballX = canvas.width / 2;
        // let ballY = canvas.height - 30;
        // let ballSpeedX = 2;
        // let ballSpeedY = -2;
        // let ballRadius = 10;
        let balls = [{
            x: canvas.width / 2,
            y: canvas.height - 30,
            speedX: 2,
            speedY: -2,
            radius: 10
        }];
        

        const paddleHeight = 10;
        const paddleWidth = 100;
        let paddleX = (canvas.width - paddleWidth) / 2;
        let rightPressed = false;
        let leftPressed = false;

        // document.addEventListener("keydown", keyDownHandler);
        // document.addEventListener("keyup", keyUpHandler);

        // function keyDownHandler(event) {
        //     if (event.key === "Right" || event.key === "ArrowRight") {
        //         rightPressed = true;
        //     } else if (event.key === "Left" || event.key === "ArrowLeft") {
        //         leftPressed = true;
        //     }
        // }

        // function keyUpHandler(event) {
        //     if (event.key === "Right" || event.key === "ArrowRight") {
        //         rightPressed = false;
        //     } else if (event.key === "Left" || event.key === "ArrowLeft") {
        //         leftPressed = false;
        //     }
        // }

        function drawBall() {
            balls.forEach((ball) => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            });
        }
        

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            bricks.forEach((column, c) => {
                column.forEach((brick, r) => {
                    if (brick.status === 1) {
                        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        brick.x = brickX;
                        brick.y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#FF5733";
                        ctx.fill();
                        ctx.closePath();
                    }
                });
            });
        }

        // function drawStats(ctx) {
        //     ctx.font = "16px Arial";
        //     ctx.fillStyle = "black";
        //     ctx.fillText(`Lives: ${livesRef.current}`, canvas.width - 120, 20);
        //     ctx.fillText(`Latency: ${latency ? latency.toFixed(2) : 0}ms`, 20, 40);
        //     ctx.fillText(`TPS: ${tps}`, 20, 60);
        // }
        
        
        

        // function collisionDetection() {
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
        //                 }
        //             }
        //         });
        //     });
        // }

        // function collisionDetection() {
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
        // }

        function resetPowerUps() {
            console.log("Resetting Power-ups");
            setPowerUp(null); // Clear active power-up
        
            // Reset ball properties
            balls.forEach((ball) => {
                ball.radius = 10; // Reset ball size
                ball.speedX = Math.sign(ball.speedX) * 2; // Reset speed but keep direction
                ball.speedY = Math.sign(ball.speedY) * -2;
            });
        
            // Keep only one ball
            balls = [balls[0]]; 
        
            console.log("Power-ups reset. All balls returned to default.");
        }
        
        
        

        function collisionDetection() {
            bricks.forEach((column) => {
                column.forEach((brick) => {
                    if (brick.status === 1) {
                        balls.forEach((ball) => {
                            if (
                                ball.x > brick.x &&
                                ball.x < brick.x + brickWidth &&
                                ball.y > brick.y &&
                                ball.y < brick.y + brickHeight
                            ) {
                                brick.status = 0;
                                updateTransactions(); // Log transaction for breaking brick
        
                                const powerUpChance = Math.random();
                                if (powerUpChance < 1 / 15) { // 1 in 15 chance of spawning a power-up
                                    resetPowerUps(); // Reset previous power-ups
                                    setPowerUp(null); // Clear active power-up before assigning a new one
        
                                    const randomPowerUp = Math.random();
                                    if (randomPowerUp < 1 / 3) {
                                        console.log("Activating Big Sequencer Energy");
                                        setPowerUp("big_sequencer");
                                        balls.forEach(applyBigSequencerEnergy);
                                    } else if (randomPowerUp < 2 / 3) {
                                        console.log("Activating Parallel Execution");
                                        setPowerUp("parallel_execution");
                                        let newBalls = applyParallelExecution([...balls], paddleX, paddleWidth, canvas.width);
                                        balls.length = 0;  // Clear old balls safely
                                        newBalls.forEach(ball => balls.push(ball)); // Reassign new balls properly
                                    } else {
                                        console.log("Activating Execution at Runtime");
                                        setPowerUp("execution_runtime");
                                        balls.forEach(applyExecutionAtRuntime);
                                    }
                                }
                            }
                        });  // ✅ Closing bracket for `balls.forEach`
                    }
                });  // ✅ Closing bracket for `column.forEach`
            });  // ✅ Closing bracket for `bricks.forEach`
        }
        
        
        

        // function resetBallAndPaddle() {
        //     ballX = canvas.width / 2;
        //     ballY = canvas.height - 30;
        //     ballSpeedX = 2;
        //     ballSpeedY = -2;
        //     paddleX = (canvas.width - paddleWidth) / 2;
        // }

        // function resetBallAndPaddle() {
        //     balls = [{
        //         x: canvas.width / 2,
        //         y: canvas.height - 30,
        //         speedX: 2,
        //         speedY: -2,
        //         radius: 10
        //     }];
        //     paddleX = (canvas.width - paddleWidth) / 2;
        // }

        function resetBallAndPaddle() {
            if (powerUp === "parallel_execution") {
                balls.forEach(ball => {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height - 30;
                    ball.speedX = 2;
                    ball.speedY = -2;
                });
            } else {
                balls = [{
                    x: canvas.width / 2,
                    y: canvas.height - 30,
                    speedX: 2,
                    speedY: -2,
                    radius: 10
                }];
            }
            paddleX = (canvas.width - paddleWidth) / 2;
        }
        
        
        

        // function loseLife() {
        //     if (livesRef.current > 1) {
        //         livesRef.current -= 1;
        //         //setLives(livesRef.current);
        //         resetBallAndPaddle();
        //     } else {
        //         setGameOver(true);
        //         setTimeout(() => alert("Game Over!"), 100);
        //     }
        // }
        // function loseLife(ball) {
        //     if (powerUp === "parallel_execution" && balls.length > 1) {
        //         balls = balls.filter(b => b !== ball); // Remove only this ball
        //     }
        
        //     if (balls.length === 0) { // Only lose a life if all balls are gone
        //         if (livesRef.current > 1) {
        //             livesRef.current -= 1;
        //             resetBallAndPaddle();
        //         } else {
        //             setGameOver(true);
        //             setTimeout(() => alert("Game Over!"), 100);
        //         }
        //     }
        // }

        function loseLife(ball) {
            console.log("Before losing life: Lives =", livesRef.current, "Balls left:", balls.length);
        
            if (powerUp === "parallel_execution" && balls.length > 1) {
                balls = balls.filter(b => b !== ball);
                console.log("Parallel Execution active, ball removed. Balls left:", balls.length);
            }
        
            if (balls.length === 0) {
                if (livesRef.current > 1) {
                    livesRef.current -= 1;
                    console.log("Life lost. New lives:", livesRef.current);
                    resetBallAndPaddle();
                } else {
                    console.log("Game over triggered");
                    setGameOver(true);
                    setTimeout(() => alert("Game Over!"), 100);
                }
            }
        }
        
        
        

        // function updateGame() {
        //     if (gameOver) return;
        
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     drawBricks();
        //     drawBall();
        //     drawPaddle();
        //   //  drawStats(ctx);  // Pass ctx explicitly
        //     collisionDetection();
        
        //     ballX += ballSpeedX;
        //     ballY += ballSpeedY;
        
        //     if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        //         ballSpeedX = -ballSpeedX;
        //     }
        //     if (ballY - ballRadius < 0) {
        //         ballSpeedY = -ballSpeedY;
        //     } else if (ballY + ballRadius > canvas.height) {
        //         if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        //             ballSpeedY = -ballSpeedY;
        //         } else {
        //             loseLife();
        //         }
        //     }
        
        //     if (rightPressed && paddleX < canvas.width - paddleWidth) {
        //         paddleX += 5;
        //     } else if (leftPressed && paddleX > 0) {
        //         paddleX -= 5;
        //     }
        
        //     requestAnimationFrame(updateGame);
        // }

        function updateGame() {
            if (gameOver) return;
        
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();
        
            // ballX += ballSpeedX;
            // ballY += ballSpeedY;

            balls.forEach((ball) => {
                ball.x += ball.speedX;
                ball.y += ball.speedY;
            
                // Ball-wall collision detection
                if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                    ball.speedX = -ball.speedX;
                }
            
                if (ball.y - ball.radius < 0) {
                    ball.speedY = -ball.speedY;
                }
            
                // Ball-paddle collision detection
                if (ball.y + ball.radius > canvas.height) {
                    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
                        ball.speedY = -ball.speedY;
                    } else {
                        // If Parallel Execution power-up is active, check if any balls remain
                        if (powerUp === "parallel_execution" && balls.length > 1) {
                            balls = balls.filter(b => b !== ball); // Remove only this ball
                        } else {
                            loseLife();
                        }
                    }
                }
            });
            
        
            // **Detect collision with side walls**
            // if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            //     ballSpeedX = -ballSpeedX;
            //     updateTransactions();  // **transaction event**
            // }
        
            // // **Detect collision with top wall**
            // if (ballY - ballRadius < 0) {
            //     ballSpeedY = -ballSpeedY;
            //     updateTransactions();  // **transaction event**
            // } 
            // // **Detect collision with bottom (paddle or lose life)**
            // else if (ballY + ballRadius > canvas.height) {
            //     if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            //         ballSpeedY = -ballSpeedY;
            //         updateTransactions();  // **transaction event**
            //     } else {
            //         loseLife();
            //     }
            // }

            balls.forEach((ball, index) => {
                // Ball-wall collision detection
                balls.forEach((ball) => {
                    // Left & Right wall bounce
                    if (ball.x + ball.radius >= canvas.width) {
                        ball.x = canvas.width - ball.radius; // Prevent sticking
                        ball.speedX = -Math.abs(ball.speedX); // Ensure it bounces left
                        updateTransactions(); // Log transaction
                    } else if (ball.x - ball.radius <= 0) {
                        ball.x = ball.radius; // Prevent sticking
                        ball.speedX = Math.abs(ball.speedX); // Ensure it bounces right
                        updateTransactions(); // Log transaction
                    }
                
                    // Top wall bounce
                    if (ball.y - ball.radius <= 0) {
                        ball.y = ball.radius; // Prevent sticking
                        ball.speedY = Math.abs(ball.speedY); // Ensure it bounces downward
                        updateTransactions(); // Log transaction
                    }
                });
                
            
                if (ball.y - ball.radius < 0) {
                    ball.speedY = -ball.speedY;
                    updateTransactions();  // **transaction event**
                }
            
                // Ball-paddle or bottom collision detection
                if (ball.y + ball.radius > canvas.height) {
                    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
                        ball.speedY = -ball.speedY;
                        updateTransactions();  // **transaction event**
                    } else {
                        // If Parallel Execution is active, remove only the current ball
                        if (powerUp === "parallel_execution" && balls.length > 1) {
                            balls.splice(index, 1); // Remove this ball from the array
                        } else {
                            loseLife();
                        }
                    }
                }
            });
            
        
            // **Move paddle left or right**
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 5;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 5;
            }
        
            requestAnimationFrame(updateGame);
        }
        
        

        updateGame();

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, [gameOver, bricks]);

    console.log("totalTransactions:", totalTransactions, "Latency:", latency);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ background: "#eee", display: "block", margin: "auto" }}
            />
            <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
            {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
        </>
    );
    
};

export default Game;



















///////////////////////////////////////////////////



// import React, { useEffect, useRef, useState } from "react";
// import useTracking from "./Tracking";
// import LatencyGraph from "./LatencyGraph";
// import { drawBall, drawPaddle, drawBricks } from "./Render";
// import GameStats from "./GameStats";
// import useControls from "./useControls";
// import { checkBrickCollision, checkWallCollision, checkPaddleCollision } from "./Collision";
// import { initializeBricks, LEVELS } from "./Levels";
// import { resetGame, loseLife, nextLevel } from "./GameLogic";
// import { 
//     CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, BALL_RADIUS
// } from "./Constants";


// const Game = () => {
//     const { totalTransactions, latency, updateTransactions } = useTracking();
//     const canvasRef = useRef(null);
//     const livesRef = useRef(3); // Use ref to track lives
//     const [gameOver, setGameOver] = useState(false);
//     const [currentLevel, setCurrentLevel] = useState(0);
//     const [bricks, setBricks] = useState(() => initializeBricks(0));
//     const brickWidth = 75;
//     const brickHeight = 20;
 
//     const paddleWidth = 100;
//     const paddleHeight = 10;
//     const canvasWidth = 800;
//     const canvasHeight = 500;


//     const ballX = useRef(CANVAS_WIDTH / 2);
//     const ballY = useRef(CANVAS_HEIGHT - 30);
//     const ballSpeedX = useRef(2);
//     const ballSpeedY = useRef(-2);

//     const { paddleX, updatePaddlePosition } = useControls(canvasWidth, paddleWidth);

    
//     useEffect(() => {
//         if (!canvasRef.current) return; // Prevent running if canvas is not ready
    
//         const interval = setInterval(() => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");
    
//             ctx.clearRect(0, 0, 200, 80); // Clear only the stats area
//         }, 1000); // Update stats every second
    
//         return () => clearInterval(interval);
//     }, [totalTransactions, latency]); // Ensure this runs every time TPS or Latency changes
    
    

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         canvas.width = 800;
//         canvas.height = 500;

//         // let ballX = canvas.width / 2;
//         // let ballY = canvas.height - 30;
//         // let ballSpeedX = 2;
//         // let ballSpeedY = -2;



//         let ballRadius = 10;


//         // function resetBallAndPaddle() {
//         //     ballX = canvas.width / 2;
//         //     ballY = canvas.height - 30;
//         //     ballSpeedX = 2;
//         //     ballSpeedY = -2;
//         //    paddleX.current = (canvas.width - paddleWidth)
//         // }

//         function resetBallAndPaddle() {
//             ballX.current = CANVAS_WIDTH / 2;
//             ballY.current = CANVAS_HEIGHT - 30;
//             ballSpeedX.current = 2;
//             ballSpeedY.current = -2;
//             paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH);
//         }
        
        
    

//         function loseLife() {
//             if (livesRef.current > 1) {
//                 livesRef.current -= 1;
//                 resetBallAndPaddle();
//             } else {
//                 setGameOver(true);
//                 setTimeout(() => alert("Game Over!"), 100);
//             }
//         }


//         function updateGame() {
//             if (gameOver) return;
        
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             //drawBricks(ctx, bricks, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop);
//             drawBricks(ctx, bricks, LEVELS[currentLevel].width, LEVELS[currentLevel].height, LEVELS[currentLevel].padding, LEVELS[currentLevel].offsetLeft, LEVELS[currentLevel].offsetTop);

//             //drawBall(ctx, ballX, ballY, ballRadius);
//             drawBall(ctx, ballX.current, ballY.current, ballRadius);

//             drawPaddle(ctx, paddleX.current, canvas.height, paddleWidth, paddleHeight);

//             // ballSpeedY = checkBrickCollision(ballX, ballY, ballSpeedY, bricks, brickWidth, brickHeight, updateTransactions);
//             // const wallCollision = checkWallCollision(ballX, ballY, ballRadius, ballSpeedX, ballSpeedY, canvasWidth, canvasHeight, updateTransactions);
//             // ballSpeedX = wallCollision.newBallSpeedX;
//             // ballSpeedY = wallCollision.newBallSpeedY;

//             ballSpeedY.current = checkBrickCollision(ballX.current, ballY.current, ballSpeedY.current, bricks, brickWidth, brickHeight, updateTransactions);
//             const wallCollision = checkWallCollision(ballX.current, ballY.current, ballRadius, ballSpeedX.current, ballSpeedY.current, canvasWidth, canvasHeight, updateTransactions);
//             ballSpeedX.current = wallCollision.newBallSpeedX;
//             ballSpeedY.current = wallCollision.newBallSpeedY;


//             // const paddleCollision = checkPaddleCollision(ballX, ballY, ballRadius, ballSpeedY, paddleX, paddleWidth, canvasHeight, updateTransactions);
//             // ballSpeedY = paddleCollision.newBallSpeedY;

//             const paddleCollision = checkPaddleCollision(
//                 ballX.current, ballY.current, ballRadius, ballSpeedY.current, paddleX.current, paddleWidth, canvasHeight, updateTransactions
//             );
//             ballSpeedY.current = paddleCollision.newBallSpeedY;
            
//             if (paddleCollision.lostLife) {
//               loseLife();
//             }


//             updatePaddlePosition(); 

//             const allBricksCleared = bricks.every(column => column.every(brick => brick.status === 0));
//             if (allBricksCleared) {
//                 nextLevel(currentLevel, setCurrentLevel, setBricks, () => 
//                 resetGame(ballX, ballY, ballSpeedX, ballSpeedY, paddleX, currentLevel, setBricks)
//             );
//                        return;
//             }
        

//             // ballX += ballSpeedX;
//             // ballY += ballSpeedY;

//             ballX.current += ballSpeedX.current;
//             ballY.current += ballSpeedY.current;

        
        
//             requestAnimationFrame(updateGame);
//         }
        

//         updateGame();

//    // }, [gameOver, bricks]);
// }, [gameOver, bricks, currentLevel, paddleX, updatePaddlePosition, updateTransactions]);


//     console.log("totalTransactions:", totalTransactions, "Latency:", latency);

//     return (
//         <>
//             <canvas
//                 ref={canvasRef}
//                 style={{ background: "#eee", display: "block", margin: "auto" }}
//             />
//             <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
//             <LatencyGraph latency={latency} /> 
//             {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
//         </>
//     );
    
// };

// export default Game;

// import React, { useEffect, useRef, useState } from "react";
// import useTracking from "./Tracking";
// import LatencyGraph from "./LatencyGraph";
// import { drawBall, drawPaddle, drawBricks } from "./Render";
// import GameStats from "./GameStats";
// import useControls from "./useControls";
// import { checkBrickCollision, checkWallCollision, checkPaddleCollision } from "./Collision";
// import { initializeBricks } from "./Levels";
// import { resetBallAndPaddle, loseLife, nextLevel } from "./GameState";
// import {
//     CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, BALL_RADIUS, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_TOP, BRICK_OFFSET_LEFT
// } from "./Constants";



// const Game = () => {
//     const { totalTransactions, latency, updateTransactions } = useTracking();
//     const canvasRef = useRef(null);
//     const livesRef = useRef(3); // Use ref to track lives
//     const [gameOver, setGameOver] = useState(false);
//     const [currentLevel, setCurrentLevel] = useState(0);
//     const [bricks, setBricks] = useState(() => initializeBricks(0));

//     // const brickRowCount = 5;
//     // const brickColumnCount = 8;
//     // const brickWidth = 75;
//     // const brickHeight = 20;
//     // const brickPadding = 10;
//     // const brickOffsetTop = 30;
//     // const brickOffsetLeft = 30;


//     // const [bricks] = useState(() => {
//     //     let brickArray = [];
//     //     for (let c = 0; c < brickColumnCount; c++) {
//     //         brickArray[c] = [];
//     //         for (let r = 0; r < brickRowCount; r++) {
//     //             brickArray[c][r] = { x: 0, y: 0, status: 1 };
//     //         }
//     //     }
//     //     return brickArray;
//     // });

//     // const paddleWidth = 100;
//     // const paddleHeight = 10;
//     // const canvasWidth = 800;
//     // const canvasHeight = 500;

//     const ballX = useRef(CANVAS_WIDTH / 2);
//     const ballY = useRef(CANVAS_HEIGHT - 30);
//     const ballSpeedX = useRef(2);
//     const ballSpeedY = useRef(-2);

//     const { paddleX, updatePaddlePosition } = useControls(CANVAS_WIDTH, PADDLE_WIDTH);

    
//     useEffect(() => {
//         if (!canvasRef.current) return; // Prevent running if canvas is not ready
    
//         const interval = setInterval(() => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");

//             canvas.width = CANVAS_WIDTH; // **Explicitly set canvas size**
//             canvas.height = CANVAS_HEIGHT;
    
//             ctx.clearRect(0, 0, 200, 80); // Clear only the stats area
//         }, 1000); // Update stats every second
    
//         return () => clearInterval(interval);
//     }, [totalTransactions, latency]); // Ensure this runs every time TPS or Latency changes
    
    

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//        // canvas.width = 800;
//        // canvas.height = 500;

//         // let ballX = canvas.width / 2;
//         // let ballY = canvas.height - 30;
//         // let ballSpeedX = 2;
//         // let ballSpeedY = -2;
//         // let ballRadius = 10;


//         // function resetBallAndPaddle() {
//         //     ballX = canvas.width / 2;
//         //     ballY = canvas.height - 30;
//         //     ballSpeedX = 2;
//         //     ballSpeedY = -2;
//         //    paddleX.current = (canvas.width - paddleWidth)
//         // }
    

//         // function loseLife() {
//         //     if (livesRef.current > 1) {
//         //         livesRef.current -= 1;
//         //         resetBallAndPaddle();
//         //     } else {
//         //         setGameOver(true);
//         //         setTimeout(() => alert("Game Over!"), 100);
//         //     }
//         // }


//         function updateGame() {
//             if (gameOver) return;
        
//             ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//             // drawBricks(ctx, bricks, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop);
//             // drawBall(ctx, ballX, ballY, ballRadius);
//             // drawPaddle(ctx, paddleX.current, canvas.height, paddleWidth, paddleHeight);

//             drawBricks(ctx, bricks, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP);
//             drawBall(ctx, ballX.current, ballY.current, BALL_RADIUS);
//             drawPaddle(ctx, paddleX.current, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

//     //         ballSpeedY = checkBrickCollision(ballX, ballY, ballSpeedY, bricks, brickWidth, brickHeight, updateTransactions);
//     //         const wallCollision = checkWallCollision(ballX, ballY, ballRadius, ballSpeedX, ballSpeedY, canvasWidth, canvasHeight, updateTransactions);
//     //         ballSpeedX = wallCollision.newBallSpeedX;
//     //         ballSpeedY = wallCollision.newBallSpeedY;

//     //         const paddleCollision = checkPaddleCollision(ballX, ballY, ballRadius, ballSpeedY, paddleX, paddleWidth, canvasHeight, updateTransactions);
//     //         ballSpeedY = paddleCollision.newBallSpeedY;
//     //         if (paddleCollision.lostLife) {
//     //           loseLife();
//     //         }


//     //         updatePaddlePosition(); 
        

//     //         ballX += ballSpeedX;
//     //         ballY += ballSpeedY;
        
        
//     //         requestAnimationFrame(updateGame);
//     //     }
        

//     //     updateGame();

//     // }, [gameOver, bricks]);

//     ballSpeedY.current = checkBrickCollision(ballX.current, ballY.current, ballSpeedY.current, bricks, BRICK_WIDTH, BRICK_HEIGHT, updateTransactions);

//     const wallCollision = checkWallCollision(
//         ballX.current, ballY.current, BALL_RADIUS, ballSpeedX.current, ballSpeedY.current, CANVAS_WIDTH, CANVAS_HEIGHT, updateTransactions
//     );
//     ballSpeedX.current = wallCollision.newBallSpeedX;
//     ballSpeedY.current = wallCollision.newBallSpeedY;

//     const paddleCollision = checkPaddleCollision(
//         ballX.current, ballY.current, BALL_RADIUS, ballSpeedY.current, paddleX, PADDLE_WIDTH, CANVAS_HEIGHT, updateTransactions
//     );
//     ballSpeedY.current = paddleCollision.newBallSpeedY;
//     if (paddleCollision.lostLife) {
//         loseLife(livesRef, () => resetBallAndPaddle(ballX, ballY, ballSpeedX, ballSpeedY, paddleX), setGameOver);
//     }

//     updatePaddlePosition();

//     ballX.current += ballSpeedX.current;
//     ballY.current += ballSpeedY.current;

//     // **🟢 Check if all bricks are cleared before moving to the next level**
//     const allBricksCleared = bricks.every(column => column.every(brick => brick.status === 0));
//     if (allBricksCleared) {
//         nextLevel(currentLevel, setCurrentLevel, setBricks, () => resetBallAndPaddle(ballX, ballY, ballSpeedX, ballSpeedY, paddleX));
//         return;
//     }

//     requestAnimationFrame(updateGame);
// }
//     updateGame();

// //requestAnimationFrame(updateGame);

// }, [gameOver, bricks, currentLevel, paddleX, updatePaddlePosition, updateTransactions]);


//     console.log("totalTransactions:", totalTransactions, "Latency:", latency);

//     return (
//         <>
//             <canvas
//                 ref={canvasRef}
//                 style={{ background: "#eee", display: "block", margin: "auto" }}
//             />
//             <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
//             <LatencyGraph latency={latency} /> 
//             {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
//         </>
//     );
    
// };

// export default Game;


// import React, { useEffect, useRef, useState } from "react";
// import useTracking from "./Tracking";
// import LatencyGraph from "./LatencyGraph";
// import { drawBall, drawPaddle, drawBricks } from "./Render";
// import GameStats from "./GameStats";
// import useControls from "./useControls";
// import { checkBrickCollision, checkWallCollision, checkPaddleCollision } from "./Collision";
// import { 
//     CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, BALL_RADIUS, BALL_SPEED_X, BALL_SPEED_Y, 
//     BRICK_ROW_COUNT, BRICK_COLUMN_COUNT, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_TOP,
//     BRICK_OFFSET_LEFT 
// } from "./Constants";



// const Game = () => {

//     const { totalTransactions, latency, updateTransactions } = useTracking();
//     const canvasRef = useRef(null);
//     const livesRef = useRef(3); // Use ref to track lives
//     const [gameOver, setGameOver] = useState(false);
//     // const brickRowCount = 5;
//     // const brickColumnCount = 8;
//     // const brickWidth = 75;
//     // const brickHeight = 20;
//     // const brickPadding = 10;
//     // const brickOffsetTop = 30;
//     // const brickOffsetLeft = 30;

//     const [bricks] = useState(() => {
//         let brickArray = [];
//         for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
//             brickArray[c] = [];
//             for (let r = 0; r < BRICK_ROW_COUNT; r++) {
//                 brickArray[c][r] = { x: 0, y: 0, status: 1 };
//             }
//         }
//         return brickArray;
//     });

//     // const paddleWidth = 100;
//     // const paddleHeight = 10;
//     // const canvasWidth = 800;
//     // const canvasHeight = 500;

//     const { paddleX, updatePaddlePosition } = useControls(CANVAS_WIDTH, PADDLE_WIDTH);

    
//     useEffect(() => {
//         if (!canvasRef.current) return; // Prevent running if canvas is not ready
    
//         const interval = setInterval(() => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");
    
//             ctx.clearRect(0, 0, 200, 80); // Clear only the stats area
//         }, 1000); // Update stats every second
    
//         return () => clearInterval(interval);
//     }, [totalTransactions, latency]); // Ensure this runs every time TPS or Latency changes
    
    

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         // canvas.width = CANVAS_WIDTH;
//         // canvas.height = CANVAS_HEIGHT;

//         let ballX = CANVAS_WIDTH / 2;
//         let ballY = CANVAS_HEIGHT - 30;
//         //let ballSpeedX = 2;
//         //let ballSpeedY = -2;
//         //let ballRadius = 10;


//         function resetBallAndPaddle() {
//             ballX = CANVAS_WIDTH / 2;
//             ballY = CANVAS_HEIGHT - 30;
//             // ballSpeedX = 2;
//             // ballSpeedY = -2;
//            paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH)
//         }
    

//         function loseLife() {
//             if (livesRef.current > 1) {
//                 livesRef.current -= 1;
//                 resetBallAndPaddle();
//             } else {
//                 setGameOver(true);
//                 setTimeout(() => alert("Game Over!"), 100);
//             }
//         }


//         function updateGame() {
//             if (gameOver) return;
        
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             drawBricks(ctx, bricks, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP);
//             drawBall(ctx, ballX, ballY, BALL_RADIUS);
//             drawPaddle(ctx, paddleX.current, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

//             let ballSpeedX = BALL_SPEED_X;  // Define local ball speed variables
//             let ballSpeedY = BALL_SPEED_Y;

//             ballSpeedY = checkBrickCollision(ballX, ballY, ballSpeedY, bricks, BRICK_WIDTH, BRICK_HEIGHT, updateTransactions);
//             const wallCollision = checkWallCollision(
//                 ballX, ballY, BALL_RADIUS, ballSpeedX, ballSpeedY, CANVAS_WIDTH, CANVAS_HEIGHT, updateTransactions
//             );
            
//             ballSpeedX = wallCollision.newBallSpeedX;
//             ballSpeedY = wallCollision.newBallSpeedY;

//             // const paddleCollision = checkPaddleCollision(ballX, ballY, ballRadius, ballSpeedY, paddleX, paddleWidth, canvasHeight, updateTransactions);
//             const paddleCollision = checkPaddleCollision(ballX, ballY, BALL_RADIUS, ballSpeedY, paddleX, PADDLE_WIDTH, CANVAS_HEIGHT, updateTransactions);

//             ballSpeedY = paddleCollision.newBallSpeedY;
//             if (paddleCollision.lostLife) {
//               loseLife();
//             }


//             updatePaddlePosition(); 
        

//             ballX += ballSpeedX;
//             ballY += ballSpeedY;
        
        
//             requestAnimationFrame(updateGame);
//         }
        
//         requestAnimationFrame(updateGame);

//        //  updateGame();

//     }, [gameOver, bricks, paddleX, updatePaddlePosition, updateTransactions]); 

//     console.log("totalTransactions:", totalTransactions, "Latency:", latency);

//     return (
//         <>
//             <canvas
//                 ref={canvasRef}
//                 style={{ background: "#eee", display: "block", margin: "auto" }}
//             />
//             <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
//             <LatencyGraph latency={latency} /> 
//             {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
//         </>
//     );
    
// };

// export default Game;



// import React, { useEffect, useRef, useState } from "react";
// import useTracking from "./Tracking";
// import LatencyGraph from "./LatencyGraph";
// import { drawBall, drawPaddle, drawBricks } from "./Render";
// import GameStats from "./GameStats";
// import useControls from "./useControls";
// import { checkBrickCollision, checkWallCollision, checkPaddleCollision } from "./Collision";
// import { 
//     CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, BALL_RADIUS, BALL_SPEED_X, BALL_SPEED_Y, 
//     BRICK_ROW_COUNT, BRICK_COLUMN_COUNT, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_TOP,
//     BRICK_OFFSET_LEFT 
// } from "./Constants";

// const Game = () => {
//     const { totalTransactions, latency, updateTransactions } = useTracking();
//     const canvasRef = useRef(null);
//     const livesRef = useRef(3);
//     const [gameOver, setGameOver] = useState(false);

//     // 🟢 Use useRef for ball position and speed to persist values across frames
//     const ballX = useRef(CANVAS_WIDTH / 2);
//     const ballY = useRef(CANVAS_HEIGHT - 30);
//     const ballSpeedX = useRef(BALL_SPEED_X);
//     const ballSpeedY = useRef(BALL_SPEED_Y);

//     const [bricks] = useState(() => {
//         let brickArray = [];
//         for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
//             brickArray[c] = [];
//             for (let r = 0; r < BRICK_ROW_COUNT; r++) {
//                 brickArray[c][r] = { x: 0, y: 0, status: 1 };
//             }
//         }
//         return brickArray;
//     });

//     const { paddleX, updatePaddlePosition } = useControls(CANVAS_WIDTH, PADDLE_WIDTH);

//     useEffect(() => {
//         if (!canvasRef.current) return;
    
//         const interval = setInterval(() => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");
//             ctx.clearRect(0, 0, 200, 80);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [totalTransactions, latency]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         function resetBallAndPaddle() {
//             ballX.current = CANVAS_WIDTH / 2;
//             ballY.current = CANVAS_HEIGHT - 30;
//             ballSpeedX.current = BALL_SPEED_X;
//             ballSpeedY.current = BALL_SPEED_Y;
//             paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH);
//         }

//         function loseLife() {
//             if (livesRef.current > 1) {
//                 livesRef.current -= 1;
//                 resetBallAndPaddle();
//             } else {
//                 setGameOver(true);
//                 setTimeout(() => alert("Game Over!"), 100);
//             }
//         }

//         function updateGame() {
//             if (gameOver) return;

//             ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//             drawBricks(ctx, bricks, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP);
//             drawBall(ctx, ballX.current, ballY.current, BALL_RADIUS);
//             drawPaddle(ctx, paddleX.current, CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

//             // 🟢 Correctly update speed using refs (persists across frames)
//             ballSpeedY.current = checkBrickCollision(
//                 ballX.current, ballY.current, ballSpeedY.current, bricks, BRICK_WIDTH, BRICK_HEIGHT, updateTransactions
//             );

//             const wallCollision = checkWallCollision(
//                 ballX.current, ballY.current, BALL_RADIUS, ballSpeedX.current, ballSpeedY.current, CANVAS_WIDTH, CANVAS_HEIGHT, updateTransactions
//             );
//             ballSpeedX.current = wallCollision.newBallSpeedX;
//             ballSpeedY.current = wallCollision.newBallSpeedY;

//             const paddleCollision = checkPaddleCollision(
//                 ballX.current, ballY.current, BALL_RADIUS, ballSpeedY.current, paddleX, PADDLE_WIDTH, CANVAS_HEIGHT, updateTransactions
//             );

//             ballSpeedY.current = paddleCollision.newBallSpeedY;
//             if (paddleCollision.lostLife) {
//                 loseLife();
//             }

//             updatePaddlePosition();

//             // 🟢 Persist ball movement across frames
//             ballX.current += ballSpeedX.current;
//             ballY.current += ballSpeedY.current;

//             requestAnimationFrame(updateGame);
//         }

//         requestAnimationFrame(updateGame);
    
//     }, [gameOver, bricks, paddleX, updatePaddlePosition, updateTransactions]);

//     return (
//         <>
//             <canvas
//                 ref={canvasRef}
//                 width={CANVAS_WIDTH}
//                 height={CANVAS_HEIGHT}
//                 style={{ background: "#eee", display: "block", margin: "auto" }}
//             />
//             <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
//             <LatencyGraph latency={latency} />
//             {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
//         </>
//     );
// };

// export default Game;




// import React, { useEffect, useRef, useState } from "react";
// import useTracking from "./Tracking";
// import LatencyGraph from "./LatencyGraph";
// import { drawBall, drawPaddle, drawBricks } from "./Render";
// import GameStats from "./GameStats";
// import useControls from "./useControls";
// import { initializeBricks, handleGameLogic } from "./GameLogic";



// const Game = () => {

//    const { totalTransactions, latency, updateTransactions } = useTracking();
//     const canvasRef = useRef(null);
//     const livesRef = useRef(3); // Use ref to track lives
//     const [gameOver, setGameOver] = useState(false);

//     const bricks = initializeBricks();
//     const { rightPressed, leftPressed } = useControls();
//     // const brickRowCount = 5;
//     // const brickColumnCount = 8;
//     // const brickWidth = 75;
//     // const brickHeight = 20;
//     // const brickPadding = 10;
//     // const brickOffsetTop = 30;
//     // const brickOffsetLeft = 30;

//     // const [bricks] = useState(() => {
//     //     let brickArray = [];
//     //     for (let c = 0; c < brickColumnCount; c++) {
//     //         brickArray[c] = [];
//     //         for (let r = 0; r < brickRowCount; r++) {
//     //             brickArray[c][r] = { x: 0, y: 0, status: 1 };
//     //         }
//     //     }
//     //     return brickArray;
//     // });
 
//     // function GameStats({ totalTransactions, latency, lives }) {
//     //     return (
//     //         <div style={{
//     //             position: "absolute",
//     //             top: "60px",
//     //             left: "10px",
//     //             background: "rgba(255, 255, 255, 0.8)",
//     //             padding: "10px",
//     //             borderRadius: "5px",
//     //             fontSize: "16px",
//     //             fontFamily: "Arial, sans-serif"
//     //         }}>
//     //             <p>Lives: {lives}</p>
//     //             <p>Latency: {latency.toFixed(2)}ms</p>
//     //             <p>Total Transactions: {totalTransactions}</p>
//     //         </div>
//     //     );
//     // }

//     useEffect(() => {
//         if (!canvasRef.current) return; // Prevent running if canvas is not ready
    
//         const interval = setInterval(() => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");
    
//             ctx.clearRect(0, 0, 200, 80); // Clear only the stats area
//           //  drawStats(ctx, latency, tps, livesRef, canvas.width);
//         }, 1000); // Update stats every second
    
//         return () => clearInterval(interval);
//     }, [totalTransactions, latency]); // Ensure this runs every time TPS or Latency changes
    
    
    
    

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         canvas.width = 800;
//         canvas.height = 500;

//         let ballX = canvas.width / 2;
//         let ballY = canvas.height - 30;
//         let ballSpeedX = 2;
//         let ballSpeedY = -2;
//         let ballRadius = 10;

//         const paddleHeight = 10;
//         const paddleWidth = 100;
//         let paddleX = (canvas.width - paddleWidth) / 2;
//         // let rightPressed = false;
//         // let leftPressed = false;
//         //const { rightPressed, leftPressed } = useControls();


//         // document.addEventListener("keydown", keyDownHandler);
//         // document.addEventListener("keyup", keyUpHandler);

//         // function keyDownHandler(event) {
//         //     if (event.key === "Right" || event.key === "ArrowRight") {
//         //         rightPressed = true;
//         //     } else if (event.key === "Left" || event.key === "ArrowLeft") {
//         //         leftPressed = true;
//         //     }
//         // }

//         // function keyUpHandler(event) {
//         //     if (event.key === "Right" || event.key === "ArrowRight") {
//         //         rightPressed = false;
//         //     } else if (event.key === "Left" || event.key === "ArrowLeft") {
//         //         leftPressed = false;
//         //     }
//         // }

 

//         // function collisionDetection() {
//         //     bricks.forEach((column) => {
//         //         column.forEach((brick) => {
//         //             if (brick.status === 1) {
//         //                 if (
//         //                     ballX > brick.x &&
//         //                     ballX < brick.x + brickWidth &&
//         //                     ballY > brick.y &&
//         //                     ballY < brick.y + brickHeight
//         //                 ) {
//         //                     ballSpeedY = -ballSpeedY;
//         //                     brick.status = 0;
//         //                     updateTransactions();  // **transaction event**
//         //                 }
//         //             }
//         //         });
//         //     });
//         // }
        

//         // function resetBallAndPaddle() {
//         //     ballX = canvas.width / 2;
//         //     ballY = canvas.height - 30;
//         //     ballSpeedX = 2;
//         //     ballSpeedY = -2;
//         //     paddleX = (canvas.width - paddleWidth) / 2;
//         // }

//         // function loseLife() {
//         //     if (livesRef.current > 1) {
//         //         livesRef.current -= 1;
//         //         //setLives(livesRef.current);
//         //         resetBallAndPaddle();
//         //     } else {
//         //         setGameOver(true);
//         //         setTimeout(() => alert("Game Over!"), 100);
//         //     }
//         // }


//         function updateGame() {
//             if (gameOver) return;
        
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             drawBricks(ctx, bricks, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop);
//             drawBall(ctx, ballX, ballY, ballRadius);
//             drawPaddle(ctx, paddleX, canvas.height, paddleWidth, paddleHeight);

//             collisionDetection();
            
//             ballX += ballSpeedX;
//             ballY += ballSpeedY;
        
//             // **Detect collision with side walls**
//             if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
//                 ballSpeedX = -ballSpeedX;
//                 updateTransactions();  // **transaction event**
//             }
        
//             // **Detect collision with top wall**
//             if (ballY - ballRadius < 0) {
//                 ballSpeedY = -ballSpeedY;
//                 updateTransactions();  // **transaction event**
//             } 
//             // **Detect collision with bottom (paddle or lose life)**
//             else if (ballY + ballRadius > canvas.height) {
//                 if (ballX > paddleX && ballX < paddleX + paddleWidth) {
//                     ballSpeedY = -ballSpeedY;
//                     updateTransactions();  // **transaction event**
//                 } else {
//                     loseLife();
//                    //loseLife(livesRef, setGameOver, resetBallAndPaddle, canvas, setBallState, setPaddleX);
//                 }
//             }
        
//             // **Move paddle left or right**
//             if (rightPressed && paddleX < canvas.width - paddleWidth) {
//                 paddleX += 5;
//             } else if (leftPressed && paddleX > 0) {
//                 paddleX -= 5;
//             }
        
//             requestAnimationFrame(updateGame);
//         }
        
        

//         updateGame();

//         // return () => {
//         //     document.removeEventListener("keydown", keyDownHandler);
//         //     document.removeEventListener("keyup", keyUpHandler);
//         // };
//     }, [gameOver, bricks]);

//     console.log("totalTransactions:", totalTransactions, "Latency:", latency);

//     return (
//         <>
//             <canvas
//                 ref={canvasRef}
//                 style={{ background: "#eee", display: "block", margin: "auto" }}
//             />
//             <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
//             <LatencyGraph latency={latency} /> 
//             {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
//         </>
//     );
    
// };

// export default Game;


//V2

// import React, { useEffect, useRef, useState } from "react";
// import useTracking from "./Tracking";
// import LatencyGraph from "./LatencyGraph";
// import { drawBall, drawPaddle, drawBricks } from "./Render";
// import GameStats from "./GameStats";
// import useControls from "./useControls";
// import { initializeBricks, handleGameLogic } from "./GameLogic";

// const Game = () => {
//     const { totalTransactions, latency, updateTransactions } = useTracking();
//     const canvasRef = useRef(null);
//     const livesRef = useRef(3);
//     const [gameOver, setGameOver] = useState(false);
    
//     const bricks = initializeBricks();
//     const { rightPressed, leftPressed } = useControls();

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
        
//         const ctx = canvas.getContext("2d");
//         canvas.width = 800;
//         canvas.height = 500;
        
//         handleGameLogic({
//             ctx,
//             canvas,
//             livesRef,
//             setGameOver,
//             gameOver,
//             bricks,
//             updateTransactions,
//             rightPressed,
//             leftPressed
//         });
//     }, [gameOver, rightPressed, leftPressed]);

//     return (
//         <>
//             <canvas ref={canvasRef} style={{ background: "#eee", display: "block", margin: "auto" }} />
//             <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
//             <LatencyGraph latency={latency} />
//             {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
//         </>
//     );
// };

// export default Game;
