// import { useState, useEffect } from "react";

// const useControls = () => {
//     const [rightPressed, setRightPressed] = useState(false);
//     const [leftPressed, setLeftPressed] = useState(false);

//     useEffect(() => {
//         const keyDownHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight") {
//                 setRightPressed(true);
//             } else if (event.key === "Left" || event.key === "ArrowLeft") {
//                 setLeftPressed(true);
//             }
//         };

//         const keyUpHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight") {
//                 setRightPressed(false);
//             } else if (event.key === "Left" || event.key === "ArrowLeft") {
//                 setLeftPressed(false);
//             }
//         };

//         document.addEventListener("keydown", keyDownHandler);
//         document.addEventListener("keyup", keyUpHandler);

//         return () => {
//             document.removeEventListener("keydown", keyDownHandler);
//             document.removeEventListener("keyup", keyUpHandler);
//         };
//     }, []);

//     return { rightPressed, leftPressed };
// };

// export default useControls;


//V3
// import { useState, useEffect } from "react";

// const useControls = (canvasWidth, paddleWidth) => {
//     const [paddleX, setPaddleX] = useState((canvasWidth - paddleWidth) / 2);
//     const [rightPressed, setRightPressed] = useState(false);
//     const [leftPressed, setLeftPressed] = useState(false);

//     useEffect(() => {
//         const keyDownHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight") {
//                 setRightPressed(true);
//             } else if (event.key === "Left" || event.key === "ArrowLeft") {
//                 setLeftPressed(true);
//             }
//         };

//         const keyUpHandler = (event) => {
//             if (event.key === "Right" || event.key === "ArrowRight") {
//                 setRightPressed(false);
//             } else if (event.key === "Left" || event.key === "ArrowLeft") {
//                 setLeftPressed(false);
//             }
//         };

//         document.addEventListener("keydown", keyDownHandler);
//         document.addEventListener("keyup", keyUpHandler);

//         return () => {
//             document.removeEventListener("keydown", keyDownHandler);
//             document.removeEventListener("keyup", keyUpHandler);
//         };
//     }, []);

//     useEffect(() => {
//         if (rightPressed && paddleX < canvasWidth - paddleWidth) {
//             setPaddleX((prevX) => prevX + 5);
//         } else if (leftPressed && paddleX > 0) {
//             setPaddleX((prevX) => prevX - 5);
//         }
//     }, [rightPressed, leftPressed, paddleX, canvasWidth, paddleWidth]);

//     return paddleX;
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
