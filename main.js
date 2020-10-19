let matrix = [
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
] 
let combinations = [
    [1, 1, 4],
    [2, 1, 6],
    [1, 3, 1],
    [3, 4, 5],
    [6, 6, 1]
]
const wall = new Wall(6, 3, matrix, 4, combinations)

console.log(wall)
console.log(wall.minusLines());
