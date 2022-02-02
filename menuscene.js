var menuScene = {
	key: 'menu',
	active: false,
	visible: false,
	
	preload: menuLoad,
	create: menuCreate,
	update: menuUpdate
};




//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX MENU SCENE XXXXXXXXXXXXXXXXXX
/*		███    ███ ███████ ███    ██ ██    ██     ███████  ██████ ███████ ███    ██ ███████......................
		████  ████ ██      ████   ██ ██    ██     ██      ██      ██      ████   ██ ██...........................
		██ ████ ██ █████   ██ ██  ██ ██    ██     ███████ ██      █████   ██ ██  ██ █████........................
		██  ██  ██ ██      ██  ██ ██ ██    ██          ██ ██      ██      ██  ██ ██ ██...........................
		██      ██ ███████ ██   ████  ██████      ███████  ██████ ███████ ██   ████ ███████......................
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function menuLoad() {
	//-------------------------------------------------------------load more stuff
	//gameScene.background = this.add.image( 0,  this.cameras.main.height/2, 'bg').setOrigin(0,0.5);

}
function menuCreate() {
	//--------------------------------------------------------------construct menu
//MENU WILL BE THE TEAM SELECTION SCREEN
	var blackTeam_btn = this.add.image(0,  0, 'blackTeam_btn').setOrigin(0);
	var whiteTeam_btn = this.add.image(this.cameras.main.width/2,  0, 'whiteTeam_btn').setOrigin(0);

	blackTeam_btn.setInteractive();
		blackTeam_btn.on('pointerdown', function () {
			gameScene.playerColor = false;
			game.scene.run('game');//run works as "resume" or "start" depending on current scene state
			game.scene.sleep('menu');
		},this);
	blackTeam_btn.on('pointerover', () => { blackTeam_btn= this.add.image(0,  0, 'blackTeam_btn_on').setOrigin(0)});
	blackTeam_btn.on('pointerout', () => { blackTeam_btn= this.add.image(0,  0, 'blackTeam_btn').setOrigin(0)});

	whiteTeam_btn.setInteractive();
		whiteTeam_btn.on('pointerdown', function () {
			gameScene.playerColor = WHITE;
			game.scene.run('game');//run works as "resume" or "start" depending on current scene state

			game.scene.sleep('menu');
		},this);
	whiteTeam_btn.on('pointerover', () => { whiteTeam_btn= this.add.image(this.cameras.main.width/2,  0, 'whiteTeam_btn_on').setOrigin(0)});
	whiteTeam_btn.on('pointerout', () => { whiteTeam_btn= this.add.image(this.cameras.main.width/2,  0, 'whiteTeam_btn').setOrigin(0)});
}
function menuUpdate() {

}


