//DEFINITIONS


BOUNCE_FORCE=0.2;
WALK_SPEED=60;
ATTACK1_MODIFIER=2;
ATTACK2_MODIFIER=1;
FRICTION_VALUE = 50;
_fighterState= ['idle', 'walk', 'attack1', 'attack2', 'hit','defense'],
_fighterType=['QUEEN','ROOK','BISHOP','KNIGHT','PAWN'];

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
class HitBox {
    constructor(x,y,physics) {
        this.physics=physics;
        this.box = physics.add.staticSprite(x,y,'hitbox');
        this.active= false;
        this.directionFlipped=false;
        this.route=[];
        this.currentFrame=0;
        this.enemy=null;
    }
    deactivate() {
        // this.box.setActive(false).setVisible(false);
        this.active=false;
        this.box.body.x=0;
        this.box.body.y=0;
    }
    activate(isAttack1, isLeft,enemy){
        this.box.setActive(true).setVisible(true);
        this.directionFlipped=isLeft;
        this.physics.add.collider(this.box,enemy,function(){
            console.log('say hi!!!!!!!!!!');
        })
        if(isAttack1){
            this.route=[
                    {x:0,y:-100},
                    {x:20,y:-100},
                    {x:40,y:-50},
                    {x:60,y:0},
                    {x:60,y:10},
                    {x:60,y:30},
                    {x:60,y:30},
                    {x:40,y:30},
                    {x:-50,y:10},
                    {x:-200,y:0},
                ]
        }else{
            this.route=[
                {x:-120,y:0},
                {x:-100,y:20},
                {x:-50,y:30},
                {x:0,y:20},
                {x:40,y:-60},
                {x:40,y:-50},
                {x:40,y:-25},
                {x:40,y:-10},
                {x:-50,y:-10},
                {x:-200,y:-10},
            ]
        }
        //this.box=this.physics.add.existing(this.box,true);
        this.active=true;
    }//TODO
    update(fighter,counter){
        if(this.active){
            let correctionFactor = -50
            let relPos = this.route[counter]
            if(counter<this.route.length) {
                let flipped = (fighter.isRightFaced()?(1):(-1));
                this.box.body.x = fighter.sprite.x + (correctionFactor*flipped) + (this.route[counter].x*flipped)+(fighter.weight*20*flipped);
                if(flipped<0){  this.box.body.x-=100;}
                this.box.body.y = fighter.sprite.y + this.route[counter].y-(fighter.weight*10);
            }
        }else{

        }
    }//TODO
    setPosition(x,y) {
        this.box.x=x;
        this.box.y=y;
    }//TODO
    nextFrame(){
    }

