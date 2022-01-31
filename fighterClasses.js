//DEFINITIONS
const WHITE = true;
const BLACK = false;

WALK_SPEED=60;
ATTACK1_MODIFIER=2;
ATTACK2_MODIFIER=1;
const FRICTION_VALUE = 50;
const fighterState = ['IDLE','MOVING','FIGHTING','DEFENDING','INMUNE'];
const gameState = ['SELECTFIGHTER','FIGHT','FIGHTQUEEN','GAMEOVER'];
const fighterType=['QUEEN','ROOK','BISHOP','KNIGHT','PAWN'];
//fighterType.indexOf('QUEEN');


class Fighter{
    constructor(type,team,color,physics) {
        this.self = this;
        this.type = type;
        this.team = team;
        this.color = color;
        this.active = false;
        //let keyName= type + '_';
        this.fighterStateManager = {
            values: ['idle', 'walk', 'attack1', 'attack2', 'defense', 'hit'],
            currentState: 0,
            getCurrentState: function () {
                let state = values[this.currentState];
                return state
            },
            setCurrentState: function (state, fighter) {

                try {
                    this.currentState = values.indexOf(state);
                    fighter.setAnimation(values[state]);
                } catch (e) {
                    console.log('ERR_ state send not recognized:' + state + '\n' + e)
                }

            },
            next: function () {
                this.currentState += 1;
                if (this.currentState >= values.length()) {
                    this.currentState = 0;
                }
            },
            update() {
            },

        };
        this.sprite = null;
        this.button = null;
        this.fighterState = 'IDLE';
        let i = 0;
        this.attackBox = null;
        switch (type) {
            case "QUEEN":
                this.speed = 2;
                this.damage = 4;
                this.health = 500;
                break;
            case "ROOK":
                this.speed = 1;
                this.damage = 3;
                this.health = 200;
                break;
            case "BISHOP":
                this.speed = 2;
                this.damage = 2;
                this.health= 100;
                break;
            case "KNIGHT":
                this.speed = 3;
                this.damage = 2;
                this.health = 150;
                break;
            case "PAWN":
            default:
                this.speed = 2;
                this.damage = 1;
                this.health = 100;
                break;
        }
        try{
            this.sprite = physics.add.sprite(type + '_' + color + '_idle');
        }catch (e) {/*test*/        }
    }
    setAnimation(value) {

    }
    getPosition(){return {x:this.sprite.x,y:this.sprite.y}}
    setVelocityX(n){this.sprite.body.velocity.x = n}
    addVelocityX(v){this.sprite.body.velocity.x+=v}
    getVelocityX(){return this.sprite.body.velocity.x}
    slowDown(){
        let auX =this.getVelocityX();
        if(auX>0){
            this.addVelocityX(-((auX<FRICTION_VALUE)?auX:FRICTION_VALUE));
        }else if(auX<0){
            this.addVelocityX((((-auX)<FRICTION_VALUE)?auX:FRICTION_VALUE));
        }
    }
    activateFighter(){
        this.active=true;
        return this
    }
    setAnimation(){}
    getFighter() {return self }
    //-----------------------------ACTIONS
    hit(damage){
        if(this.fighterStateManager.getCurrentState()!=='defense'&&this.fighterStateManager.getCurrentState()!=='hit'){
            this.fighterStateManager.setCurrentState('hit');
            let aux= this.health;

            this.sprite.prototype.add()
            this.sprite.on('animationcomplete',function (aux,damage) {

            })
            this.health-=damage;
            if(this.health<=0){this.die();}
        }
    }
    attack(){}

    die() {

    }
    goTo(target){
        if(this.getPosition()<target){this.addVelocityX(this.speed*this.WALK_SPEED);}
        else if(this.getPosition()>target){this.addVelocityX(this.speed*WALK_SPEED);}
        else{
            this
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