


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX GAME SCENE XXXXXXXXXXXXXXXXXX
/*		 ██████   █████  ███    ███ ███████     ███████  ██████ ███████ ███    ██ ███████.......................
		██       ██   ██ ████  ████ ██          ██      ██      ██      ████   ██ ██............................
		██   ███ ███████ ██ ████ ██ █████       ███████ ██      █████   ██ ██  ██ █████.........................
		██    ██ ██   ██ ██  ██  ██ ██               ██ ██      ██      ██  ██ ██ ██............................
		 ██████  ██   ██ ██      ██ ███████     ███████  ██████ ███████ ██   ████ ███████
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

class GameScene extends Phaser.Scene {
	constructor() {
		super('game');

		//------------- default
		this.key = 'game';
		this.active = false;
		this.visible = false;
		//-------------
		this.floor = null;
		this.ia_system = null;
		this.playerWins = false;
		this.fightUi_active = null;
		this.playerTeam = null;
		this.iaTeam = null;
		this.background = null;
		this.playerColor = null;
		this.inputKeys = [];

	}
	init(data){
		this.gameManager=data;
	}
	preload() {
		this.ia_system = new IA_System(this);
		this.mainCamera = this.cameras.main;
		this.camWidth = this.mainCamera.width;
		this.camHeight = this.mainCamera.height;
		this.background = this.add.image(0, this.camHeight / 2, 'bg').setOrigin(0, 0.5);
		this.background.flipX = this.gameManager.playerColor;
		this.mainPhysics = this.physics;
	}

	create() {
//--------------------------------------------------------------Create Screen text
		//----------------------------------------------------------------REGISTER CONTROLS KEYS
		this.inputKeys = {
			cursors: this.input.keyboard.createCursorKeys(),
			attack1_key: this.input.keyboard.addKey('Z'),
			attack2_key: this.input.keyboard.addKey('X'),
			defense_key: this.input.keyboard.addKey('C')
		}


		//---------------------------------------------------------------create the floor object
		this.floor = this.physics.add.image(1200, 640, 'logicFloor');
		this.floor.setImmovable(true)
		this.floor.body.allowGravity = false
		this.floor.setVisible(false)
		this.floor.body.friction.x = 0
		this.floor.body.setDragX(200)
		//----------------------------------------------------------------CREATE TEAMS
		this.iaTeam = new FighterTeam(!this.playerColor, this, this.physics, false);
		this.playerTeam = new FighterTeam(this.playerColor, this, this.physics, true,);
		this.gameManager.selectFighter_screen();
	}

//-----------------------------------------------------UPDATE FUNCTION!
	update() {
		if(this.playerTeam.currentFighter!==null){
			this.playerTeam.currentFighter.processInput({
				left: this.inputKeys.cursors.left.isDown,
				right: this.inputKeys.cursors.right.isDown,
				up: this.inputKeys.cursors.up.isDown,
				attack1: this.inputKeys.attack1_key.isDown,
				attack2: this.inputKeys.attack2_key.isDown,
				defense:this.inputKeys.defense_key.isDown
			});
		}
		this.playerTeam.update();
		this.iaTeam.update();
	}
//------------------------------------------------------------------INPUT MANAGEMENT
	pause(){
		this.scene.pause('game');
	}
	moveCamera_to(xPoint,speed){
		this.mainCamera.pan(xPoint, 370, speed, 'Sine.easeInOut');
	}
	round1_prepare(){

	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