    getRelativePosition() {

        return undefined;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////\
//\__/\\\\\\\\\\\\\\\_____________________/\\\____________________________________________________/\
///\_\/\\\///////////_____________________\/\\\____________________________________________________/\
////\_\/\\\______________/\\\___/\\\\\\\\__\/\\\_____________/\\\___________________________________/\
/////\_\/\\\\\\\\\\\_____\///___/\\\////\\\_\/\\\__________/\\\\\\\\\\\_____/\\\\\\\\___/\\/\\\\\\\__/\
//////\_\/\\\///////_______/\\\_\//\\\\\\\\\_\/\\\\\\\\\\__\////\\\////____/\\\/////\\\_\/\\\/////\\\_/\
///////\_\/\\\_____________\/\\\__\///////\\\_\/\\\/////\\\____\/\\\_______/\\\\\\\\\\\__\/\\\___\///__/\
////////\_\/\\\_____________\/\\\__/\\_____\\\_\/\\\___\/\\\____\/\\\_/\\__\//\\///////___\/\\\_________/\
/////////\_\/\\\_____________\/\\\_\//\\\\\\\\__\/\\\___\/\\\____\//\\\\\____\//\\\\\\\\\\_\/\\\_________/\
//////////\_\///______________\///___\////////___\///____\///______\/////______\//////////__\///__________/\
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
class Fighter{
    constructor(type,team,color,physics,xSpawn) {
        this.values= _fighterState;
        this.self = this;
        this.shadow=null;
    //---------------------------------------------- Attributes
    {
        this.locked=true;
        this.attackBox = null;
        this.type = type;
        this.team = team;
        this.color = color;
        this.active = false;
        this.dead = false;
        //let keyName= type + '_';
        this.fighterStateManager = null;

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
        this.shadow = physics.add.staticSprite(xSpawn, 100,this.type+'_white_idle' ).setOrigin(0.5,0.5);
        this.shadow.tint = 0x000000;
        this.shadow.alpha = 0.6;
        this.sprite = physics.add.sprite(xSpawn, 100,this.type+'_white_idle' ).setOrigin(0.5,0.5);
     // this.sprite = physics.add.sprite(type + '_' + color_name + '_idle');
        this.sprite.setBounce(0.15);
        this.sprite.body.setGravityY(500);
        this.sprite.flipX=!team.isPlayer;
        physics.add.collider(this.sprite, gameManager.getScene('game').floor);
        this.sprite.body.setGravityY(200*this.weight)
        this.sprite.setSize(100,160+20*this.weight,true)
        this.sprite.setOffset(200,180-20*this.weight)
        this.sprite.body.friction.x=0;
        this.sprite.body.setDragX(500);
        this.sprite.fighter=this;
        this.emitter.startFollow(this.sprite)
        this.hitBox = new HitBox(0,0,physics);
    }
    //-----------------------------------set interaction
    if(this.team.isPlayer){
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
            fighter.activateFighter(fighter,true)
        }
    }
    //-----------------------------------set animations
    {
        let color_name = 'white';
        this.anims=this.sprite.anims;
        let keyName=this.type;
        this.colorName=(color ? 'white':'black');
        this.anims.create({
            key: 'idle',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_idle', {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12]}),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_walk', {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}),
            frameRate: 30,
            repeat: 0,
        });
        this.anims.create({
            key: 'attack1',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_attack1', {frames:[0,1,2,3,4,5,6,7,8,9]}),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: 'attack2',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_attack2', {frames:[0,1,2,3,4,5,6,7,8,9]}),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: 'defense_start',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_defense', {frames:[0,1,2,3,4]}),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: 'defense_end',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_defense', {frames:[4,5,6,7,8]}),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: 'hit',
            frames: game.anims.generateFrameNumbers(keyName +'_'+color_name+ '_hit', {frames:[0,1,2,3,3,4,4,5,5,6,7,8,9]}),
            frameRate: 12,
            repeat: 0,
        });
        this.sprite.play('idle',true);
        // this.anims.play('idle', false);
    }
    }
    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------------Internal Functions
    activateFighter(fighter,player) {
        this.fighterStateManager = new FighterManager(this);
        fighter.active=true;
        if(player){
            fighter.team.setCurrentFighter(fighter, fighter.team);
            gameManager.fighterSelected(fighter)
        }else{
            fighter.team.setCurrentFighter(fighter,fighter.team);
        }

    }
    getPosition(){return {x:this.sprite.x,y:this.sprite.y}}
    setVelocityX(n){this.sprite.body.velocity.x = n}
    addVelocityX(v){this.sprite.body.velocity.x+=v}
    getVelocityX(){return this.sprite.body.velocity.x}
    setAnimation(key){
        //TODO
    }
    getFighter() {return self }
    isLocked(){return this.locked}
    setLock(val){this.locked=val;}
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
    hit(damage,directionFrom){  //direction= (-1 = left || 1 = right ||0 = deactivate bounce) fighter relative
        if(this.fighterStateManager.getCurrentState(this)==='defense'){
            this.addVelocityX(directionFrom*(BOUNCE_FORCE+(damage/10)));

        }else if(this.fighterStateManager.getCurrentState(this)!=='hit'){
            this.fighterStateManager.setCurrentState('hit',this);
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
    isTouchingDown(){
        return this.sprite.body.touching.down;
    }
    moveTo(x){
        this.moving=true;
        this.moveObjective=x;
        this.fighterStateManager.setCurrentState('walk');
        this.locked=true;

    }
    getEnemy(){return (this.team.isPlayer)?(this.team.gameScene.iaTeam.currentFighter):(this.team.gameScene.playerTeam.currentFighter);
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
    processInput(keys) {
       if(!this.locked) {
            switch (this.fighterStateManager.getCurrentState()) {
                case 'walk':
                    if (!keys.left && !keys.right) {
                        this.fighterStateManager.setCurrentState('idle');
                    }
                case 'idle':
                    if (keys.defense) {
                        // this.sprite.anims.play('defense_start', false);
                        this.fighterStateManager.setCurrentState('defense');
                    } else if (keys.attack1) {
                        // this.sprite.anims.play('attack1', true)
                        this.fighterStateManager.setCurrentState('attack1');
                    } else if (keys.attack2) {
                        // this.sprite.anims.play('attack2', true)
                        this.fighterStateManager.setCurrentState('attack2');
                    } else {
                        if (keys.left) {
                            if (this.sprite.body.velocity.x > (-180 - (this.speed * 40))) {
                                this.sprite.body.velocity.x -= 20 * this.speed;
                            } else {
                                this.sprite.body.velocity.x = -200 - (this.speed * 40)
                            }
                            this.fighterStateManager.setCurrentState('walk');
                            this.sprite.flipX = true;
                        } else if (keys.right) {
                            // this.sprite.anims.play('walk', true);
                            if (this.sprite.body.velocity.x < 180 + (this.speed * 40)) {
                                this.sprite.body.velocity.x += 20 * this.speed;
                            } else {
                                this.sprite.body.velocity.x = 200 + (this.speed * 40)
                            }
                            this.fighterStateManager.setCurrentState('walk');
                            this.sprite.flipX = false;
                        }
                        if (this.sprite.body.touching.down) {
                            if (keys.up) {
                                this.sprite.setVelocityY(-960 + (this.weight * 10));
                            }
                        } else {
                        }
                    }
                    break;
                case 'attack1':

                    break;
                case 'attack2':
                    break;
                case 'defense':
                    if (!keys.defense) {
                        this.fighterStateManager.setCurrentState('idle');
                    }
                    break;
                case 'hit':
                    break;
                default:
                    break;
            }
        }
    }
    update(){
        // if(this.sprite.body.touching.down){this.slowDown();}
        this.shadow.setVisible(this.sprite.visible);
         if(this.shadow.visible){
             // this.emitter.particle=(this.team.gameScene.add.particles(this.sprite.anims.currentFrame.textureKey, this.sprite.anims.currentFrame.index - 1));
             try{
                 // this.hitBox.update(this);
                 this.shadow.setTexture(this.sprite.anims.currentFrame.textureKey, this.sprite.anims.currentFrame.textureFrame );
                 this.shadow.x = ((this.sprite.x > 1200) ? (this.sprite.x + 7) : (this.sprite.x - 7));
                 this.shadow.y = this.sprite.y + 7;
                 this.shadow.flipX = this.sprite.flipX;
             }catch (e) {
                 console.log('animation not set')
             }
        }
         if (this.moving){
             let pos =this.sprite.x;
             let val= 5*this.speed;

             if(this.moveObjective>pos){
                 this.sprite.body.x +=((val<(this.moveObjective-pos))?(val):(this.moveObjective-pos));
             }else if(this.moveObjective<pos){
                 this.sprite.body.x-=((val<(pos-this.moveObjective))?(val):(pos-this.moveObjective));
             }else {
                 this.moving=false;
                 this.moveObjective=null;
                 this.locked=false;
             }
         }
    }
}

////////////////////////////////////////////////////////////////////////////////////\
//\__/\\\\\\\\\\\\\\\________________________________________________________________\
///\_\///////\\\/////_________________________________________________________________\
////\_______\/\\\______________________________________________________________________\
/////\_______\/\\\___________/\\\\\\\\___/\\\\\\\\\_______/\\\\\__/\\\\\____/\\\\\\\\\\_\
//////\_______\/\\\_________/\\\/////\\\_\////////\\\____/\\\///\\\\\///\\\_\/\\\//////__\
///////\_______\/\\\________/\\\\\\\\\\\____/\\\\\\\\\\__\/\\\_\//\\\__\/\\\_\/\\\\\\\\\\_\
////////\_______\/\\\_______\//\\///////____/\\\/////\\\__\/\\\__\/\\\__\/\\\_\////////\\\_\
/////////\_______\/\\\________\//\\\\\\\\\\_\//\\\\\\\\/\\_\/\\\__\/\\\__\/\\\__/\\\\\\\\\\_\
//////////\_______\///__________\//////////___\////////\//__\///___\///___\///__\//////////__\
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
class HealthBar {

    constructor (scene, x, y,isPlayer) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 233/100;
        this.fighter = null;
        this.activated = false;
        this.flip=!isPlayer;
        this.scene = scene// .add.existing(this.bar);
        this.draw()
    }
    setFighter(fighter){
        this.fighter =fighter;
    }
    activateBar(){
        if(this.fighter!==null) {
            this.bar.sprite.setVisible(true)
            this.activated = true;
            this.scene.add.existing(this.bar)
            this.draw();
        }
    }
    healthFactor(){return this.fighter.health/this.value;}
    deactivateBar(){}
    decrease (amount){
        this.value -= amount* this.healthFactor();
        if (this.value < 0)
        {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }
    draw (){
        this.bar.clear();
        if(this.isActive()) {
            //  BG
            this.bar.fillStyle(0x000000);
            this.bar.fillRect(this.x, this.y, 240,32 );
            //  Health
            this.bar.fillStyle(0xffffff);
            this.bar.fillRect(this.x + 4, this.y + 4, 232, 24);
            if (this.value < 100) {
                this.bar.fillStyle(0xff0000);
            } else {
                this.bar.fillStyle(0x00ff00);
            }
            let d = Math.floor(this.p * this.value);
            this.bar.fillRect(this.x + 4, this.y + 4, d, 24);
        }else{
        }
    }
    isActive() {
        return this.activated;
    }
}