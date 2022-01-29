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
        this.sprite =this.addImage()
        this.speed = 1;

        switch(type) {
            case "QUEEN":
                break;
            case "ROOK":
                break;
            case "BISHOP": 
                break;
            case "KNIGHT":
                break;
            case "PAWN":
            default: 
                break;
        }
        
    }

}

class FighterTeam {
    constructor(color,gameScene) {
        this.teamColor = color;
        this.gameScene = gameScene;
        this.fighters=[];
        for(i=0; i<fighterType.length;i++){
            this.fighters.add(new Fighter(fighterType[i],this,gameScene,color));
        }

    }

}