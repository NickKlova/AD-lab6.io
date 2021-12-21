// Global variables
let selectChange;

let game = new Game();

let rollButton = document.querySelector('.rollTheDice');
rollButton.addEventListener('click', rollTheDice);

// Handlers
function rollTheDice(){
    if(game.player.isEnd()){
        alert('Your moves are already over!');

        game.rollDice();
        let botChoice = getChoice(game);
        makeChoice(botChoice)

        rollButton.disabled = true;
    }
    else{
        game.rollDice();

        rollingDice(game.firstDice, game.secondDice); // animation

        let availableCoefficients = game.availableCoefficients();
        let select = document.createElement('select');
        select.className = 'playerCoefficient';
        for(let i = 0; i < availableCoefficients.length+1; i++){
            if(i==0)
            select.innerHTML += `<option>Select ratio:</option>`;
            else
            select.innerHTML += `<option>${availableCoefficients[i-1]}</option>`;
        }

        let div = document.querySelector('.diceButton');
        div.append(select);

        rollButton.className = "rollTheDiceHide";

        selectChange = document.querySelector('.playerCoefficient');
        selectChange.addEventListener('change', changeSelect);
    }
}

function changeSelect(){
    let opt = selectChange.options;
    let sel = selectChange.selectedIndex;
    let coef = opt[sel].value;

    console.log("PlayerTurn:" + game.firstDice + "  " + game.secondDice + ".Coef: " + coef);

    makeChoice(coef);

    let score = document.querySelector('.player > .score');
    score.innerHTML = `Score: ${game.player.totalPoints}`;

    let winPoints = document.querySelector('.player > .winPoints');
    winPoints.innerHTML = `Win points: ${game.player.winScores}`;

    selectChange.remove();
    rollButton.className = "rollTheDice";
}

function makeChoice(coef){
    game.makeTurn(coef);

    if(game.isEnd()){
        let whoWon = game.whoWon();

        let modalWindow = document.querySelector('.gameResult-title');

        let modal = document.querySelector('.gameResult');

        modal.style.display = "block";

        if(Number(whoWon) < 0){
            modalWindow.innerHTML = `This time the bot was stronger!\nYou lose!\nTry again!`;
            modalWindow.style.color = 'red';
        }
        else if(Number(whoWon) > 0){
            modalWindow.innerHTML = `Congratulations!\nYou defeated\nthe bot!\nMaybe try again?`;
            modalWindow.style.color = 'green';
        }
        else{
            modalWindow.innerHTML = `Draw.\nYour strengths in this round were equal.`;
        }
    }
        
        if (!(game.isFirstTurn())) {
            setTimeout(()=>{
            game.rollDice();
            }, 3000);


            setTimeout(() => {
                let botChoice = getChoice(game); // ?
                makeChoice(botChoice);

                console.log("BotTurn:" + game.firstDice + "  " + game.secondDice + ".Coef: " + botChoice);
            }, 3000);

            rollingDice(game.firstDice, game.secondDice); // animation
        }
            let score = document.querySelector('.bot > .score');
            score.innerHTML = `Score: ${game.bot.totalPoints}`;

            let winPoints = document.querySelector('.bot > .winPoints');
            winPoints.innerHTML = `Win points: ${game.bot.winScores}`;
}

// Animations
function rollingDice(numberOne, numberTwo) {
    let dice1 = document.querySelector('.firstDice > #dice');
    let dice2 = document.querySelector('.secondDice > #dice');

    let result1 = numberOne;
    dice1.dataset.side = result1;
    dice1.classList.toggle("reRoll");

    let result2 = numberTwo;
    dice2.dataset.side = result2-1;
    dice2.classList.toggle("reRoll");
}
