const CreateGameBoard = (gameboard, bordersize) => {
    let board = [];
    for(let i = 0 ; i < bordersize; i++) {
        board[i] = [];
        for (let j = 0; j < bordersize; j++){
            board[i][j] = document.createElement(`div`);
            board[i][j].classList.add(`box`);
            gameboard.append(board[i][j]);
        }   
    }
    return board;
}

export const setScore = (score = 0) => {
    let score_recorde = document.querySelector(`.score_recorde`),
        current_score = document.querySelector(`.current_score`),
        recorde;
    if(localStorage.getItem(`recorde`)){
        recorde =  localStorage.getItem(`recorde`);
    } else {recorde = 0;}
    if ( score == 0 ) { score_recorde.innerHTML = `Рекорд ${recorde}`; }  
    current_score.innerHTML = `Очки ${score}`;
    if(score > recorde){
        localStorage.setItem(`recorde`,score);
    }
}

export default CreateGameBoard;
