import React from "react";

const CHAINS = [
    { name: "MegaETH", latency: 10, description: "Min. Latency: 10ms (REALTIME)" },
    { name: "Solana", latency: 400, description: "Min. Latency: 400ms" },
    { name: "Monad", latency: 250, description: "Min. Latency: 250ms" },
];

const ChainSelection = ({ onSelectChain }) => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Select a Blockchain</h2>
            {CHAINS.map((chain) => (
                <button 
                    key={chain.name}
                    onClick={() => onSelectChain(chain)}
                    style={{
                        display: "block", 
                        margin: "10px auto",
                        padding: "10px 20px",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}
                >
                    {chain.name} - {chain.description}
                </button>
            ))}
        </div>
    );
};

export default ChainSelection;
