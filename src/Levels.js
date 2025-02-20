export const LEVELS = [
    {
        rows: 5,
        cols: 9,
        width: 75,
        height: 20,
        padding: 10,
        offsetTop: 30,
        offsetLeft: 30,
        brickColor: "#32b288",
    },
    {
        rows: 6,
        cols: 9,
        width: 70,
        height: 18,
        padding: 8,
        offsetTop: 40,
        offsetLeft: 25,
        brickColor: "f6ae5c",
    }
];

// Initialize bricks based on level
export function initializeBricks(level) {
    const { rows, cols } = LEVELS[level];
    let brickArray = [];
    for (let c = 0; c < cols; c++) {
        brickArray[c] = [];
        for (let r = 0; r < rows; r++) {
            brickArray[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    return brickArray;
}
