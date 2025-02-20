import React, { useEffect, useState } from "react";
import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const MAX_LATENCY = 6000; // Default value when no new data is available
const UPDATE_INTERVAL = 50; // Adjust this to match the tracker's update rate
const WINDOW_SIZE = 50; // Keep last 50 points (assuming 0.1s updates, this is 5s of data)

const LatencyGraph = ({ latency }) => {
    const [data, setData] = useState([]);
    const [startTime] = useState(Date.now()); // Store game start time

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const currentTime = (Date.now() - startTime) / 1000; // Convert ms to seconds

                const newEntry = {
                    time: currentTime,
                    latency: latency || MAX_LATENCY, // Use MAX_LATENCY if no data
                };

                return [...prevData, newEntry].slice(-WINDOW_SIZE); // Keep only last WINDOW_SIZE points
            });
        }, UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, [latency, startTime]); // Runs every `UPDATE_INTERVAL`, updates with latest latency

    return (
        <div style={{ width: "80%", height: 250, position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", background: "#fff" }}>
            <h4 style={{ textAlign: "center", marginBottom: "5px" }}>Latency Over Time</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={["auto", "auto"]} // Auto-adjusts as time increases
                        tickFormatter={(time) => `${Math.floor(time)}s`} // Show seconds as whole numbers
                        interval="preserveStartEnd" // Ensures ticks appear at whole seconds
                        label={{ value: "Time Since Game Start (s)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                        domain={[1, MAX_LATENCY]}
                        scale="log"
                        reversed
                        label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip />
                    <Line type="linear" dataKey="latency" stroke="#8884d8" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LatencyGraph;

