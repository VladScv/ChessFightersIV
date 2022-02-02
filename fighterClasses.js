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
        }else{
            this.route=[]
        }
        this.box=this.physics.add.existing(this.box,true);
        this.active=true;
    }//TODO
    update(){
        if(this.active){
            this.setPosition(nextFrame())
        }
    }//TODO
    setPosition(x,y) {
    }//TODO
    nextFrame(){
        return this.route[currentFrame++]
    }
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
class Fighter{
    constructor(type,team,color,physics,xSpawn) {
        this.values= _fighterState;
        this.self = this;
        this.shadow=null;

        //---------------------------------------------- Attributes
        {
            this.attackBox = null;
            this.type = type;
            this.team = team;
            this.color = color;
            this.active = false;
            this.dead = false;
            this.hitBox = new HitBox(physics);
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
            switch (type) {
                case "QUEEN":
                    this.speed = 2;
                    this.damage = 4;
                    this.health = 500;
                    this.weight = 3;
                    break;
                case "ROOK":
                    this.speed = 1;
                    this.damage = 3;
                    this.health = 200;
                    this.weight = 4;
                    break;
                case "BISHOP":
                    this.speed = 2;
                    this.damage = 2;
                    this.health = 100;
                    this.weight = 3;
                    break;
                case "KNIGHT":
                    this.speed = 3;
                    this.damage = 2;
                    this.health = 150;
                    this.weight = 2;
                    break;
                case "PAWN":
                default:
                    this.speed = 2;
                    this.damage = 1;
                    this.health = 100;
                    this.weight = 1;
                    break;
            }
        }


        //----------------------------------------------Physics
        {
            this.physics=physics;
            let color_name = (color?'white':'black');

            this.particles = this.team.gameScene.add.particles('redp'); //particles stuff
            this.emitter = this.particles.createEmitter({
                    radial: false,
                    lifespan: 600,
                    angle:{min: 0, max: 180},
                    speedX: {min:-30,max:30},
                    quantity: 4,
                    gravityY: -1000,
                    scale: { start: 1.5,end: 0 },
                    alpha:0.05,
                    blendMode: 'ADD'



                // lifespan: {min:100,max:200},
                // speed: { min: 600, max: 600 },
                // angle: {min:270,max: 270},
                // gravityY: -1000,
                // scale: { start: 2, end: 0 },
                // alpha:0.15,
                // quantity: 2,
                // blendMode: 'ADD'


                // speed: 100,
                // scale: { start: 1, end: 0 },
                // blendMode: 'ADD'
            });
            this.emitter.stop();
            this.shadow = physics.add.staticSprite(xSpawn, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);
            this.shadow.tint = 0x000000;
            this.shadow.alpha = 0.6;

            this.sprite = physics.add.sprite(xSpawn, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);
         // this.sprite = physics.add.sprite(type + '_' + color_name + '_idle');
            this.sprite.setBounce(0.15);
            this.sprite.body.setGravityY(500);
            this.sprite.flipX=!team.isPlayer;
            physics.add.collider(this.sprite, floor);
            this.sprite.body.setGravityY(200*this.weight)
            this.sprite.setSize(100,200,true)
            this.sprite.body.friction.x=0;
            this.sprite.body.setDragX(500);
            this.sprite.fighter=this;
            this.emitter.startFollow(this.sprite)

        }
        //-----------------------------------set interaction
        {
            this.sprite.setInteractive();
            this.sprite.input.hitArea.setTo(180, 30, 180, 350);
            this.sprite.on('pointerdown', function (a,b){
                activateThisFighter(this.fighter);
            });
            this.sprite.on('pointerover', function () {
                try {this.anims.play('attack1', true);
                }catch (e) { }
            });
            this.sprite.on('pointerout', function () {
                try {this.anims.play('idle', true);
                } catch (e) { }
            });
            function activateThisFighter(fighter) {
                fighter.activateFighter(fighter)
            }
        }
        //-----------------------------------set animations
        {
            createAnimations('ROOK', WHITE);
            this.sprite.anims.play('idle', false);
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------------Internal Functions
    activateFighter(fighter) {
        fighter.active=true;
        gameStateManager.setCurrentState('FIGHT')
        fighter.team.setCurrentFighter(fighter,fighter.team);
    }
    createAnimations() {
    }//TODO
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
    getSprite(){
        return this.sprite;
    }
    getShadow(){return this.shadow;}
    ////////////////////////////////////////////////////////////////////////////
    //------------------------------------------------------------------- ACTIONS

    pushEnemy(directionFrom){
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

        // if(this.sprite.body.touching.down){this.slowDown();}
        //this.shadow.setVisible(this.sprite.isVisible());
         if(this.shadow.visible){
             //this.particles=
             this.emitter.particle=(this.team.gameScene.add.particles(this.sprite.anims.currentFrame.textureKey, this.sprite.anims.currentFrame.index - 1));
            this.shadow.setTexture(this.sprite.anims.currentFrame.textureKey, this.sprite.anims.currentFrame.index - 1);
            this.shadow.x = ((this.sprite.x>1200)?(this.sprite.x + 7):(this.sprite.x - 7));
            this.shadow.y = this.sprite.y + 7;
            this.shadow.flipX = this.sprite.flipX;
        }

    }


    //TODO
}

class FighterTeam {
    constructor(color,gameScene,physics,isPlayer) {
        this.teamColor = color;
        this.isPlayer = isPlayer;
        this.gameScene = gameScene;
        this.fighters =[];
        this.currentFighter=null;
        //---------create fighters
        for (let i = 0; i < _fighterType.length; i++) {
            //--------- this fighter values
            let xSpawn = (isPlayer ? (100 + i * 150) : (2400 - 100 * i));
            let fighter = new Fighter(_fighterType[i], this, this.teamColor, physics, xSpawn);

            gameScene.children.bringToTop(fighter.getSprite())
            this.fighters.push(fighter);
        }
    }
    getFighters(){return this.fighters}
    getFighter(index){
        return this.fighters[index];
    }
    getFighter_byname(name){return this.fighters[_fighterType.indexOf('name')]}
    disableFighters(selectedFighterIndex){
        if(this.isPlayer){


        }
    }
    reloadFighters(){}//TODO
    setCurrentFighter(fighter,team){
        fighter.getSprite().tintFill=false;
        gameScene.currentFighter=fighter;
        fighter.emitter.start();
        this.currentFighter= fighter;
        console.log(team.currentFighter.getType_name());
        this.fighters[fighter.getType_index()]=null;
        for(let i = 0; i < 5;i++){
            console.log('fighter loop: '+i)
             if ( this.fighters[i] !== null) {
                 let sprite = this.fighters[i].getSprite();
                 sprite.setTint('0xff0000');
                 sprite.setActive(false).setVisible(false);
                 this.fighters[i].shadow.setActive(false).setVisible(false);
                 this.fighters[i].emitter.stop();
                 sprite.disableInteractive();
             }
        }
        this.currentFighter.getSprite().disableInteractive();

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
    update(){
        for(let i = 0; i < 5;i++){
            if ( this.fighters[i] !== null) {
                console.log('fighter loop: '+i)
                this.fighters[i].update();
            }
        }
        try{
            this.currentFighter.update();
        }catch (e) {
            console.log('this team has not currentfighter    team.isPLayer:'+this.isPlayer)
        }

    }
       //TODO


}