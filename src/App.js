import React, { useState } from "react";
import Game from "./Game";

const MENU_OPTIONS = [
    { name: "MegaETH", description: "Minimum Latency: 10ms (REALTIME)" },
    { name: "Solana", description: "Minimum Latency: 400ms" },
    { name: "Monad", description: "Minimum Latency: 250ms" }
];

const Menu = ({ onSelectMode }) => {
    return (
        <div style={{ textAlign: "center", marginTop: "20vh" }}>
            <h1>Brick Breaker</h1>
            <h3>Select Game Mode</h3>
            {MENU_OPTIONS.map((option) => (
                <div key={option.name} style={{ marginBottom: "15px" }}>
                    <button
                        onClick={() => onSelectMode(option.name)}
                        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
                    >
                        {option.name}
                    </button>
                    <p style={{ fontSize: "14px", color: "#555" }}>{option.description}</p>
                </div>
            ))}
        </div>
    );
};

const App = () => {
    const [selectedMode, setSelectedMode] = useState(null);

    return (
        <div>
            {!selectedMode ? (
                <Menu onSelectMode={setSelectedMode} />
            ) : (
                <Game mode={selectedMode} />
            )}
        </div>
    );
};

export default App;
