class Wall{
    constructor(W, H, matrix, countTypeBricks, combinations){
    this.W = W
    this.H = H
    this.matrix = matrix
    this.countTypeBricks = countTypeBricks
    this.combinations = combinations
    } 

    validationPlace(){
       if ((this.W <=0) || (this.H <= 0)) {
        console.error('Incorrectly entered W or H');
        return false 
       } 
         else 
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
            if (0 < this.countTypeBricks) return true 
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

}
module.exports = Wall