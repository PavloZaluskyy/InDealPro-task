//const Wall = require('./wall/Wall')
// let matrix = [
//     [1, 0, 1, 1, 0, 1],
//     [1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1]
// ],
// matrix2 =   [
//     [1, 0, 1, 1, 0, 1],
//     [1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 1, 1],
//     [0, 1, 1, 1, 1, 1]
// ] 
// let combinations = [
//     [1, 1, 4],
//     [2, 1, 6],
//     [1, 3, 1],
//     [3, 4, 5]
// ], 
// combinations2 = [
//     [1, 1, 4],
//     [2, 1, 6],
//     [1, 3, 1],
//     [3, 4, 5],
//     [6, 6, 1]
// ]
//const wall = new Wall(6, 3, matrix, 4, combinations)
//wall.build()

let w = document.querySelector('#width')
let h = document.querySelector('#height')
let itemMatrix = document.querySelector('.item-matrix')
let countTypeBricks = document.querySelector('#countTypeBricks')


let width, height, matrix, countBricks, combinations = [];

drawMatrix(1,1)
drawFieldBricks(1)

w.addEventListener('change', ()=>{drawMatrix(w.value,h.value)});
h.addEventListener('change', ()=>{drawMatrix(w.value,h.value)});
countTypeBricks.addEventListener('change', ()=>{drawFieldBricks(countTypeBricks.value)});

function drawMatrix (w, h){
    if(!validationSizePlace(+w,+h)) return false
    let arr = [];
    let row = []
    let out ="";
    for(let i = 0; i < +h; i++ ){
        out += `<tr>`
        row=[]
        for(let k = 0 ; k < +w; k ++){
            row.push(0)
            out+= `<th class="item-matrix" onclick = "createPlane(this)" data-h="${i}" data-w="${k}" > </th>`  
        }
        arr.push(row)
        out += `</tr>`
    }
    document.querySelector('.global-matrix').innerHTML = out
    matrix = arr;
    return matrix
}
function drawFieldBricks(count){
    if(!validationCountTypeBricks(+count)) return false
    let out= ''
    //combinations = []
    let arr 
    for(let i = 0; i< count; i++){
        arr = []
        out+= `
        <div class="row card" onclick="changeDataOfBrick(this)" data-brickItem="${i}" >
            <div class="input-field col s2">
                <input value="1" id="sizeW" data-a="0"  min="1" max="8" type="number" class="changeDataOfBrick validate">
                <label class="active" for="sizeW">ширина цегли</label>
            </div>
            <div class="input-field col s2">
                <input value="1" id="sizeH" data-a="1"  min="1" max="8" type="number" class="changeDataOfBrick validate">
                <label class="active" for="sizeH">Висота цегли</label>
            </div>
            <div class="input-field col s2">
                <input value="1" id="countBricks" data-a="2"  min="1" max="8" type="number" class="changeDataOfBrick validate">
                <label class="active" for="countBricks">Кількість цегли</label>
            </div>
            <div class="exempleBricks col s5 offset-s1">
                <div style="width: 80px; height: 80px; background: red;"></div>
            </div>
        </div>`;
        arr.push([1, 1, 1])
    }
    combinations.push(arr)
    if(combinations.length > count){
        let aq = combinations.length - count
        for (let i = 0; i< aq; i++)
            combinations.shift()
    }
    document.querySelector('.yourBricks').innerHTML = out
    return combinations
}
/*document.querySelector('.card').addEventListener('click', ()=>changeDataOfBrick(this))*/

function changeDataOfBrick(event){
    event.children[0].children[0].addEventListener('change', ()=>{
        combinations[event.dataset.brickitem][0] = +event.children[0].children[0].value
    })
    event.children[1].children[0].addEventListener('change', ()=>combinations[event.dataset.brickitem][1] = +event.children[1].children[0].value)
    event.children[2].children[0].addEventListener('change', ()=>combinations[event.dataset.brickitem][2] = +event.children[2].children[0].value)
    combinations.map(item=>{
        item.map(el=>{ (el === undefined)? el = 1 : el})
    })
    console.log(combinations);
    //console.log(combinations);
    // console.log(q.children);
    // console.log(q.children[0].parentElement.dataset.brickitem);
}

function validationSizePlace(w, h){
    if((+w<=0) || (+w>=9)){
        document.querySelector('.sizePlaceWidthErr').style.display = 'inline'
        document.querySelector('.sizePlaceWidthErr').innerHTML = 'Має бути в діапазоні 0 - 8'
        return false}
    if((+h<=0)  || (+h>=9)){
        document.querySelector('.sizePlaceHeightErr').style.display = 'inline'
        document.querySelector('.sizePlaceHeightErr').innerHTML = 'Має бути в діапазоні 0 - 8'
        return false}
    document.querySelector('.sizePlaceHeightErr').style.display = 'none'
    document.querySelector('.sizePlaceWidthErr').style.display = 'none'
    return true
}
function validationCountTypeBricks(number){
    if((+number<=0) || (+number>=9)){
        document.querySelector('.countTypeBricks').style.display = 'inline'
        document.querySelector('.countTypeBricks').innerHTML = 'Має бути в діапазоні 0 - 8'
        return false}
    document.querySelector('.countTypeBricks').style.display = 'none'
    return true
}
function createPlane(item){
    let w = item.dataset.w;
    let h = item.dataset.h;
    console.log(matrix);
    if(!matrix[h][w]){
        matrix[h][w] = 1
        item.style.background = 'red'
    }else{
        matrix[h][w] = 0
        item.style.background = '#b9e2c4'
    }
    return matrix
}





