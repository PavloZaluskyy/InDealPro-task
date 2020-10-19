const Wall = require('./Wall')
let matrix = [
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
],
matrix2 =   [
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
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

describe('InDealPro task: Wall ', () => {
    let wall
    beforeEach(() => {
       wall = new Wall(6, 3, matrix, 4, combinations)
    })

    test('should exists and to be typeof function', ()=>{
        expect(Wall).toBeDefined()
        expect(typeof Wall).toBe('function')
    })

    test('the instance must have the properties: W, H, countTypeBricks and they must be positive integers', ()=>{
        expect(wall.W).toBeDefined()
        expect(wall.H).toBeDefined()
        expect(wall.countTypeBricks).toBeDefined()

        expect(typeof wall.W).toBe('number')
        expect(typeof wall.H).toBe('number')
        expect(typeof wall.countTypeBricks).toBe('number')

        expect(Number.isInteger(wall.W)).toBe(true)
        expect(Number.isInteger(wall.H)).toBe(true)
        expect(Number.isInteger(wall.countTypeBricks)).toBe(true)

        expect(0 < wall.H).toBe(true)
        expect(0 < wall.H).toBe(true)
        expect(0 < wall.countTypeBricks).toBe(true)
   })
   
    
    test('instance must have methods and be true : validationPlace(), validationMatrix(), \n validationCountTypeBricks(), validationCombinations()', ()=>{
         expect(wall.validationPlace()).toBeDefined()
         expect(wall.validationMatrix()).toBeDefined()
         expect(wall.validationCountTypeBricks()).toBeDefined()
         expect(wall.validationCombinations()).toBeDefined()

         expect(wall.validationPlace()).toBe(true)
         expect(wall.validationMatrix()).toBe(true)
         expect(wall.validationCountTypeBricks()).toBe(true)
         expect(wall.validationCombinations()).toBe(true)
    })

    // test('instance must have a method and return true or false if all combinations manage to fill in the lines: minusLines()', ()=>{
    //     expect(wall.minusLines()).toBeDefined()
    //     expect(wall.minusLines()).toBe(true)
    // })

    test('instance must have method and return Sorted array: sortCombinations(array)', ()=>{
        expect(wall.sortCombinations(wall.combinations)).toBeDefined()
        expect(typeof wall.sortCombinations([1,2,3])).toBe('object')
        expect(wall.sortCombinations([1,2,3])).toEqual([2, 1, 3])
        expect(wall.sortCombinations(wall.combinations)).toEqual([[2, 1, 6], [1, 1, 4], [1, 3, 1], [3, 4, 5]])
    })
    test('instance must have a method and return an array of indexes with filled lines: searchFullLines(array)', ()=>{
        expect(wall.searchFullLines(wall.matrix)).toBeDefined()
        expect(typeof wall.searchFullLines(matrix2)).toBe('object')
        expect(wall.searchFullLines(wall.matrix)).toEqual([1,2])
        expect(wall.searchFullLines(matrix2)).toEqual([1, 2, 3])
    })
    test('instance must have a method and return an array of bricks suitable for that filled line. Invokes the sortCombinations(array) \n method so the array is sorted: calculateBricks()', ()=>{
        expect(wall.calculateBricks()).toBeDefined()
        expect(typeof wall.calculateBricks()).toBe('object')
        expect(wall.calculateBricks()).toEqual([[2, 1, 6], [1, 1, 4], [3, 1, 1]])
        wall.matrix = matrix2
        expect(wall.calculateBricks()).toEqual([[2, 1, 6], [1, 1, 4], [3, 1, 1], [4, 3, 5]])
        wall.combinations = combinations2
        expect(wall.calculateBricks()).toEqual([[1, 1, 4], [2, 1, 6], [3, 1, 1], [4, 3, 5]])
    })
    test('instance must have a method and return an array of all empty elements: searchBlank()', ()=>{
        expect(wall.searchBlank()).toBeDefined()
        expect(typeof wall.searchBlank()).toBe('object')
        expect(wall.searchBlank()).toEqual([1, 2])
        wall.matrix = [
            [1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1]
        ] 
        expect(wall.searchBlank()).toEqual([1, 2, 3])
    })
    test('the instance must have a method and return true or false if all combinations have time to fill in incomplete lines: calculateBlank()',()=>{
        expect(wall.calculateBlank()).toBeDefined()
        expect(wall.calculateBlank()).toBe(true)
    })
})
