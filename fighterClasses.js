//DEFINITIONS
WHITE = true;
BLACK = false;

BOUNCE_FORCE=0.2;
WALK_SPEED=60;
ATTACK1_MODIFIER=2;
ATTACK2_MODIFIER=1;
FRICTION_VALUE = 50;
_fighterState= ['idle', 'walk', 'attack1', 'attack2', 'defense', 'hit'],
_fighterType=['QUEEN','ROOK','BISHOP','KNIGHT','PAWN'];

class HitBox {
    constructor(x,y,physics) {
        this.physics=physics;
        this.box = new Phaser.Geom.Rectangle(x,y,100,100);
        this.active= false;
        this.directionFlipped=false;
        this.route=[[x,y]];
        this.currentFrame=0;

    }

    activate(isAttack1, isLeft){
        this.directionFlipped=isLeft;
        if(isAttack1){
            //this.route.concat(this.route,[])
            //TODO
        }else{
            this.route=[] //TODO
        }
        this.box=this.physics.add.existing(this.box,true);

        this.active=true;
    }
    update(){
        if(this.active){
            this.setPosition(nextFrame())
        }
    }

    setPosition(x,y) {

    }
    nextFrame(){
        return this.route[currentFrame++]
    }
}

class Fighter{
    constructor(type,team,color,physics,xSpawn) {
        this.values= _fighterState;
        this.self = this;
        this.type = type;
        this.team = team;
        this.color = color;
        this.active = false;
        this.dead= false;
        this.hitBox= new HitBox(physics);
        //let keyName= type + '_';
        this.fighterStateManager = {
            currentState: 0,
            getCurrentState: function () {
                return values[this.currentState]
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
        this.fighterState = 'IDLE';
        //----------------------------------------------Physics
        {
            this.physics=physics;
            let color_name = (color?'white':'black');
            this.sprite = physics.add.sprite(xSpawn, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);
         // this.sprite = physics.add.sprite(type + '_' + color_name + '_idle');
            createAnimations('ROOK',WHITE);
            this.sprite.setBounce(0.15)
            this.sprite.flipX=!team.isPlayer;
            physics.add.collider(this.sprite, floor);
            this.sprite.body.setGravityY(300)
            this.sprite.setSize(100,200,true)
            this.sprite.body.friction.x=0;
            this.sprite.body.setDragX(500);
            this.sprite.fighter=this;
        }

        //-----------------------------------set interaction
        {
            this.sprite.setInteractive();
            this.sprite.input.hitArea.setTo(180, 30, 180, 350);
            this.sprite.on('pointerdown', function (a,b){
                activateThisFighter(this.fighter);

        }
        );
            this.sprite.on('pointerover', function () {
                try {
                    this.anims.play('attack1', true);
                } catch (e) {
                }
                ;
            });
            this.sprite.on('pointerout', function () {
                try {
                    this.anims.play('idle', true);
                } catch (e) {
                }

            });
        }
        //-----------------------------------set animations
        this.sprite.anims.play('idle',false);
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


        function activateThisFighter(fighter) {
            fighter.activateFighter(fighter)
        }

    }

    activateFighter(fighter) {
        fighter.active=true;
        gameStateManager.setCurrentState('FIGHT')
        fighter.sprite.setTint('black');
        fighter.team.setCurrentFighter(fighter);
    }

    createAnimations() {

    }//TODO
    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------------------------------- getters'n'setters
    getPosition(){return {x:this.sprite.x,y:this.sprite.y}}
    setVelocityX(n){this.sprite.body.velocity.x = n}
    addVelocityX(v){this.sprite.body.velocity.x+=v}
    getVelocityX(){return this.sprite.body.velocity.x}
    setAnimation(key){
        //TODO
    }
    getFighter() {return self }

    setFlip(faceToLeft) {
        this.sprite.flipX=faceToLeft;
    }
    isRightFaced(){
        return !(this.sprite.flipX);
    }
    getType_name(){
        return this.type
    }
    getType_index(){
        return _fighterType.indexOf(this.type)
    }

    ////////////////////////////////////////////////////////////////////////////
    //------------------------------------------------------------------- ACTIONS

    push(directionFrom){
    }//TODO
    //direction= (-1 = left || 1 = right ||0 = deactivate bounce) fighter relative
    hit(damage,directionFrom){
        if(this.fighterStateManager.getCurrentState()==='defense'){
            this.addVelocityX(directionFrom*(BOUNCE_FORCE+(damage/10)));

        }else if(this.fighterStateManager.getCurrentState()!=='hit'){
            this.fighterStateManager.setCurrentState('hit');
            this.setFlip((directionFrom<0));
            let aux= this.health;
            this.health-=damage;
            if(this.health<=0){this.die();}
        }
    }
    attack(){
    }//TODO
    die() {
    }//TODO
    goTo(target){
        if(this.getPosition()<target){this.addVelocityX(this.speed*WALK_SPEED);}
        else if(this.getPosition()>target){this.addVelocityX(this.speed*WALK_SPEED);}
        else{
            //TODO
        }
    }


    ////////////////////////////////////////////////////////////////////////////
    //------------------------------------------------------------------- UPDATE
    slowDown(){
        let auX =this.getVelocityX();
        if(auX>0){
            this.addVelocityX(-((auX<FRICTION_VALUE)?auX:FRICTION_VALUE));
        }else if(auX<0){
            this.addVelocityX((((-auX)<FRICTION_VALUE)?auX:FRICTION_VALUE));
        }
    }
    update(){
        if(this.sprite.body.touching.down){this.slowDown();}
    }//TODO
}

class FighterTeam {
    constructor(color,gameScene,physics,isPlayer) {
        this.teamColor = color;
        this.isPlayer = isPlayer;
        this.gameScene = gameScene;
        this.fighters = [];
        if (isPlayer) {
            this.buttons = [];
        }
        //---------create fighters
        for (let i = 0; i < _fighterType.length; i++) {
            //--------- this fighter values
            let xSpawn = (isPlayer ? (100 + i * 150) : (2400 - 100 * i));
            let keyName = _fighterType[i];
            let colorName = (color ? 'white' : 'black');
            let fighter = new Fighter(_fighterType[i], this, color, physics, xSpawn);
            this.fighters[i] = fighter;


        }
    }
    setCurrentFighter(fighter){

        fighter.sprite.setTint('red');
        gameScene.currentFighter= fighter;
        //delete gameScene.playerTeam.fighters[gameScene.playerTeam.fighters.getIndex(fighter)];
        // try{ gameScene.playerTeam.fighters.forEach(function(fighter){fighter.sprite.visible=false;})}catch(e){};
        //
        // delete buttons[fighter.getType_index()];
        // console.log()
        // gameScene.currentFighter.scrollFactorX=0;
        // let index=Phaser.Math.Between(1,4);
        // gameScene.iaFighter= gameScene.iaTeam.fighters[index];
        // delete gameScene.iaTeam.fighters[index];
        // gameScene.fixCamPoint=SPAWN_PLAYER;
        // gameScene.movingCamera = true;
        // gameScene.currentFighter.sprite.anims.play('walk',true);
        // gameScene.iaFighter.sprite.anims.play('walk',true);
        // gameScene.gameState='FIGHT';
        // gameScene.selectFighter_txt.forEach(function(f){f.visible=false;});

    }
       //TODO


}