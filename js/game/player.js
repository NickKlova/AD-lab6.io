class Player{
    constructor(){
        this.turnNumber = 0;
        this.totalPoints = 0;
        this.winScores = 0;
    }

    copy(){
        let player = new Player();
        player.turnNumber = this.turnNumber;
        player.totalPoints = this.totalPoints;
        player.winScores = this.winScores;
        return player;
    }

    isEnd(){
        return this.turnNumber === 5;
    }
    
    makeTurn(firstDiceNumber, secondDiceNumber, coefficient){
        this.totalPoints += coefficient * (firstDiceNumber + secondDiceNumber);
        if (this.totalPoints % 13 === 0) {
            this.winScores += this.totalPoints / 13;
        }
        this.turnNumber += 1;
    }
}