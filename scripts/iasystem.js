

class IA_System {
    constructor(gameScene) {
        this.gameScene = gameScene;
        this.team=gameScene.iaTeam;
        this.botFighter = null;
        this.actions=[];
        this._botAcctitude= ['PASSIVE','DEFENSIVE','AGRESSIVE','KILLER'];
        this.botAcctitude=0;
        this.dangerAlert=false;
        this.hits=0;
        this.goodVibe=false;

    }
    iaSystem_update(){

    }
    selectNext_iaFighter(team){
        this.guessPlayerOptions(this.botAcctitude);
        let rand = 4
        console.log('random:'+rand)
        while (team.getFighters()[rand]===null){
            rand-=1;
        }//FIXME---------------------------------------------------------------------------could be a loop when only remains the queen
        this.botFighter=(team.getFighters())[rand];
        return (team.getFighters())[rand];
    }
    guessPlayerOptions(acctitude){

    }//TODO CHECK PREVIOUS SAVED DATA ABOUT PLAYER BEHAVIOUR

}