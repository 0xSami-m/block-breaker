// import { useState, useEffect, useRef } from "react";

// export default function useTracking() {
//     const [tps, setTps] = useState(0);
//     const [latency, setLatency] = useState(0);

//     // Refs to track values without causing unnecessary re-renders
//     const tpsCounter = useRef(0);
//     const lastMovementTime = useRef(Date.now());

//     useEffect(() => {
//         const updateTPS = () => {
//             tpsCounter.current += 1;

//             // Force a React state update for latency
//             const now = Date.now();
//             setLatency(now - lastMovementTime.current);
//             lastMovementTime.current = now;

//             // Force a re-render every time a key is pressed
//             setTps((prevTps) => prevTps + 1);
//         };

//         const keyDownHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight" || event.key === "Left" || event.key === "ArrowLeft") {
//                 updateTPS();
//             }
//         };

//         document.addEventListener("keydown", keyDownHandler);

//         // Update TPS every second
//         const tpsInterval = setInterval(() => {
//             setTps(tpsCounter.current); // React properly updates TPS
//             tpsCounter.current = 0; // Reset counter for the next second
//         }, 1000);

//         return () => {
//             document.removeEventListener("keydown", keyDownHandler);
//             clearInterval(tpsInterval);
//         };
//     }, []);

//     // ✅ Correct placement of console log
//     useEffect(() => {
//         console.log("Updating tracking:", { tps, latency });
//     }, [tps, latency]);

//     return { tps, latency };
// }

// import { useState, useEffect, useRef } from "react";

// export default function useTracking() {
//     const [tps, setTps] = useState(0);
//     const [latency, setLatency] = useState(0);

//     // Refs to track values without causing unnecessary re-renders
//     const tpsCounter = useRef(0);
//     const lastMovementTime = useRef(Date.now());

//     useEffect(() => {
//         const updateTPS = () => {
//             tpsCounter.current += 1;

//             // Force a React state update for latency
//             const now = Date.now();
//             setLatency(now - lastMovementTime.current);
//             lastMovementTime.current = now;
//         };

//         const keyDownHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight" || event.key === "Left" || event.key === "ArrowLeft") {
//                 updateTPS();
//             }
//         };

//         document.addEventListener("keydown", keyDownHandler);

//         // Update TPS every second
//         const tpsInterval = setInterval(() => {
//             setTps(tpsCounter.current); // Update TPS state
//             tpsCounter.current = 0; // Reset for the next second
//         }, 1000);

//         return () => {
//             document.removeEventListener("keydown", keyDownHandler);
//             clearInterval(tpsInterval);
//         };
//     }, []);

//     return { tps, latency };
// }



// import { useState, useEffect, useRef } from "react";

// export default function useTracking() {
//     const [tps, setTps] = useState(0);
//     const [latency, setLatency] = useState(0);

//     // Refs to track values without causing unnecessary re-renders
//     const tpsCounter = useRef(0);
//     const lastMovementTime = useRef(Date.now());

//     // ✅ Move `updateTPS` function outside of useEffect so it can be used in `Game.js`
//     const updateTPS = () => {
//         tpsCounter.current += 1;

//         // Force a React state update for latency
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
//             tpsCounter.current = 0; // Reset for next second
//         }, 1000);

//         return () => {
//             document.removeEventListener("keydown", keyDownHandler);
//             clearInterval(tpsInterval);
//         };
//     }, []);

//     return { tps, latency, updateTPS }; // ✅ Export `updateTPS`
// }


import { useState, useEffect, useRef } from "react";

export default function useTracking() {
    const [tps, setTps] = useState(0);
    const [latency, setLatency] = useState(0);

    // Refs to track values without causing unnecessary re-renders
    const tpsCounter = useRef(0);
    const lastMovementTime = useRef(Date.now());

    const updateTPS = () => {
        tpsCounter.current += 1;

        // Update latency based on the latest event
        const now = Date.now();
        setLatency(now - lastMovementTime.current);
        lastMovementTime.current = now;
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight" || event.key === "Left" || event.key === "ArrowLeft") {
                updateTPS();
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        // Update TPS every second
        const tpsInterval = setInterval(() => {
            setTps(tpsCounter.current);
            tpsCounter.current = 0; // Reset for the next second
        }, 1000);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            clearInterval(tpsInterval);
        };
    }, []);

    return { tps, latency, updateTPS }; // Expose updateTPS so Game.js can call it
}
