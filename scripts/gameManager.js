//EVENTSCENTER FROM : https://blog.ourcade.co/posts/2020/phaser3-how-to-communicate-between-scenes/
WHITE = true;
BLACK = false;
//CLASS OBJECT TO PASS BTWN SCENES
class GameManager {
    constructor(game) {
        this.game = game;
        this.values=['LOADING', 'MENU', 'PAUSE', 'SELECT-FIGHTER', 'FIGHT1', 'FIGHT2','MATCH-OVER', 'GAME-OVER'];
        this.eventsCenter = new Phaser.Events.EventEmitter();
        this.currentState= 0;
        this.loaderScene = new LoaderScene(this);
        this.menuScene = new MenuScene();
        this.gameScene= new GameScene();
        this.uiscene = new UiScene();
        this.debugText = '';
    }
    //-------------------------------------------------getters n setters
    getCurrentState() {
        return this.values[this.currentState];
    }
    setCurrentState(state) {
        try {
            this.currentState = this.values.indexOf(state);
            this.debugText='GameState: '+this.getCurrentState();
        } catch (e) {
            console.log('ERR_ state send not recognized:' + state + '\n' + e)
        }
    }
    setGame(game){this.game = game;}
    getScene(sceneName){
        switch (sceneName) {
            case ('loader'):
                return this.loaderScene;
            case ('menu'):
                return this.menuScene;
            case ('game'):
                return this.gameScene;
            case ('uiscene'):
                return this.uiscene;
            default:
                return this.getFocus_scene();
        }
    }
    getFocus_scene(){return this.game.scene;}
    //-------------------------------------------------game states methods
    startMenu(){
        this.getFocus_scene().start('menu',this);
    }
    selectTeam(color){
        this.playerColor = color;
        this.getFocus_scene().run('uiscene',this);
        this.getFocus_scene().run('game',this);//run works as "resume" or "start" depending on current scene state
        this.getFocus_scene().sleep('menu');
    }
    selectFighter_screen(){
        this.setCurrentState('SELECT-FIGHTER');//TODO REUSABLE FOR EVERY SELECTION
        this.uiscene.selectFighter_screen(true);
    }
    pause(toggle){
        if(toggle) {
            this.gameScene.pause();
            this.uiscene.scene.run('uiscene');
            this.oldState=this.getCurrentState();
            this.setCurrentState('PAUSE');
            console.log(this.getCurrentState());
        }else{
            this.setCurrentState(this.oldState);
            this.gameScene.scene.resume('game');
        }
    }
    gameOver() {
       location.reload();
    }
}
class FighterManager{
    constructor(fighter){
        this.fighter=fighter;
        this.state_values=['idle', 'walk', 'attack1', 'attack2', 'hit', 'defense','evasion'];
        this.currentState= 0;
        this.anim_values=['idle', 'walk', 'attack1', 'attack2', 'hit','defense_start','defense_end'];
        this.currentAnim= 0;
        this.attackCounter=0;
        this.fighter.sprite.on('animationcomplete',function () {
           this.whenAnimationEnds();
        },this);
        this.fighter.sprite.on('animationupdate',function () {
            this.whenAnimationUpdates();
        },this);
    }
    getCurrentState() {
        return this.state_values[this.currentState];
    }
    setCurrentState(state) {
            if(this.getCurrentState()!==state){
                if (this.getCurrentState() === 'defense' && state !== 'defense') {
                    this.fighter.sprite.play('defense_end', true);
                    this.currentState = this.state_values.indexOf('idle');
                } else if(state==='evasion') {
                    this.fighter.evade();
                    this.currentState = this.state_values.indexOf(state);
                }else{
                    if (state === 'attack1' || state === 'attack2') {
                        let enemy = this.fighter.getEnemy()
                        let fighter = this.fighter;
                        fighter.hitBox.activate((state === 'attack1'), !fighter.isRightFaced(), enemy);
                        fighter.physics.add.overlap(fighter.hitBox.box,enemy.sprite,function(box,enemySprite){
                            if(enemy.fighterStateManager.getCurrentState()!=='evasion'){
                                fighter.hitBox.deactivate();
                                enemy.hit(fighter.damage, ((fighter.getPosition().x < enemy.getPosition().x) ? (-1) : (1)), (fighter.fighterStateManager.getCurrentState() === 'attack1'), fighter);
                                fighter.fighterStateManager.setCurrentState('idle');
                            }
                        })
                    }else if(this.getCurrentState()==='attack1'||this.getCurrentState()==='attack2'){
                        this.fighter.hitBox.deactivate();
                    }
                    this.currentState = this.state_values.indexOf(state);
                    this.fighter.sprite.play(this.anim_values[this.currentState], true);//FIXME
                }
            }
    }
    whenAnimationEnds(){
        if(this.fighter.sprite.anims.currentAnim.key==='defense_end'){
            this.fighter.sprite.play('idle',true);
        }else if(this.getCurrentState()==='attack1'||this.getCurrentState()==='attack2'){
            this.setCurrentState('idle');
            this.fighter.hitBox.deactivate();
        }else if(this.getCurrentState()==='hit'){
            this.setCurrentState('idle');
            this.fighter.locked=false;
            this.fighter.getEnemy().locked=false;
        }
    }
    whenAnimationUpdates(){
        if(this.fighter.sprite.anims.currentAnim.key==='attack1'||this.fighter.sprite.anims.currentAnim.key==='attack2'){
            this.fighter.hitBox.update(this.fighter,this.fighter.sprite.anims.currentFrame.index-2);
        }
    }
}