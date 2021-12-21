function generateThrowOfFirstDice(){
    return generateRandomNumber(1,7);
}

function generateThrowOfSecondDice(){
    return generateRandomNumber(2,8);
}

function generateRandomNumber(from, to){
    return Math.floor(Math.random() * (to - from)) + from;
}