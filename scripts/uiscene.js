class UiScene extends Phaser.Scene {
    constructor() {
        super('uiscene');
        this.key = 'uiscene';
        this.active = false;  //This makes scenes be unactive until we activate them
        this.visible = false;
        this.player_healthBar = null;
        this.enemy_healthBar = null;
        this.values = ['selectFighter', 'countdown', 'fight', 'fightQueen', 'isDead', 'wins', 'gameOver'];
        this.selectFighter_txt = '';
        this.pauseText='';
        this.barActivate = false;
    }
//---------------------------------------------------------PHASER METHODS
    init(data){
        this.gameManager = data;
    }

    preload() {
        this.mainCamera = this.cameras.main;
        this.camWidth = this.mainCamera.width;
        this.camHeight = this.mainCamera.height;
    }

    create() {
        this.keyPause= this.input.keyboard.addKey('P');

        this.selectFighter_txt = [this.make.text({
            x: this.camWidth / 4,
            y: 50,
            text: 'Select a Fighter!',
            style: {
                font: '42px monospace',
                fill: '#000000'
            }
        }),
            this.make.text({
                x: this.camWidth / 2,
                y: 50,
                text: '      Choose well ...\n \n ' +
                    '      If a fighter survives \n' +
                    '       the first enemy, he\'ll \n' +
                    '       have a chance to defeat\n' +
                    '       the enemy Queen.\n\n' +
                    '       God Save the Queen!!! \n\n' +
                    '             CURSORS: Move\n' +
                    '             Z: Quick Attack \n' +
                    '             X: Heavy Attack \n' +
                    '             C: Defense\n' +
                    '             SPACE: Evade\n\n'+
                    '             P: Pause',
                style: {
                    font: '28px monospace',
                    fill: '#ffffff'
                }
            })];
        this.selectFighter_txt[0].setOrigin(0.5, 0.5);
        this.selectFighter_txt[1].setOrigin(0, 0);
        this.player_healthBar = new HealthBar(this, 100, 40, true);
        this.enemy_healthBar = new HealthBar(this, 800, 40, false);
        gameManager.eventsCenter.on('hit',function(damage,isPlayer){
            if(isPlayer){
                this.player_healthBar.decrease(damage);
            }else {
                this.enemy_healthBar.decrease(damage);
            }
        },this);
        this.debugTxt= this.make.text({
                x: this.camWidth / 2,
                y: (this.camHeight) - 40,
                text: gameManager.debugText,
                style: {
                    font: '18px monospace',
                    fill: '#FFFFFFFF'
                }
            }).setOrigin(0.5, 0.5);
        this.countdownSprite=this.physics.add.staticSprite(this.camWidth/2,40,'countdown');
        this.countdownSprite.setVisible(false);
        this.countdownSprite.anims.create({
            key: 'countdown',
            frames: game.anims.generateFrameNumbers('countdown', {frames:[0,1,2,3]}),
            frameRate: 1,
            repeat: 0,
        });
        this.countdownSprite.on('animationcomplete',function () {
            if (this.countdownSprite.anims.currentFrame.textureKey==='countdown'){
                this.countdownSprite.setVisible(false);
                gameManager.eventsCenter.emit('countdown_end');
            }
        },this);
        gameManager.eventsCenter.on('FIGHT1_end',function (){
            this.player_healthBar.deactivateBar();
            this.enemy_healthBar.deactivateBar();
            this.time.delayedCall(3000, function (){
                gameManager.uiscene.startCountdown();
            }, this);
        },this)
        gameManager.eventsCenter.on('fighterSelected',function (player,enemy){
            this.assignFighters(player,enemy);
        },this)
        gameManager.eventsCenter.on('iaFighterArrived',function (player,enemy){
                this.startCountdown();
        },this)
        gameManager.eventsCenter.on('gameOver',function (playerWins,isBlack){
             let winnerColor= (isBlack?('black'):('white'))
            console.log(winnerColor)
            this.add.image(0,0,'gameOver_'+winnerColor).setOrigin(0,0);
            this.input.once(Phaser.Input.Events.POINTER_DOWN, function () {
                gameManager.gameOver(playerWins);
            },this);

        },this)
        this.pause_screen= this.add.image(0,0,'pause').setOrigin(0,0);
        this.pause_screen.setVisible(false);
        this.pauseText=[this.make.text({
            x: this.camWidth / 2,
            y: this.camHeight / 2,
            text: 'PAUSE',
            style: {
                font: '64px monospace',
                fill: '#000000'
            }
        }).setOrigin(0.5,0.5),this.make.text({
            x: this.camWidth / 2,
            y: (this.camHeight / 2)+40,
            text: 'Press P to continue',
            style: {
                font: '28px monospace',
                fill: '#000000'
            }
        }).setOrigin(0.5,0.5)];
        this.pauseText[0].setVisible(false)
        this.pauseText[1].setVisible(false)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyPause)&&
            (gameManager.getCurrentState()==='FIGHT1'||
                gameManager.getCurrentState()==='FIGHT2'||
                gameManager.getCurrentState()==='PAUSE')){this.pauseGame()};
        //ONLY FOR DEBUG PURPOSES
        this.debugTxt.text=gameManager.debugText;
       try {
          this.debugTxt.text+= '|| PLAYER: ' + gameManager.gameScene.playerTeam.currentFighter.type + '_state:' + gameManager.gameScene.playerTeam.currentFighter.fighterStateManager.getCurrentState()+
              '|| ENEMY: ' + gameManager.gameScene.iaTeam.currentFighter.type + '_state:' + gameManager.gameScene.iaTeam.currentFighter.fighterStateManager.getCurrentState();
       }catch (e){
       }
    }


