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

