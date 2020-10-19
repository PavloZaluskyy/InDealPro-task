const Wall = require('./wall/Wall')
let matrix = [
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
],
matrix2 =   [
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1]
] 
let combinations = [
    [1, 1, 4],
    [2, 1, 6],
    [1, 3, 1],
    [3, 4, 5]
], 
combinations2 = [
    [1, 1, 4],
    [2, 1, 6],
    [1, 3, 1],
    [3, 4, 5],
    [6, 6, 1]
]
const wall = new Wall(6, 3, matrix, 4, combinations)
wall.build()
