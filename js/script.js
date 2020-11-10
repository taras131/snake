import Fail from "./Fail";
import DetermineDirection from "./DetermineDirection";
import CreateGameBoard, { setScore } from "./CreateGameBoard";

const gameboard = document.querySelector(`.gameboard`),
      buttonupp = document.querySelector(`.buttonupp`),
      buttonleft = document.querySelector(`.buttonleft`),
      buttonright = document.querySelector(`.buttonright`),
      buttonbottom = document.querySelector(`.buttonbottom`),
      container = document.querySelector(`.container`),
      bordersize = 31,
      ModifierEnum = Object.freeze({
        UPP: `upp`,
        BOTTON: `bottom`,
        LEFT: `left`,
        RIGHT: `right`
     });
let appleX, appleY;
let modifier = ModifierEnum.LEFT;
let board = CreateGameBoard(gameboard, bordersize);
let snake = [[21, 21], [21, 22]];
let score = 0;
let obstacle = [];
obstacle[0] = [];

setScore();
selectModifier();
const interval = setInterval(gameStep, 300),
      appleinterval = setInterval(createNewApple, 4000);

function gameStep() {
    if( isLive() ) {
        calculateSnakePosition();     
        renderGameObject();
    } else { Fail(interval, container, gameboard); }         
}

function isLive() {
    if( snake[0][0] <= 0 || snake[0][0] >= bordersize || snake[0][1] <= 0 || snake[0][1] >= bordersize ) {  
        return false;
    } 
    for( let i = 1; i < snake.length; i++ ) {       
        if( snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1] ) {            
            return false;
        }
    }
    for( let i = 1; i < obstacle.length ; i++ ) {       
        if( snake[0][0] == obstacle[i][0] && snake[0][1] == obstacle[i][1] ) {
            return false;
        }
    }  
    return true;
}
   
function calculateSnakePosition() {
    let firstbodyitemX = snake[0][0],
        firstbodyitemY = snake[0][1];
    
    snake[0] = DetermineDirection( modifier, snake[0][0], snake[0][1] );
    let temporarilySnake = [];
    temporarilySnake[0] = [snake[0][0], snake[0][1]];
    for( let i = 1; i < snake.length; i++ ) {
        temporarilySnake[i] = [];
        if( i == 1 ) {
            temporarilySnake[1][0] = firstbodyitemX;
            temporarilySnake[1][1] = firstbodyitemY;
        } else {
            temporarilySnake[i][0] = snake[i-1][0];
            temporarilySnake[i][1] = snake[i-1][1];
        }
    }
    if( checkEatingApple() ) {
        temporarilySnake[temporarilySnake.length] = [];       
        temporarilySnake[temporarilySnake.length-1][0] = snake[snake.length-1][0];
        temporarilySnake[temporarilySnake.length-1][1] = snake[snake.length-1][1];
        obstacle.push( snake[snake.length-1] );
   }

    for( let i = 0; i < temporarilySnake.length; i++ ) {
        snake[i] = [];
        snake[i][0] = temporarilySnake[i][0];
        snake[i][1] = temporarilySnake[i][1];
    }
}
 
function renderGameObject() {
    for( let i = 0 ; i < bordersize; i++ ) {
        for  (let j = 0; j < bordersize; j++ ) {
            board[i][j].classList.remove(`snake_head`);
            board[i][j].classList.remove(`snake_body`);
        }   
    }   

    for( let i = 0; i < (snake.length); i++ ) {
        if( i == 0 ) {
            board[ (snake[0][0]) ][ (snake[0][1]) ].classList.add(`snake_head`);
        } else {
        board[ (snake[i][0]) ][ (snake[i][1]) ].classList.add(`snake_body`);
        }
    }

    for( let i =1; i < obstacle.length; i++ ) {
        board[ (obstacle[i][0]) ][ (obstacle[i][1]) ].classList.add(`obstacle`);
    }
}

function createNewApple() {
    appleX = Math.floor( Math.random() * bordersize );
    appleY = Math.floor( Math.random() * bordersize );
    for( let i = 0;  i < snake.length; i++ ) {
        if( snake[i][0] == appleX && snake[i][1] == appleY ) {
            createNewApple();
            return; 
        }
    }
    for( let i = 1;  i < obstacle.length; i++ ) {
        if( obstacle[i][0] == appleX && obstacle[i][1] == appleY ) {
            createNewApple();
            return; 
        }
    }
    board[appleX][appleY].classList.add(`apple`);
    clearInterval(appleinterval);
}

function checkEatingApple(){
    if( (board[snake[0][0]] [snake[0][1]]).classList.contains(`apple`) ) {
        ( board[appleX][appleY] ).classList.remove(`apple`);
        createNewApple();
        score++;
        setScore(score);
        return true;
    } else { return false };
}

function selectModifier() {   
    buttonupp.addEventListener(`click`, () =>{
        if( snake[0][1] != snake[1][1] ) {
            modifier = ModifierEnum.UPP;     
        }          
    });
    buttonleft.addEventListener(`click`, () =>{
        if( snake[0][0] != snake[1][0] ) {
            modifier = ModifierEnum.LEFT;     
        }           
    });
    buttonright.addEventListener(`click`, () =>{
        if( snake[0][0] != snake[1][0] ) {
            modifier = ModifierEnum.RIGHT;     
        }        
    });
    buttonbottom.addEventListener(`click` ,() =>{
        if( snake[0][1] != snake[1][1] ) {
            modifier = ModifierEnum.BOTTON;     
        }           
    });
}

