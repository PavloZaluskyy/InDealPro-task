class Wall{
    constructor(W, H, matrix, countTypeBricks, combinations){
    this.W = W
    this.H = H
    this.matrix = matrix
    this.countTypeBricks = countTypeBricks
    this.combinations = combinations
    } 
    
    searchBlank(){
        let setBlank = new Set();
        for(let i = 0; i < this.matrix.length; i++){
            for(let k = 0; k < this.matrix[i].length; k++){
                if( (this.matrix[i][k] === 0) || (this.matrix[i][k] === '0')){
                    setBlank.add([i,k])
                } 
            }
        }
       return setBlank
    }

    searchFullLines(){
        let a = this.matrix.map((item, index)=>{
            let sum = 0
            for(let i of item){
                sum+=i
                if(sum === this.matrix[index].length)
                return index
            }
        })
        a= a.filter(i=>i!=undefined)
        console.log(a);
        return a
    }
    calculateBricks(){
        let arrayFullLines = this.searchFullLines();
        let a = this.combinations.filter(i => 
            i[0] <= arrayFullLines.length ||  i[1] <= arrayFullLines.length
        )
        a.map(i=> this.sortCombinations(i))
        return a
        console.log(this.matrix[0].length);
        /*if(a[a.length-1][2] === 0)
        difference = this.matrix[0].length - a[a.length-1][0]
        console.log(difference);*/
    }

    minusLines(){
        let arrayFullLines = this.searchFullLines();
        let arraySortCombynation = this.calculateBricks();
        let difference;
        for(let arrFullLine of arrayFullLines){
            difference = this.matrix[arrFullLine].length;
            for(let i = arraySortCombynation.length-1; i>=0; i--){
                
                    if((difference != 0) && (arraySortCombynation[i][2] != 0)){
                            difference -= arraySortCombynation[i][0]
                            arraySortCombynation[i][2] -= 1
                            console.log("arrFullLine   ->  "+ arrFullLine+ "   arraySortCombynation[i]  ->  " + arraySortCombynation[i] + "   difference    ->   " + difference);

                    }else
                    console.log(arrayFullLines );     
                
            }
        }
    }

    checkBlank(){
        let setBlank = this.searchBlank()
        let q = []
        for(let [column, row] of setBlank){
            console.log(row);
            q = combinations.filter(item => 
                item[0] <= row || item[1] <= row
            )
        }  
    }

    validationPlace(){
        if ((this.W <=0) || (this.H <= 0)) {
            console.error('Incorrectly entered W or H');
            return false 
        } 
        return true
    }

    validationMatrix(){
        if(!this.validationPlace()) return false
        for(let i = 0; i < this.matrix.length; i++){
            for(let k = 0; k < this.matrix[i].length; k++){
                if((this.matrix[i].length != this.W) || (this.matrix.length != this.H)){
                    console.error('Incorrectly entered matrix');
                    return false
                }       
            }
        }
        return true
    }

    validationCountTypeBricks(){
        if(Number.isInteger(this.countTypeBricks)){
            if (this.countTypeBricks > 0) return true 
            console.error('Incorrectly entered countTypeBricks');
            return false
        }
        console.error('Incorrectly entered countTypeBricks');
        return false
    }

    validationCombinations(){
        if(!this.validationCountTypeBricks()) return false
        for(let i = 0; i < this.combinations.length; i++){
            for(let k = 0; k < this.combinations[i].length; k++){
                if((this.combinations[i].length != 3) || ( this.combinations.length != this.countTypeBricks)){
                    console.error('Incorrectly entered combinations');
                    return false
                }       
            }
        }
        return true
    }
    
    sortCombinations(arr){
        let a=0;
        if(arr[0] < arr[1]){
            a = arr[0]
            arr[0] =arr[1]
            arr[1] = a
        }
        return arr
    }
}
module.exports = Wall