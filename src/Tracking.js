// import { useState, useEffect, useRef } from "react";

// export default function useTracking() {
//     const [tps, setTps] = useState(0);
//     const [latency, setLatency] = useState(0);

//     // Refs to track values without causing unnecessary re-renders
//     const tpsCounter = useRef(0);
//     const lastMovementTime = useRef(Date.now());

//     const updateTPS = () => {
//         tpsCounter.current += 1;

//         // Update latency based on the latest event
//         const now = Date.now();
//         setLatency(now - lastMovementTime.current);
//         lastMovementTime.current = now;
//     };

//     useEffect(() => {
//         const keyDownHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight" || event.key === "Left" || event.key === "ArrowLeft") {
//                 updateTPS();
//             }
//         };

//         document.addEventListener("keydown", keyDownHandler);

//         // Update TPS every second
//         const tpsInterval = setInterval(() => {
//             setTps(tpsCounter.current);
//             tpsCounter.current = 0; // Reset for the next second
//         }, 1000);

//         return () => {
//             document.removeEventListener("keydown", keyDownHandler);
//             clearInterval(tpsInterval);
//         };
//     }, []);

//     return { tps, latency, updateTPS }; // Expose updateTPS so Game.js can call it
// }

import { useState, useEffect, useRef } from "react";

export default function useTracking() {
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [latency, setLatency] = useState(0);

    const lastMovementTime = useRef(Date.now());

    const updateTransactions = () => {
        setTotalTransactions((prev) => prev + 1); // Increment total transactions

        // Update latency
        const now = Date.now();
        setLatency(now - lastMovementTime.current);
        lastMovementTime.current = now;
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight" || event.key === "Left" || event.key === "ArrowLeft") {
                updateTransactions();
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return { totalTransactions, latency, updateTransactions };
}

