const gameboard = document.querySelector(`.gameboard`),
      buttonupp = document.querySelector(`.buttonupp`),
      buttonleft = document.querySelector(`.buttonleft`),
      buttonright = document.querySelector(`.buttonright`),
      buttonbottom = document.querySelector(`.buttonbottom`),
      container = document.querySelector(`.container`);
let score_recorde = document.querySelector(`.score_recorde`),
    current_score = document.querySelector(`.current_score`);

let board = [];
let modifier =`left`;
let appleX, appleY;
let snake = [[21,21], [21,22]];
let obstacle = [];
obstacle[0] = [];
let recorde, score;
score = 0; 
if(localStorage.getItem(`score`)){
    recorde =  localStorage.getItem(`score`);
} else  recorde = 0;

score_recorde.innerHTML = `Рекорд ${recorde}`;
current_score.innerHTML = `Очки ${score}`;

for(let i = 0 ; i < 31; i++) {
    board[i] = [];
    for (let j = 0; j < 31; j++){
        board[i][j] = document.createElement(`div`);
        board[i][j].classList.add(`box`);
        gameboard.append(board[i][j]);
    }   
}



selectModifier();

const interval = setInterval(isLive,300);
const appleinterval = setInterval(createApple,4000);       

function gameStep() {
    renderSnake(); 
    calculationSnake();      
}

function calculationSnake(){
    let headx = snake[0][0];
    let heady = snake[0][1];
    determineDirection();
    arr = [];
    arr[0] = [snake[0][0], snake[0][1]];
    for(let i = 1; i < snake.length; i++){
        arr[i] = []
        if(i === 1){
            arr[1][0] = headx;
            arr[1][1] = heady;
        }else {
            arr[i][0] = snake[i-1][0];
            arr[i][1] = snake[i-1][1];
        }
    }
    if(checkApple()) {
        arr[arr.length] = [];

        
        arr[arr.length-1][0] = snake[snake.length-1][0];
        arr[arr.length-1][1] = snake[snake.length-1][1];

        obstacle.push(snake[snake.length-1]);

        console.log(obstacle);
   }

    for(let i = 0; i < arr.length; i++){
        snake[i] = [];
        snake[i][0] = arr[i][0];
        snake[i][1] = arr[i][1];
    }
}
 

function renderSnake() {
    for(let i = 0 ; i < 31; i++) {
        for (let j = 0; j < 31; j++){
            board[i][j].classList.remove(`snake_head`);
            board[i][j].classList.remove(`snake_body`);
        }   
    }   

    for(let i = 0; i < (snake.length); i++){
        if(i === 0) {
            board[(snake[0][0])][(snake[0][1])].classList.add(`snake_head`);
        } else{
        board[(snake[i][0])][(snake[i][1])].classList.add(`snake_body`);
        }
    }

    for(let i =1; i < obstacle.length; i++){
        board[(obstacle[i][0])][(obstacle[i][1])].classList.add(`obstacle`);
    }
}

function selectModifier() {
    buttonupp.addEventListener(`click` ,() =>{
        if(snake[0][1] != snake[1][1]) {
            modifier = `upp`;     
        }          
    });
    buttonleft.addEventListener(`click` ,() =>{
        if(snake[0][0] != snake[1][0]) {
            modifier = `left`;     
        }           
    });
    buttonright.addEventListener(`click` ,() =>{
        if(snake[0][0] != snake[1][0]) {
            modifier = `right`;     
        }        
    });
    buttonbottom.addEventListener(`click` ,() =>{
        if(snake[0][1] != snake[1][1]) {
            modifier = `bottom`;     
        }           
    });
}

function determineDirection(){
    if(modifier === `upp`) {
        snake[0][0] = snake[0][0] - 1;
    } else if(modifier === `bottom`) {
                snake[0][0] = snake[0][0] + 1;
            } else if(modifier === `left`) {
                        snake[0][1] = snake[0][1] - 1;
                    } else if(modifier === `right`) {
                                snake[0][1] = snake[0][1] + 1;
                            }
}

function createApple() {
    appleX = Math.floor(Math.random() * 29)+1;
    appleY = Math.floor(Math.random() * 29)+1;
    for(let i = 0;  i < snake.length; i++){
        if(snake[i][0] == appleX && snake[i][1] == appleY ){
            createApple();
            return; 
        }
    }
    for(let i = 1;  i < obstacle.length; i++){
        if(obstacle[i][0] == appleX && obstacle[i][1] == appleY ){
            createApple();
            return; 
        }
    }
    board[appleX][appleY].classList.add(`apple`);
    clearInterval(appleinterval);
}

function isLive() {
    if(snake[0][0] <= 0 || snake[0][0] >= 31 || snake[0][1] <= 0 || snake[0][1] >= 31){
        clearInterval(interval);
        fail();
    } 
    for(let i = 1; i < snake.length; i++){       
        if(snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]){
            clearInterval(interval);
            fail();
        }
    }

    for(let i = 1; i < obstacle.length ; i++){       
        if(snake[0][0] === obstacle[i][0] && snake[0][1] === obstacle[i][1]){
            clearInterval(interval);
            fail();
        }
    }
   
    gameStep();
}

function checkApple(){
    if((board[snake[0][0]] [snake[0][1]]).classList.contains(`apple`)){
        (board[appleX][appleY]).classList.remove(`apple`);
        console.log(`true`);
        createApple();
        score++;
        current_score.innerHTML = `Очки ${score}`;
        return true;
    } else return false;
}

function fail(){
    clearInterval(interval);
    console.log(`hahahah`);
    if(score > recorde){
        localStorage.setItem(`score`,score);
    }
    gameboard.classList.add(`fail`);
    const newgamebutton = document.createElement(`div`);
    newgamebutton.classList.add(`newgamebutton`);
    
    newgamebutton.innerText = `Начать новую игру`;
    container.append(newgamebutton);
    newgamebutton.addEventListener(`click`, ()=>{
        window.location.reload();
    });
}

