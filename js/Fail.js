const Fail = (interval,container,gameboard) => {
    clearInterval(interval);   
    gameboard.classList.add(`fail`);
    container.append(createNeGemeButton());  
}

function createNeGemeButton(){
    const newgamebutton = document.createElement(`div`);
    newgamebutton.classList.add(`newgamebutton`);
    newgamebutton.innerText = `Новая игра`;
    newgamebutton.addEventListener(`click`, ()=>{
        window.location.reload();
    });
    return newgamebutton;
}


export default Fail;