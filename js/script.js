const gameboard = document.querySelector(`.gameboard`),
      buttonupp = document.querySelector(`.buttonupp`),
      buttonleft = document.querySelector(`.buttonleft`),
      buttonright = document.querySelector(`.buttonright`),
      buttonbottom = document.querySelector(`.buttonbottom`);

let board = [];
let modifier =`left`;

let snake = {
    head: {y: 21, x: 21},
    body: [{ y: 21, x: 22}, { y: 21, x: 23} ]
 };

for(let i = 0 ; i < 41; i++) {
    board[i] = [];
    for (let j = 0; j < 41; j++){
        board[i][j] = document.createElement(`div`);
        board[i][j].classList.add(`box`);
        gameboard.append(board[i][j]);
        console.log(`create`);
    }   
}

selectModifier();

const interval = setInterval(snakeStep,200);

function snakeStep() {
    console.log(snake.head);
    console.log(snake.body);
    calculationSnake();           
    renderSnake(); 
}

function  calculationSnake(){
    isLive();
    let propyrtyarray = [{
        x: 0,
        y: 0
    }];
   
    propyrtyarray[0].x = snake.head.x;
    propyrtyarray[0].y = snake.head.y;
  
    determineDirection();

    for(let i =1; i < (snake.body.length); i++){
        propyrtyarray.push(snake.body[i+1]);
    }
    snake.body = propyrtyarray.map((item) => {
        return item;
    });
} 

function renderSnake() {

    for(let i = 0 ; i < 41; i++) {
        for (let j = 0; j < 41; j++){
            board[i][j].classList.remove(`snake_head`);
            board[i][j].classList.remove(`snake_body`);
        }   
    }   
    board[snake.head.y][snake.head.x].classList.add(`snake_head`);
    for (let i = 0; i < snake.body.length; i++) {
        (board[(snake.body[i].y)][(snake.body[i].x)]).classList.add(`snake_body`);
    }

}

function selectModifier() {
    buttonupp.addEventListener(`click` ,() =>{
        modifier = `upp`;          
    });
    buttonleft.addEventListener(`click` ,() =>{
        modifier = `left`;      
    });
    buttonright.addEventListener(`click` ,() =>{
        modifier = `right`;
    });
    buttonbottom.addEventListener(`click` ,() =>{
        modifier = `bottom`;      
    });
}

function determineDirection(){
    if(modifier === `upp`) {
        snake.head.y -= 1;
    } else if(modifier === `bottom`) {
                snake.head.y += 1;
            } else if(modifier === `left`) {
                        snake.head.x -= 1;
                    } else if(modifier === `right`) {
                                snake.head.x += 1;
                            }
}

function isLive() {
    if(snake.head.y < 0 || snake.head.y > 41 || snake.head.x < 0 || snake.head.x > 41){
        clearInterval(interval);
        fail();
    }
}

function fail(){
    console.log(`hahahah`);
}