class IA_System {
    constructor(gameScene) {
        this.gameScene = gameScene;
        this.team=gameScene.iaTeam;
        this.botFighter = null;
        // this.actions=[];
        // this._botAcctitude= ['PASSIVE','DEFENSIVE','AGRESSIVE','KILLER'];
        // this.botAcctitude=0;
        // this.dangerAlert=false;
        // this.hits=0;
        // this.goodVibe=false;
        this.playerFighter=null;
        this.botFighter=null;

    }
    iaSystem_update(){
        if(this.playerFighter!==null&&( gameManager.getCurrentState()==='FIGHT1'|| gameManager.getCurrentState()==='FIGHT2')) {
            let aux;
            if(this.playerFighter.fighterStateManager!==null){
                aux = (this.playerFighter.fighterStateManager.getCurrentState() === 'attack1');
            }else {
                aux = false;
            }
            return {
                left: (this.playerFighter.getPosition().x < this.botFighter.getPosition().x - 160),
                right: (this.playerFighter.getPosition().x > this.botFighter.getPosition().x),
                up: (!this.playerFighter.isTouchingDown()),
                attack1: (this.playerFighter.getPosition().x > this.botFighter.getPosition().x - 160 && this.playerFighter.getPosition().x < this.botFighter.getPosition().x + 160),
                attack2: false,
                defense: aux,
                evade: false
            };
        }else{
            console.log('ERR_IA_SYSTEM_INPUT')
            return null;
        }
    }
    assignFighters(bot,player){
        this.botFighter=bot;
        this.playerFighter=player;
    }
    selectNext_iaFighter(team){
        let rand;
        if(team.remainingFighters>0) {
            rand = Phaser.Math.Between(1, 4);
            while (team.getFighters()[rand] === null) {

                console.log('fighter:' + team.getFighters()[rand])
                rand = Phaser.Math.Between(1, 4);
            }
        }else{
            rand =0;
        }
        console.log('random:' + rand)
        return (team.getFighters())[rand];
    }
    // guessPlayerOptions(acctitude){

    // }

}