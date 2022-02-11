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
            // this.time.delayedCall(3500, function (){
            //     gameManager.uiscene.startCountdown();
            // }, this);
        },this)
        gameManager.eventsCenter.on('iaFighterArrived',function (player,enemy){
                this.startCountdown();
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
        this.debugTxt.text=gameManager.debugText;
       try {
          this.debugTxt.text+= '|| PLAYER: ' + gameManager.gameScene.playerTeam.currentFighter.type + '_state:' + gameManager.gameScene.playerTeam.currentFighter.fighterStateManager.getCurrentState()+
              '|| ENEMY: ' + gameManager.gameScene.iaTeam.currentFighter.type + '_state:' + gameManager.gameScene.iaTeam.currentFighter.fighterStateManager.getCurrentState();
       }catch (e){

       }
    }
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
        // let toggle= (this.gameManager.getCurrentState()!=='PAUSE');
        // console.log(toggle)
        // this.gameManager.pause(toggle);
        // this.pauseText.setVisible(toggle);
    }
    selectFighter_screen(activate){
        //TODO group all memembers for fightUi and selectUI
        this.player_healthBar.activated=!activate;
        this.enemy_healthBar.activated=!activate;
        this.player_healthBar.update();
        this.enemy_healthBar.update();
        this.selectFighter_txt[0].setVisible(activate);
        this.selectFighter_txt[1].setVisible(activate);
       //TODO set visible all the elements
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
//-----------------------------------------------------HealthBar class
// from: https://labs.phaser.io/edit.html?src=src/game%20objects/graphics/health%20bars%20demo.js&v=3.55.2



