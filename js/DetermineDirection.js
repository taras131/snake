const DetermineDirection = ( modifier, snake0, snake1 ) => {
    const UPP = `upp`,
          BOTTON = `bottom`,
          LEFT = `left`,
          RIGHT = `right`;
    
    switch(modifier){
        case UPP:
            snake0 -= 1;
            return [snake0,snake1];
        case BOTTON:
            snake0 += 1;
            return [snake0,snake1];
        case LEFT:
            snake1 -= 1;
            return [snake0,snake1];
        case RIGHT:
            snake1 += 1;
            return [snake0,snake1];          
    }      
}

export default DetermineDirection;