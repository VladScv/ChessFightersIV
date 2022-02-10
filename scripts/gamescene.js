


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
		gameManager.eventsCenter.on('playerFighterArrived',function (fighter) {
			this.time.delayedCall(3000, function (){
				gameManager.uiscene.startCountdown();
			}, this);
		},this)
		gameManager.eventsCenter.on('countdown_end',function (fighter) {
			this.playerTeam.currentFighter.locked=false;
			this.iaTeam.currentFighter.locked=false;
			this.playerTeam.currentFighter.fighterStateManager.setCurrentState('idle');
			this.iaTeam.currentFighter.fighterStateManager.setCurrentState('idle');
			this.addFightersColliders();
			this.ia_system.assignFighters(this.iaTeam.currentFighter, this.playerTeam.currentFighter)
			if(gameManager.getCurrentState()==='SELECT-FIGHTER'){
				gameManager.setCurrentState('FIGHT1');
			}else{
				gameManager.setCurrentState('FIGHT2');
			}
		},this)
		gameManager.eventsCenter.on('FIGHT1_end',function (playerWins) {
				gameManager.setCurrentState('MATCH-OVER');
			if(playerWins){
				this.iaTeam.setCurrentFighter(this.iaTeam.fighters[0],this.iaTeam);
				this.iaTeam.currentFighter.activateFighter(this.iaTeam.currentFighter,false)
				this.iaTeam.currentFighter.moveTo(2300);
				this.iaTeam.currentFighter.setFlip(true)
				this.playerTeam.currentFighter.moveTo(1300)
				this.moveCamera_to(1800,1200)
			}else{
				//TODO enemy attacks player queen
			}
		},this);
		gameManager.eventsCenter.on('FIGHT2_end',function (playerWins) {
			gameManager.setCurrentState('MATCH-OVER');
			if(playerWins){
				//TODO MATCH-OVER / GAME-OVER
			}else{
				//TODO MATCH-OVER / GAME-OVER
			}
		},this)

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
			this.iaTeam.currentFighter.processInput(this.ia_system.iaSystem_update());
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
	addFightersColliders(){
		this.collider= this.physics.add.collider(this.playerTeam.currentFighter.sprite, this.iaTeam.currentFighter.sprite);

	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
