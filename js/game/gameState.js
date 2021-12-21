class Game{
    constructor(){
        this.player = new Player();
        this.bot = new Player();
        this.isRolled = false;
    }

    isEnd(){
        return this.player.isEnd() && this.bot.isEnd();
    }

    rollDice(){
        if(this.isRolled){
            return;
        }
        this.firstDice = generateThrowOfFirstDice();
        this.secondDice = generateThrowOfSecondDice();
        this.isRolled = true;
    }
    
    makeTurn(coefficient){
        if (this.isRolled) {
            if (!this.player.isEnd()) {
               this.player.makeTurn(this.firstDice, this.secondDice, coefficient);
            } else {
                this.bot.makeTurn(this.firstDice, this.secondDice, coefficient);
            }
            this.isRolled = false;
        } 
    }

    whoWon() {
        return this.player.winScores - this.bot.winScores;
    }

    availableCoefficients() {
        return availableCoefficients(this.firstDice, this.secondDice);
    }

    fromScratch() {
        this.player = new Player()
        this.bot = new Player();
    }

    isFirstTurn() {
        return !this.player.isEnd();
    }
}

function availableCoefficients(firstDice, secondDice) {
    let applicableCoefficient = [1, 2, 3, 4, -1, 1 / 2, 1 / 3, 1 / 4];
    let total = firstDice + secondDice;
    return [...applicableCoefficient.filter(coefficient => Number.isInteger(total * coefficient))];
}