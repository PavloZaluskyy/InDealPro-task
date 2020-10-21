class Wall{
    constructor(W, H, matrix, countTypeBricks, combinations){
    this.W = W
    this.H = H
    this.matrix = matrix
    this.countTypeBricks = countTypeBricks
    this.combinations = combinations
    } 
    
    build(){
        console.log(`Loading....`);
            if(!this.validationMatrix()){
                console.error(`Check the data: Matrix`);
                return false
            }
            if(!this.validationCombinations()){
                console.error(`Check the data: Combinations`);
                return false
            }
            if(this.minusLines()){
                if(this.calculateBlank()){
                    console.log(`You can build this wall.
                        Size  ------ ${this.W} x ${this.H},
                        Plan  ------ ${this.matrix},
                        Type Bricks -------- ${this.countTypeBricks},
                    =====================================================
                    You will have so many bricks left :
                                ${this.combinations}
                    `);
                    return true
                }
            }
            console.log();(`You cann't build this wall.
                        Size  ------ ${this.W} x ${this.H},
                        Plan  ------ ${this.matrix},
                        Type Bricks -------- ${this.countTypeBricks},
                    =====================================================`)
            return false  
    }

    searchBlank(){ 
        let setBlank = [],
            q = []
        for(let i = 0; i < this.matrix.length; i++){
            for(let k = 0; k < this.matrix[i].length; k++){
                if( (this.matrix[i][k] === 0) || (this.matrix[i][k] === '0')){
                    setBlank.push(k)
                } 
            }
        }
        for(let i = 0; i<setBlank.length; i++){
            if((i === 0) || (setBlank[i] <=  setBlank[i - 1]))
                q.push(setBlank[i])
            else
                 q.push(setBlank[i] - (setBlank[i - 1]+1))  
        }
       return q
    }

    calculateBlank(){ 
        let setBlank = this.searchBlank()
        let difference;
        let sum = 0;
        for(let i = 0; i < setBlank.length; i++){
            difference = setBlank[i]
            if(setBlank[i] === 0)
                difference = this.matrix[0].length - 1 
            while(difference != 0){
                for(let k = this.combinations.length-1; k>=0; k--){
                    while((this.combinations[k][2] != 0) && (this.combinations[k][0] <= difference)){
                        console.log('difference (' + difference+') - combinations['+k+'][0] ('+this.combinations[k][0]+')')
                        difference -= this.combinations[k][0]
                        this.combinations[k][2] -= 1
                        console.log('difference ' + difference)
    					console.log('combinations['+k+'][2] ' + this.combinations[k][2])
    					console.log('=============================')
                    }
                }
                if(this.combinations[0][2] === 0)
                { console.error("arraySortCombynation[0][2] === 0")
                return false}
                else setBlank[i] = 0
            }
        }
        setBlank.map(item=>{sum+=item})
        this.combinations = this.combinations.filter(item => item[2]!=0)
        if(sum === 0)
            return true;
        return false    
    }


    searchFullLines(matrix){
        let a = matrix.map((item, index)=>{
            let sum = 0
            for(let i of item){
                sum+=i
                if(sum === matrix[index].length)
                return index
            }
        })
        a= a.filter(i=>i!=undefined)
        return a
    }
    calculateBricks(){
        let arrayFullLines = this.searchFullLines(this.matrix);
        let a = this.combinations.filter(i => 
            i[0] <= arrayFullLines.length ||  i[1] <= arrayFullLines.length
        )
        a.map(i=> this.sortCombinations(i))
        return a
    }

    minusLines(){
        let arrayFullLines = this.searchFullLines(this.matrix);
        let arraySortCombynation = this.calculateBricks();
        let difference;
        let sum = 0;
        for(let i = 0; i < arrayFullLines.length; i++){
    		difference = this.matrix[0].length
    		while(difference != 0){
    			for(let k = arraySortCombynation.length-1; k>=0; k--){
    				while ((arraySortCombynation[k][2] != 0)  && (arraySortCombynation[k][0] <= difference)) {
    					console.log('difference (' + difference+') - combinations['+k+'][0] ('+arraySortCombynation[k][0]+')')
    					difference -= arraySortCombynation[k][0]
    					arraySortCombynation[k][2] -= 1
    					console.log('difference ' + difference)
    					console.log('combinations['+k+'][2] ' + arraySortCombynation[k][2])
    					console.log('=============================')
    				}
                }
                if(arraySortCombynation[0][2] === 0)
                { console.error("arraySortCombynation[0][2] === 0")
                break}
                else arrayFullLines[i] = 0
    		}
        }
        arrayFullLines.map(item=>sum+=item)
        arraySortCombynation=arraySortCombynation.filter(item => item[2]!=0)
        if(sum === 0){
            this.combinations = arraySortCombynation
            return true;
        }
        return false      
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