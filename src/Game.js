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



import React, { useEffect, useRef, useState } from "react";
import useTracking from "./Tracking";
import LatencyGraph from "./LatencyGraph";
import { drawBall, drawPaddle, drawBricks } from "./Render";
import GameStats from "./GameStats";
import useControls from "./useControls";




const Game = () => {

   const { totalTransactions, latency, updateTransactions } = useTracking();
    const canvasRef = useRef(null);
    const livesRef = useRef(3); // Use ref to track lives
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

    const paddleWidth = 100;
    const paddleHeight = 10;
    const canvasWidth = 800;
    const canvasHeight = 500;

    //const paddleX = useControls(canvasWidth, paddleWidth);
    const { paddleX, updatePaddlePosition } = useControls(canvasWidth, paddleWidth);

    
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

        let ballX = canvas.width / 2;
        let ballY = canvas.height - 30;
        let ballSpeedX = 2;
        let ballSpeedY = -2;
        let ballRadius = 10;

        // const paddleHeight = 10;
        // const paddleWidth = 100;
        // let paddleX = (canvas.width - paddleWidth) / 2;
        // let rightPressed = false;
        // let leftPressed = false;

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

 

        function collisionDetection() {
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
        

        function resetBallAndPaddle() {
            ballX = canvas.width / 2;
            ballY = canvas.height - 30;
            ballSpeedX = 2;
            ballSpeedY = -2;
           // paddleX = (canvas.width - paddleWidth) / 2;
           paddleX.current = (canvas.width - paddleWidth)
        }
    

        function loseLife() {
            if (livesRef.current > 1) {
                livesRef.current -= 1;
                //setLives(livesRef.current);
                resetBallAndPaddle();
            } else {
                setGameOver(true);
                setTimeout(() => alert("Game Over!"), 100);
            }
        }


        function updateGame() {
            if (gameOver) return;
        
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBricks(ctx, bricks, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop);
            drawBall(ctx, ballX, ballY, ballRadius);
           // drawPaddle(ctx, paddleX, canvas.height, paddleWidth, paddleHeight);
            drawPaddle(ctx, paddleX.current, canvas.height, paddleWidth, paddleHeight);

            collisionDetection();
            updatePaddlePosition(); 
            

            
            ballX += ballSpeedX;
            ballY += ballSpeedY;
        
            // **Detect collision with side walls**
            if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
                ballSpeedX = -ballSpeedX;
                updateTransactions();  // **transaction event**
            }
        
            // **Detect collision with top wall**
            if (ballY - ballRadius < 0) {
                ballSpeedY = -ballSpeedY;
                updateTransactions();  // **transaction event**
            } 
            // **Detect collision with bottom (paddle or lose life)**
            else if (ballY + ballRadius > canvas.height) {
                //if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                if (ballX > paddleX.current && ballX < paddleX.current + paddleWidth) {
                    ballSpeedY = -ballSpeedY;
                    updateTransactions();  // **transaction event**
                }
                 else {
                    loseLife();
                   //loseLife(livesRef, setGameOver, resetBallAndPaddle, canvas, setBallState, setPaddleX);
                }
            }
        
            // **Move paddle left or right**
            // if (rightPressed && paddleX < canvas.width - paddleWidth) {
            //     paddleX += 5;
            // } else if (leftPressed && paddleX > 0) {
            //     paddleX -= 5;
            // }
        
            requestAnimationFrame(updateGame);
        }
        
        

        updateGame();

        // return () => {
        //     document.removeEventListener("keydown", keyDownHandler);
        //     document.removeEventListener("keyup", keyUpHandler);
        // };
    }, [gameOver, bricks]);

    console.log("totalTransactions:", totalTransactions, "Latency:", latency);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ background: "#eee", display: "block", margin: "auto" }}
            />
            <GameStats totalTransactions={totalTransactions} latency={latency} lives={livesRef.current} />
            <LatencyGraph latency={latency} /> 
            {gameOver && <h2 style={{ textAlign: "center" }}>Game Over!</h2>}
        </>
    );
    
};

export default Game;