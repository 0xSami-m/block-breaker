// with delay 
// import { useState } from "react";

// const usePaddleLogger = (mode) => {
//     const [movementLog, setMovementLog] = useState([]);
//     const [isWaitingForReceipt, setIsWaitingForReceipt] = useState(false); // Paddle delay revocation: line 1

//     const getDelay = () => {
//         if (mode === "MegaETH") return 10;  // ✅ Set to 1ms for real-time response
//         if (mode === "Solana") return 400;
//         if (mode === "Monad") return 250;
//         return 500; // Default delay for any other modes
//     };

//     const logPaddleMovement = (direction, movePaddle) => {
//         if (isWaitingForReceipt) {
//             console.warn("⛔ BLOCKED: Still waiting for receipt, skipping movement!");
//             return;
//         }
//         setIsWaitingForReceipt(true);
        
//         setMovementLog((prevLog) => [...prevLog, direction]);
//         console.log(`Logged move: ${direction}, waiting ${getDelay()}ms for receipt...`);

//         const startTime = performance.now();

// setTimeout(() => {
//     const endTime = performance.now();
//     console.log(`🕒 MegaETH latency: ${endTime - startTime}ms`);
    
//     setIsWaitingForReceipt(false); 
//     movePaddle();
// }, getDelay());

//     };


//     return { movementLog, logPaddleMovement };
// };

// export default usePaddleLogger;
