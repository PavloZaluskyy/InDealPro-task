let w = document.querySelector('#width')
let h = document.querySelector('#height')
let itemMatrix = document.querySelector('.item-matrix')
let countTypeBricks = document.querySelector('#countTypeBricks')

let width, height, matrix, countBricks, combinations = [[1,1,1]];

drawMatrix(1,1)
drawFieldBricks(1)

w.addEventListener('change', ()=>{drawMatrix(w.value,h.value)});
h.addEventListener('change', ()=>{drawMatrix(w.value,h.value)});
countTypeBricks.addEventListener('change', ()=>{drawFieldBricks(countTypeBricks.value)});
document.querySelector('.btn').addEventListener('click', ()=> {
    width = w.value
    height = h.value

    const wall = new Wall(+width, +height, matrix, +countBricks, combinations)
    document.querySelector('.result').innerHTML= `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
    `
    if(wall.build())
        setTimeout(()=>{
            document.querySelector('.result').innerHTML= `
                <div class="good">
                <p>You can build this wall.</p>
                <p>Size  ------ ${width} x ${height},</p>
                <p>Plan  ------ ${matrix},</p>
                <p>Type Bricks -------- ${countBricks},</p>
                <p> =====================================================</p>
                    <p>You will have so many bricks left :</p>
                    <p>${combinations}</p>
                </div>`  
        }, 1000) 
    else
    setTimeout(()=>{
        document.querySelector('.result').innerHTML= `
            <div class="error">
            <p>You cann't build this wall.</p>
            <p>Size  ------ ${width} x ${height},</p>
            <p>Plan  ------ ${matrix},</p>
            <p>Type Bricks -------- ${countBricks},</p>
            <p> =====================================================</p>
            </div>`
        }, 1000) 
})

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
    for(let i = 0; i< count; i++){ 
        out+= `
        <div class="row card" onchange="changeDataOfBrick(this)" data-brickItem="${i}" >
            <div class="input-field col s2">
                <input value="${1}" id="sizeW" data-a="0"  min="1" max="8" type="number" class="changeDataOfBrick validate">
                <label class="active" for="sizeW">ширина цегли</label>
            </div>
            <div class="input-field col s2">
                <input value="${1}" id="sizeH" data-a="1"  min="1" max="8" type="number" class="changeDataOfBrick validate">
                <label class="active" for="sizeH">Висота цегли</label>
            </div>
            <div class="input-field col s2">
                <input value="${1}" id="countBricks" data-a="2"  min="1" type="number" class="changeDataOfBrick validate">
                <label class="active" for="countBricks">Кількість цегли</label>
            </div>
            <div class="exempleBricks col s5 offset-s1">
                <div style="width: 10px; height: 10px; background: red;"></div>
            </div>
        </div>`;
    }
    if(combinations.length > count){
            let aq = combinations.length - count
            for (let i = 0; i< aq; i++)
                combinations.shift()
        }
    document.querySelector('.yourBricks').innerHTML = out
    return countBricks = count
}

function changeDataOfBrick(event){
    if(!validationDataOfBrick(event.children[0].children[0].value, event.children[1].children[0].value, event.children[2].children[0].value)) return false
    let arr = [1, 1, 1]
    let item = event.dataset.brickitem
    arr[0] = +event.children[0].children[0].value
    arr[1] = +event.children[1].children[0].value
    arr[2] = +event.children[2].children[0].value
    drawBricks(event.children[3].children[0] ,event.children[0].children[0].value, event.children[1].children[0].value)
    combinations[item]=arr
}

function drawBricks(block, w, h){
    block.style.width = w * 10 + 'px';
    block.style.height = h * 10 + 'px';
}

function validationDataOfBrick(w, h, c){
    if((+w<=0) || (+w>=9)) return false
    if((+h<=0)  || (+h>=9)) return false
    if(+c<=0)return false
    return true
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
    if(!matrix[h][w]){
        matrix[h][w] = 1
        item.style.background = 'red'
    }else{
        matrix[h][w] = 0
        item.style.background = '#b9e2c4'
    }
    return matrix
}





