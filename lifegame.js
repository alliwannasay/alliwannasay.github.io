var spaceDom = document.getElementById("space")
var spaceW = spaceDom.clientWidth
var spaceH = spaceDom.clientHeight
var numX = 50
var numY = numX
var squareX = spaceW / numX
var squareY = spaceH / numY
var cellState=[]
var cellSave=[]
var context = spaceDom.getContext('2d')
var isRunning = 0
var stateDom = document.getElementById('statediv')
var numR = numX*numY
drawInit()
console.log(cellState)

function drawOneCell(xnum,ynum,isLiving) {

    if(xnum < 0 || xnum >numX  || ynum < 0 || ynum > numY)
    {
        console.log(xnum,ynum)
        throw new error("arguments invalid")
        return
    }

    var xp = xnum*squareX
    var yp = ynum*squareY
    var a = squareX/2
    var b = squareY/2
    var step = (a > b) ? 1 / a : 1 / b;
    var xc = xp+a
    var yc = yp+b
    if(isLiving == 1)
    {
        context.strokeStyle = "DarkGoldenRod"
        context.beginPath();
        context.arc(xc,yc,a,0,2*Math.PI)
        context.fillStyle='Gold'
        context.fill()
        
    }
    else
    {
        context.beginPath();
        context.arc(xc,yc,a,0,2*Math.PI)
        context.fillStyle='rgba(0,0,0,1)'
        context.fill()
    }
}

function drawInit() {
    for(var i = 0;i < numX;i++){
        for(var j = 0; j < numY;j++){
            cellState[[i,j]] = 0
            drawOneCell(i,j,0)
        }
    }
}

function drawOneUsefulP() {
    drawInit()
        cellState[[0,0]]=1
        cellState[[numX-1,0]]=1
        cellState[[0,numX-1]]=1
        cellState[[numX-1,numX-1]]=1
    for(var i = 0;i < numX;i++){
        for(var j = 0; j < numY;j++){
            drawOneCell(i,j,cellState[[i,j]])
        }
    }
}

function drawRandom(){
    var xnum = Math.round(Math.random()*(numX-1))
    var ynum = Math.round(Math.random()*(numY-1))
    cellState[[xnum,ynum]] = 1
    drawOneCell(xnum,ynum,1)
}

function drawRandomLot() {
    drawInit()
    for(var k = 0;k < numR;k++)
    {
        drawRandom()
    }
}


function ruleOfLiving(xnum,ynum,cellStateIn,cellSaveIn,numXin,numYin) {

        var surroundState = []
        var surroundLiving = 0
        var state = cellStateIn[[xnum,ynum]]
        var stateAfter = 0


        surroundState[0] = cellStateIn[[(xnum-1+numXin)%numXin, (ynum-1+numYin)%numYin]]
        surroundState[1] = cellStateIn[[(xnum-1+numXin)%numXin, (ynum+1+numYin)%numYin]]
        surroundState[2] = cellStateIn[[(xnum+numXin)%numXin, (ynum+1+numYin)%numYin]]
        surroundState[3] = cellStateIn[[(xnum+numXin)%numXin, (ynum-1+numYin)%numYin]]
        surroundState[4] = cellStateIn[[(xnum+1+numXin)%numXin, (ynum+1+numYin)%numYin]]
        surroundState[5] = cellStateIn[[(xnum+1+numXin)%numXin, (ynum-1+numYin)%numYin]]
        surroundState[6] = cellStateIn[[(xnum+1+numXin)%numXin, (ynum+numYin)%numYin]]
        surroundState[7] = cellStateIn[[(xnum-1+numXin)%numXin, (ynum+numYin)%numYin]]

        for(var i = 0;i < 8;i++)
        {
            if(surroundState[i] == 1) surroundLiving++;
        }
        if(surroundLiving == 3)
        {
            if(state == 0)
            {
                cellSaveIn[[xnum,ynum]] = 1
            }
            else if(state == 1)
            {
                cellSaveIn[[xnum,ynum]] = 1
            }
        }
        else if(surroundLiving == 2)
        {
            cellSaveIn[[xnum,ynum]] = state
        }
        else
        {
            if(state == 0)
            {
                cellSaveIn[[xnum,ynum]] = 0
            }
            else if(state == 1)
            {
                cellSaveIn[[xnum,ynum]] = 0
            }
        }

        return cellSaveIn

}

function startGame() {
    startBtn.disabled = true;
    stateDom.innerHTML = "生命，正在进行繁衍生息"
    for(var i = 0;i < numX;i++){
        for(var j = 0; j < numY;j++){
            cellSavevf = ruleOfLiving(i,j,cellState,cellSave,numX,numY)
        }
    }
    for(var i = 0;i < numX;i++){
        for(var j = 0; j < numY;j++){
            cellState[[i,j]] = cellSave[[i,j]]
            cellSave[[i,j]] = 0
            drawOneCell(i,j,cellState[[i,j]])
        }
    }
    timeID = setTimeout(startGame, 10)
    
}

function pause() {
    clearTimeout(timeID)
    stateDom.innerHTML = "生命，被你暂停了"
    startBtn.disabled = false;
}

function givenPattern(cellGiven,numXin,numYin) {
    cellState = []
    cellSave = []

    for(var i = 0;i < numXin;i++){
        for(var j = 0; j < numYin;j++){
            cellState[[i,j]] = cellGiven[[i,j]]
            cellSave[[i,j]] = 0
            
        }
    }
    
    for(var i = 0;i < numXin;i++){
        for(var j = 0; j < numYin;j++){
            cellSave = ruleOfLiving(i,j,cellState,cellSave,numXin,numYin)
            
        }
    }
    

    for(var i = 0;i < numXin;i++){
        for(var j = 0; j < numYin;j++){
            cellState[[i,j]] = cellSave[[i,j]]
            cellSave[[i,j]] = 0
        }
    }
    

    return cellState
}


