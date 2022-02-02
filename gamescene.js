
gameScene = {
	//------------- default
	key: 'game',
	active: false,  //This makes scenes be unactive until we activate them
	visible: false,
	//-------------
	playerTeam:null,
	iaTeam:null,
	background:null,
	playerColor:null,
	inputKeys:[],
	selectFighter_txt:'',
	preload: preload,
	create: create,
	update: update
};


var floor,
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX GAME SCENE XXXXXXXXXXXXXXXXXX
/*		 ██████   █████  ███    ███ ███████     ███████  ██████ ███████ ███    ██ ███████.......................
		██       ██   ██ ████  ████ ██          ██      ██      ██      ████   ██ ██............................
		██   ███ ███████ ██ ████ ██ █████       ███████ ██      █████   ██ ██  ██ █████.........................
		██    ██ ██   ██ ██  ██  ██ ██               ██ ██      ██      ██  ██ ██ ██............................
		 ██████  ██   ██ ██      ██ ███████     ███████  ██████ ███████ ██   ████ ███████
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

buttons = [];

function preload() {

	this.scene.launch('uiscene');
	this.gameState ='SELECTFIGHTER';
	this.background = this.add.image( 0,  this.cameras.main.height/2, 'bg').setOrigin(0,0.5);
	this.background.flipX=gameScene.playerColor;

}

function create() {
//--------------------------------------------------------------Create Screen text
	this.camWidth=this.cameras.main.width;
	this.camHeight=this.cameras.main.height;
	this.mainCamera= this.cameras.main;
	this.mainPhysics = this.physics;
	this.shadowTween=null;
	this.selectFighter_txt = [this.make.text({
		x: this.camWidth/ 4,
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
		text: '      Choose well ...\n \n '+
		'      If a fighter survives \n'+
		'       the first enemy, he\'ll \n'+
		'       have a chance to defeat\n'+
		'       the enemy Queen.\n\n'+
		'       God Save the Queen!!! \n\n'+
		'             CURSORS: Move\n'+
		'             Z: Quick Attack \n'+
		'             X: Heavy Attack \n'+
		'             C: Defense\n'+
		'             P: Pause',
		style: {
			font: '28px monospace',
			fill: '#ffffff'
	}
	})];
	this.selectFighter_txt[0].setOrigin(0.5, 0.5);
	this.selectFighter_txt[1].setOrigin(0, 0);
//----------------------------------------------------------------REGISTER CONTROLS KEYS
	gameScene.inputKeys = {
		cursors: this.input.keyboard.createCursorKeys(),
		keyPause : this.input.keyboard.addKey('P'),
		attack1_key : this.input.keyboard.addKey('Z'),
		attack2_key : this.input.keyboard.addKey('X'),
		defense_key : this.input.keyboard.addKey('C')
	}

	
//---------------------------------------------------------------create the floor object
	floor= this.physics.add.image(1200,640,'logicFloor');
	floor.setImmovable(true)
	floor.body.allowGravity=false
	floor.setVisible(false)
	floor.body.friction.x=0
	floor.body.setDragX(200)

//----------------------------------------------------------------CREATE TEAMS
	
	this.playerTeam = new FighterTeam(gameScene.playerColor,this,this.physics,true);
	this.iaTeam = new FighterTeam(!gameScene.playerColor,this,this.physics,false)


}

//-----------------------------------------------------UPDATE FUNCTION!
function update() {





	switch (gameStateManager.getCurrentState()){

		case 'SELECTFIGHTER':
			if(gameScene.currentFighter!=null){
				gameScene.currentFighter.sprite.destroy();
				gameScene.currentFighter= null;
				goTo_selection();
			}
			break;
		case 'FIGHTQUEEN':
			if(gameScene.fightingQueen===false){
				gameScene.fightingQueen=true;
				goTo_queen();
			}
		case 'FIGHT':

			if(gameScene.gameStarted){
				//if(!gameScene.playerAttack_collider!=='null'){
					//this.physics.add.collider(gameScene.currentFighter.sprite,gameScene.iaFighter.sprite);

									
					// this.physics.add.existing(gameScene.currentFighter.attackBox);

					// gameScene.iaAttack_collider= this.physics.add.collider(
					// 	gameScene.iaFighter.attackBox,
					// 	gameScene.currentFighter,
					// 	function(_attack,fighter){
					// 		if(fighter.fighterState!='INMUNE'||fighter.fighterState!='DEFENDING'){
					// 			hit(fighter);
					// 		}
					// 	}
					// );
				//}
				updateFight();
			}else{

				this.children.bringToTop(this.playerTeam.currentFighter.getSprite())
				if(gameScene.movingCamera){
					//moveMainCamera_to(this.cameras.main,gameScene.fixCamPoint,4);
				}else{

					this.mainCamera.pan(1200, 370, 3000, 'Sine.easeInOut');
					//
					// this.cameras.main.centerOn(1200, 370);
					if((typeof countdown !== 'undefined')){
					
					}
					else{
						var countdown = this.add.sprite(1200 , 20, 'selectButton');
						countdown.anims.create({
							key: 'countdown',
							frames: this.anims.generateFrameNumbers('_countdown', {frames:[0,1,2,3]}),
							frameRate: 2,
							repeat: 0
						})
						countdown.play('countdown',false);
						countdown.on('animationcomplete', function () {
							gameScene.gameStarted = true;
							// blockFightZone();
							this.visible = false;
						});
					}
				}
				// if(gameScene.iaFighter.sprite.body.position.x<=1590){
				// 	gameScene.iaFighter.sprite.body.setVelocityX(0);
				// 	gameScene.iaFighter.sprite.anims.play('idle',true);
				// }else{
				// 	gameScene.iaFighter.sprite.body.setVelocityX(-200);
				// 	gameScene.iaFighter.sprite.anims.play('walk',true);
				// }
				if(gameScene.currentFighter.sprite.body.position.x>=800){
					gameScene.currentFighter.sprite.anims.play('idle',true);
					gameScene.currentFighter.sprite.body.setVelocityX(0)
				}else{
					gameScene.currentFighter.sprite.body.setVelocityX(200);
					gameScene.currentFighter.sprite.anims.play('walk',true);
				}
			}
			break;
		case 'GAMEOVER':
			gameOver(gameScene.playerWins);
			break;
		default: break;
	}
	try{
		this.playerTeam.update();
	}catch (e) {
		console.log("err playerTeam="+this.playerTeam)
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------FIGHT SYSTEM
function updateFight(){
	if(gameScene.currentFighter.fighterState!=='INMUNE'){
		processInput();
			// checkPlayerHit();

	}

	if(gameScene.currentFighter.health<=0){
		// matchOver(false,gameScene.fightingQueen);
	}//else if(gameScene.iaFighter.health<=0){
		// matchOver(true,gameScene.fightingQueen);
	//}

}


//------------------------------------------------------------------INPUT MANAGEMENT

function processInput(){ 
	// if(this.currentFighter!=null){
		let fighter = gameScene.currentFighter;
		if (gameScene.inputKeys.cursors.left.isDown) {
			if(fighter.sprite.body.velocity.x>(-180-(fighter.speed*10))){fighter.sprite.body.velocity.x-=20}
			else{fighter.sprite.body.velocity.x=-200-(fighter.speed*10)}
			fighter.sprite.anims.play('walk',true)
			fighter.sprite.flipX=true;
		}
		else if (gameScene.inputKeys.cursors.right.isDown) {
			fighter.sprite.anims.play('walk',true);
			if(fighter.sprite.body.velocity.x<180+(fighter.speed*10)){fighter.sprite.body.velocity.x+=20}
			else{fighter.sprite.body.velocity.x=200+(fighter.speed*10)}
			fighter.sprite.flipX=false;
		}
		else {
			if(fighter.sprite.body.velocity.x>0){fighter.sprite.body.velocity.x-=20;}
			else if(fighter.sprite.body.velocity.x<0){fighter.sprite.body.velocity.x+=20;}
			else{}
			
		}

		if (gameScene.inputKeys.cursors.up.isDown&& fighter.sprite.body.touching.down) {
			fighter.sprite.setVelocityY(-450);
		}
		if (gameScene.inputKeys.keyPause.isDown) {
			this.scene.sleep();
			this.scene.run('menu');

		}
		if(gameScene.inputKeys.attack1_key.isDown){
			fighter.fighterState='FIGHTING';
			fighter.sprite.anims.play('attack1',true)
		}else if(gameScene.inputKeys.attack2_key.isDown){
			
			fighter.sprite.anims.play('attack2',true);
		}
		else if(gameScene.inputKeys.defense_key.isDown){
			
			fighter.sprite.anims.play('defense',true);
		}
	// }
}


//------------------------------------------------------------------CREATE ANIMATIONS
function createAnimations(keyName,color) {
	let colorName=(color ? 'white':'black');
	game.anims.create({
		key: 'idle',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_idle', {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12]}),
		frameRate: 12,
		repeat: -1,
	});
	game.anims.create({
		key: 'walk',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_walk', {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}),
		frameRate: 30,
		repeat: 0,
	});
	game.anims.create({
		key: 'attack1',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_attack1', {frames:[0,1,2,3,4,5,6,7,8,9]}),
		frameRate: 12,
		repeat: 0,
	});
	game.anims.create({
		key: 'attack2',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_attack2', {frames:[0,1,2,3,4,5,6,7,8,9]}),
		frameRate: 12,
		repeat: 0,
	});
	game.anims.create({
		key: 'defense',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_defense', {frames:[0,1,2,3,4,5,6,7,8]}),
		frameRate: 12,
		repeat: 0,
	});
	game.anims.create({
		key: 'hit',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_hit', {frames:[0,1,2,3,4,5,6,7,8,9]}),
		frameRate: 12,
		repeat: 0,
	});
}

//------------------------------------------------------------------UTILS
function moveMainCamera_to(camera,xPoint,speed){ 	
	if (camera.midPoint.x<xPoint){
		camera.scrollX+=speed;
		if (camera.midPoint.x<xPoint){movingCamera=false;}
	}else{
		gameScene.movingCamera=false;
	}
}//Deprecated