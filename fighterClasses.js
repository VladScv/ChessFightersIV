//DEFINITIONS
const WHITE = true;
const BLACK = false;
const fighterState = ['IDLE','MOVING','FIGHTING','DEFENDING','INMUNE'];
const gameState = ['SELECTFIGHTER','FIGHT','FIGHTQUEEN','GAMEOVER'];
const fighterType=['QUEEN','ROOK','BISHOP','KNIGHT','PAWN'];
//fighterType.indexOf('QUEEN');


class Fighter { 
    constructor(type,team,gameScene,color) {
        this.type = type;
        this.team = team;
        //let keyName= type + '_';
        this.sprite = null;
        this.button = null;
        this.fighterState= 'IDLE';
        let i = 0;
        switch(type) {
            case "QUEEN":
                this.speed = 2;
                this.damage = 4;
                break;
            case "ROOK":
                this.speed = 1;
                this.damage = 3;
                break;
            case "BISHOP": 
                this.speed = 2;
                this.damage = 2;
                break;
            case "KNIGHT":
                this.speed = 3;
                this.damage = 2;
                break;
            case "PAWN":
            default: 
                this.speed = 2;
                this.damage = 1;
                break;
        }
        
    }

}

class FighterTeam {
    constructor(color,gameScene) {
        this.teamColor = color;
        this.gameScene = gameScene;
        this.fighters=[];
       

    }

}