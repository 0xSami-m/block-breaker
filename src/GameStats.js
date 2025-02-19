import React from "react";

const GameStats = ({ totalTransactions, latency, lives }) => {
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
};

export default GameStats;
