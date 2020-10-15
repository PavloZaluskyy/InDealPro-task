const Wall = require('./Wall')
let matrix = [
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
] 
let combinations = [
    [1, 1, 4],
    [2, 1, 6],
    [1, 3, 1],
    [3, 4, 5]
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

})
