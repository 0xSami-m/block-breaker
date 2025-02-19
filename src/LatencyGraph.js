// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const LatencyGraph = ({ latency }) => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         setData((prevData) => {
//             const newData = [...prevData, { time: prevData.length, latency }];
//             return newData.slice(-50); // Keep only the last 50 points
//         });
//     }, [latency]);

//     return (
//         <div style={{ width: "100%", height: 200, position: "absolute", bottom: 0, background: "#fff" }}>
//             <h4 style={{ textAlign: "center" }}>Latency Over Time (Log Scale)</h4>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={data}>
//                     {/* <XAxis dataKey="time" /> */}
//                     <YAxis domain={[1, 3000]} scale="log" reversed />
//                     <Tooltip />
//                     {/* <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} /> */}
//                     <Line type="linear" dataKey="latency" stroke="#8884d8" dot={false} />

//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

//export default LatencyGraph;

// V now 
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// const MAX_LATENCY = 6000; // Default value when no new data is available
// const UPDATE_INTERVAL = 50; // Adjust this to match the tracker's update rate

// const LatencyGraph = ({ latency }) => {
//     const [data, setData] = useState([]);
//     const [startTime] = useState(Date.now()); // Store game start time

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setData((prevData) => {
//                 const currentTime = (Date.now() - startTime) / 1000; // Convert ms to seconds
                
//                 // Fill in missing latency values with max latency
//                 const newEntry = {
//                     time: currentTime,
//                     latency: latency || MAX_LATENCY,
//                 };

//                 return [...prevData, newEntry].slice(-50); // Keep only last 50 points
//             });
//         }, UPDATE_INTERVAL);

//         return () => clearInterval(interval);
//     }, [latency, startTime]); // Runs every `UPDATE_INTERVAL`, updates with latest latency

//     return (
//         <div style={{ width: "80%", height: 250, position: "absolute", bottom: 100, background: "#fff" }}>
//             <h4 style={{ textAlign: "center" }}>Latency (Log Scale)</h4>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={data}>
//                     <XAxis
//                         dataKey="time"
//                         type="number"
//                     //     domain={["auto", "auto"]} // Auto-adjusts as time increases
//                     //     tickFormatter={(time) => `${time.toFixed(0)}s`} // Show seconds
//                     // />
//                     domain={["auto", "auto"]} // Auto-adjusts as time increases
//                     tickFormatter={(time) => `${time}s`} // Show time as whole seconds
//                     interval="preserveStartEnd" // Ensures ticks appear every second
//                 />
//                     <YAxis domain={[1, MAX_LATENCY]} scale="log" reversed />
//                     <Tooltip />
//                     <Line type="linear" dataKey="latency" stroke="#8884d8" dot={false} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default LatencyGraph;

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


// V3
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// const MAX_LATENCY = 3000; // Default latency when no data is available
// const UPDATE_INTERVAL = 100; // Updates every 0.1 seconds

// const LatencyGraph = ({ latency }) => {
//     const [data, setData] = useState([]);
//     const [startTime] = useState(Date.now()); // Store game start time

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const currentTime = Math.floor((Date.now() - startTime) / 1000); // Whole seconds

//             setData((prevData) => {
//                 // Check if the last entry is already at the current whole second
//                 if (prevData.length > 0 && prevData[prevData.length - 1].time === currentTime) {
//                     return prevData; // Prevent duplicate timestamps
//                 }

//                 const newEntry = {
//                     time: currentTime, // X-axis: whole seconds since game started
//                     latency: latency || MAX_LATENCY, // Default if no data
//                 };

//                 return [...prevData, newEntry].slice(-100); // Keep last 100 points
//             });
//         }, UPDATE_INTERVAL);

//         return () => clearInterval(interval);
//     }, [latency, startTime]);

//     return (
//         <div style={{ width: "100%", height: 200, position: "absolute", bottom: 0, background: "#fff" }}>
//             <h4 style={{ textAlign: "center" }}>Latency Over Time (Log Scale)</h4>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={data}>
//                     <XAxis
//                         dataKey="time"
//                         type="number"
//                         domain={["auto", "auto"]}
//                         tickFormatter={(time) => `${time}s`} // Only whole seconds
//                         interval={0} // Force ticks at every whole second
//                     />
//                     <YAxis domain={[1, MAX_LATENCY]} scale="log" reversed />
//                     <Tooltip />
//                     <Line type="linear" dataKey="latency" stroke="#8884d8" dot={false} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default LatencyGraph;


// V4
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// const MAX_LATENCY = 3000; // Default latency when no data is available
// const UPDATE_INTERVAL = 100; // Updates every 0.1 seconds
// const WINDOW_SIZE = 10; // Show only the last 10 seconds

// const LatencyGraph = ({ latency }) => {
//     const [data, setData] = useState([]);
//     const [startTime] = useState(Date.now()); // Store game start time

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const currentTime = Math.floor((Date.now() - startTime) / 1000); // Whole seconds

//             setData((prevData) => {
//                 const newEntry = {
//                     time: currentTime, // X-axis: whole seconds since game started
//                     latency: latency || MAX_LATENCY, // Default if no data
//                 };

//                 const updatedData = [...prevData, newEntry];

//                 // Keep only the last `WINDOW_SIZE` seconds
//                 return updatedData.filter((entry) => entry.time >= currentTime - WINDOW_SIZE);
//             });
//         }, UPDATE_INTERVAL);

//         return () => clearInterval(interval);
//     }, [latency, startTime]);

//     return (
//         <div style={{ width: "100%", height: 200, position: "absolute", bottom: 0, background: "#fff" }}>
//             <h4 style={{ textAlign: "center" }}>Latency Over Time (Log Scale)</h4>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={data}>
//                     <XAxis
//                         dataKey="time"
//                         type="number"
//                         domain={["auto", "auto"]} // Dynamic range
//                         tickFormatter={(time) => `${time}s`} // Show whole seconds
//                         interval={0} // Force ticks at every second
//                     />
//                     <YAxis domain={[1, MAX_LATENCY]} scale="log" reversed />
//                     <Tooltip />
//                     <Line type="linear" dataKey="latency" stroke="#8884d8" dot={false} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default LatencyGraph;

// V5
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// const MAX_LATENCY = 3000; // Default latency when no data is available
// const UPDATE_INTERVAL = 100; // Updates every 0.1 seconds
// const WINDOW_SIZE = 10; // Show only the last 10 seconds
// const SMOOTHING_FACTOR = 5; // Use last 5 samples to smooth data

// const LatencyGraph = ({ latency }) => {
//     const [data, setData] = useState([]);
//     const [startTime] = useState(Date.now()); // Store game start time
//     const [latencyHistory, setLatencyHistory] = useState([]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const currentTime = Math.floor((Date.now() - startTime) / 1000); // Whole seconds

//             setLatencyHistory((prev) => {
//                 const newHistory = [...prev, latency || MAX_LATENCY];
//                 if (newHistory.length > SMOOTHING_FACTOR) newHistory.shift(); // Keep only the last N values
//                 return newHistory;
//             });

//             const smoothedLatency = latencyHistory.length
//                 ? latencyHistory.reduce((sum, val) => sum + val, 0) / latencyHistory.length
//                 : latency || MAX_LATENCY; // Average last N samples

//             setData((prevData) => {
//                 const newEntry = {
//                     time: currentTime, // X-axis: whole seconds since game started
//                     latency: smoothedLatency, // Use smoothed latency
//                 };

//                 const updatedData = [...prevData, newEntry];

//                 // Keep only the last `WINDOW_SIZE` seconds
//                 return updatedData.filter((entry) => entry.time >= currentTime - WINDOW_SIZE);
//             });
//         }, UPDATE_INTERVAL);

//         return () => clearInterval(interval);
//     }, [latency, startTime, latencyHistory]);

//     return (
//         <div style={{ width: "100%", height: 200, position: "absolute", bottom: 0, background: "#fff" }}>
//             <h4 style={{ textAlign: "center" }}>Latency Over Time (Log Scale)</h4>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={data}>
//                     <XAxis
//                         dataKey="time"
//                         type="number"
//                         domain={["auto", "auto"]} // Dynamic range
//                         tickFormatter={(time) => `${time}s`} // Show whole seconds
//                         interval={0} // Force ticks at every second
//                     />
//                     <YAxis domain={[1, MAX_LATENCY]} scale="log" reversed />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default LatencyGraph;



// V1?
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const LatencyGraph = ({ latency }) => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         setData((prevData) => {
//             const newData = [...prevData, { time: prevData.length, latency }];
//             return newData.slice(-50); // Keep only the last 50 points
//         });
//     }, [latency]);

//     return (
//         <div style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             width: "100%",
//             height: "150px",  // Slightly smaller height
//             background: "rgba(255, 255, 255, 0.9)", // Slight transparency
//             borderTop: "2px solid #ccc", // Separate from game visually
//             zIndex: 1000 // Ensure it stays on top
//         }}>
//             <h4 style={{ textAlign: "center", margin: "5px 0", fontSize: "14px" }}>Latency Over Time (Log Scale)</h4>
//             <ResponsiveContainer width="100%" height="85%">
//                 <LineChart data={data}>
//                     <XAxis dataKey="time" tick={{ fontSize: 12 }} />
//                     <YAxis domain={[1, 3000]} scale="log" reversed tick={{ fontSize: 12 }} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default LatencyGraph;

