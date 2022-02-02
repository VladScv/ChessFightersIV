const uiscene = {
    values:['selectFighter','countdown','fight','fightQueen','isDead','wins','gameOver'],
    key: 'uiscene',
    active: false,  //This makes scenes be unactive until we activate them
    visible: false,
    player_healthBar: null,
    enemy_healthBar: null,
    uiStateManager:{
        currentState: 0,
        getCurrentState: function () {
            return values[this.currentState]
        },
        setCurrentState: function (state) {
            try {
                this.currentState = values.indexOf(state);
            } catch (e) {
                console.log('ERR_ state send not recognized:' + state + '\n' + e)
            }
        },
        next: function () {
            this.currentState += 1;
            if (this.currentState >= values.length()) {this.currentState = 0;}
        },

    },

    preload: uiPreload,
    create: uiCreate,
    update: uiUpdate
};


function uiPreload(){
}

function uiCreate(){

    this.player_healthBar = new HealthBar(this, 100, 40,true);
    // this.player_healthBar.bar.sprite.setActive(false).setVisible(false);
    this.enemy_healthBar= new HealthBar(this,800,40,false);
}

function uiUpdate(){

}
//-----------------------------------------------------HealthBar class
// from: https://labs.phaser.io/edit.html?src=src/game%20objects/graphics/health%20bars%20demo.js&v=3.55.2
class HealthBar {

    constructor (scene, x, y,isPlayer)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 233/100;
        this.fighter = null;
        this.activated = false;
        this.flip=!isPlayer;
        scene.add.existing(this.bar);
        this.draw()
    }
    assignFighter(fighter){
        this.fighter =fighter;
    }
    activateBar(){
        if(this.fighter!==null) {
            this.bar.sprite.setVisible(true)
            this.activated = true;
            this.draw();
        }
    }

    healthFactor(){return this.fighter.health/this.value;}
    deactivateBar(){}
    decrease (amount)
    {
        this.value -= amount* this.healthFactor();

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();
        if(!this.isActive()) {

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
