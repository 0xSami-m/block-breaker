// with delay 
// import { useEffect, useRef } from "react";

// const useControls = (canvasWidth, paddleWidth, logPaddleMovement) => {
//     const paddleX = useRef((canvasWidth - paddleWidth) / 2);
//     const isWaitingForReceipt = useRef(false);

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
//                 if (isWaitingForReceipt.current) return; // Prevent movement if waiting for receipt
                
//                 isWaitingForReceipt.current = true; // Block further input
                
//                 logPaddleMovement(event.key, () => {
//                     updatePaddlePosition(event.key);
//                     isWaitingForReceipt.current = false; // Allow movement after receipt
//                 });
//             }
//         };

//         document.addEventListener("keydown", handleKeyDown);
//         return () => document.removeEventListener("keydown", handleKeyDown);
//     }, [logPaddleMovement]);

//     const updatePaddlePosition = (direction) => {
//         if (direction === "ArrowRight" && paddleX.current < canvasWidth - paddleWidth) {
//             paddleX.current += 5;
//         } else if (direction === "ArrowLeft" && paddleX.current > 0) {
//             paddleX.current -= 5;
//         }
//     };

//     return { paddleX, updatePaddlePosition };
// };

// export default useControls;

import { useEffect, useRef } from "react";

const useControls = (canvasWidth, paddleWidth) => {
    const paddleX = useRef((canvasWidth - paddleWidth) / 2);
    const rightPressed = useRef(false);
    const leftPressed = useRef(false);

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight") {
                rightPressed.current = true;
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                leftPressed.current = true;
            }
        };

        const keyUpHandler = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight") {
                rightPressed.current = false;
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                leftPressed.current = false;
            }
        };

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, []);

    const updatePaddlePosition = () => {
        if (rightPressed.current && paddleX.current < canvasWidth - paddleWidth) {
            paddleX.current += 5;
        } else if (leftPressed.current && paddleX.current > 0) {
            paddleX.current -= 5;
        }
    };

    return { paddleX, updatePaddlePosition };
};

export default useControls;