//---------------------------------------------------------ADDED METHODS
    pauseGame(){
        let aux = (!gameManager.gameScene.scene.isPaused('game'));
        this.pauseText[0].setVisible(aux);
        this.pauseText[1].setVisible(aux);
        if((aux&&(gameManager.getCurrentState()==='FIGHT2'||gameManager.getCurrentState()==='FIGHT1'))||
            (!aux&&(gameManager.oldState==='FIGHT2'||gameManager.oldState==='FIGHT1'))){
            this.player_healthBar.bar.setVisible(!aux);
            this.enemy_healthBar.bar.setVisible(!aux);
        }
        this.gameManager.pause(aux);
        this.pause_screen.setVisible(aux);
    }
    selectFighter_screen(activate){
        this.player_healthBar.activated=!activate;
        this.enemy_healthBar.activated=!activate;
        this.player_healthBar.update();
        this.enemy_healthBar.update();
        this.selectFighter_txt[0].setVisible(activate);
        this.selectFighter_txt[1].setVisible(activate);
    }
    assignFighters(player,enemy){
        this.player_healthBar.setFighter(player);
        this.enemy_healthBar.setFighter(enemy);
        this.selectFighter_screen(false);
        this.barActivate=true;
    }
    startCountdown(){
        this.countdownSprite.setVisible(true)
        this.countdownSprite.play('countdown');
    }
}

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
        this.scene = scene;
        this.draw()
    }
    setFighter(fighter){
        this.value = (fighter.health/fighter.maxHealth)*100;
        this.fighter =fighter;
        this.activateBar();
    }
    activateBar(){
        if(this.fighter!==null) {
            this.bar.setVisible(true)
            this.activated = true;
            this.scene.add.existing(this.bar)
            this.draw();
        }
    }
    healthFactor(){return this.fighter.maxHealth/100;}
    deactivateBar(){
        this.fighter=null;
        this.bar.clear();
        this.bar.setVisible(false)
        this.activated = false;
    }
    decrease(amount){
        console.log('damage amount= '+amount)
        if(amount>0) {
            this.value -= amount / this.healthFactor();
            if (this.value < 0) {
                this.value = 0;
            }
            this.draw();
        }
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
            if (this.value < (33)) {
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
    update() {
        if(this.activated){this.activateBar()}else{this.deactivateBar()}
    }
}

