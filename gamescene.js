
var gameScene = {
	key: 'game',
	active: false,  //This makes scenes be unactive until we activate them
	visible: false,
	movingCamera:false,
	playerTeam:null,
	iaTeam:null,
	gameState: 'SELECTFIGHTER',
	background:null,
	playerColor:null,
	inputKeys:[],
	selectFighter_txt:'',
	currentFighter:null,
	iaFighter:null,
	fightingQueen:false,
	gameStarted: false,
	playerWins:false, 
	fixCamPoint:800,
	countdown:null,
	playerAttack_collider:null,
	iaAttack_collider:null,
	preload: preload,
	create: create,
	update: update
};



//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX GAME SCENE XXXXXXXXXXXXXXXXXX
/*		 ██████   █████  ███    ███ ███████     ███████  ██████ ███████ ███    ██ ███████.......................
		██       ██   ██ ████  ████ ██          ██      ██      ██      ████   ██ ██............................
		██   ███ ███████ ██ ████ ██ █████       ███████ ██      █████   ██ ██  ██ █████.........................
		██    ██ ██   ██ ██  ██  ██ ██               ██ ██      ██      ██  ██ ██ ██............................
		 ██████  ██   ██ ██      ██ ███████     ███████  ██████ ███████ ██   ████ ███████
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

buttons = [];

function preload() {
	this.gameState ='SELECTFIGHTER';
	gameScene.background = this.add.image( 0,  this.cameras.main.height/2, 'bg').setOrigin(0,0.5);
	if(gameScene.playerColor===WHITE){gameScene.background.flipX=true;}
	this.input.keyboard.on('keydown-SPACE', function() { gameScene.movingCamera = true;},this);
	this.input.keyboard.on('keyup-SPACE', function() { gameScene.movingCamera = false;},this);
	
	
}

function create() {
//--------------------------------------------------------------Create Screen text
	mainPhysics = this.physics;
	// const countdown = this.add.sprite('countdown')
	gameScene.selectFighter_txt = [this.make.text({
		x: this.cameras.main.width / 4,
		y: 50,
		text: 'Select a Fighter!',
		style: {
			font: '42px monospace',
			fill: '#000000'
	}
	}),
	this.make.text({
		x: this.cameras.main.width / 2,
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
	gameScene.selectFighter_txt[0].setOrigin(0.5, 0.5);
	gameScene.selectFighter_txt[1].setOrigin(0, 0);
//----------------------------------------------------------------REGISTER CONTROLS KEYS
	gameScene.inputKeys = {
		cursors: this.input.keyboard.createCursorKeys(),
		keyPause : this.input.keyboard.addKey('P'),
		quickAttack_key : this.input.keyboard.addKey('Z'),
		heavyAttack_key : this.input.keyboard.addKey('X'),
		defense_key : this.input.keyboard.addKey('C')
	}

	
//---------------------------------------------------------------create the floor object
	const floor= this.physics.add.staticImage(1200,640,'logicFloor');
//----------------------------------------------------------------CREATE TEAMS
	
	gameScene.playerTeam = new FighterTeam(gameScene.playerColor,gameScene);
	 for(i=0; i<fighterType.length;i++){
		let keyName=fighterType[i];
		let colorName= (game.playerColor? 'white':'black');
		let fighter= new Fighter(fighterType[i],gameScene.playerTeam,gameScene,!gameScene.playerColor);
		fighter.sprite=  this.physics.add.sprite(100+i*150, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);
        fighter.sprite.setBounce(0.15)
		this.physics.add.collider(fighter.sprite, floor);
		keyName='ROOK';
		fighter.sprite.body.setGravityY(300)
		fighter.sprite.setSize(100,200,true)
		createAnimations('ROOK',WHITE);
		
		fighter.sprite.anims.play('idle',false);
		let aux = this.physics.add.staticImage(100 + (i * 150), 500, 'select_btn');
		
		// gameScene.countdown.body.setAllowGravity(false);

		buttons.push(aux);
		buttons[i].setOrigin(0.5, 0.5);
		buttons[i].setInteractive();
		buttons[i].on('pointerdown', function () {
			if(gameScene.currentFighter==null){	
				this.disableInteractive;
				activateFighter(true, buttons.indexOf(this));
				activateFighter(false,fighterType[ Phaser.Math.Between(1, 4)]);
				buttons.forEach(function (button) {
					if (button != null) {
						button.disableInteractive();
					}
				});
				console.log(buttons.indexOf(this));}
		});

	buttons[i].on('pointerover', function () {
		try {
			gameScene.playerTeam.fighters[buttons.indexOf(this)].sprite.anims.play('attack1', true);
		} catch (e) { };
	});
	buttons[i].on('pointerout', function () {
		try {
			gameScene.playerTeam.fighters[buttons.indexOf(this)].sprite.anims.play('idle', true);
		} catch (e) { };
	});
		gameScene.playerTeam.fighters[i]=fighter;
	 }
	gameScene.iaTeam = new FighterTeam(!gameScene.playerColor,gameScene);
	 for(i=0; i<fighterType.length;i++){
		let keyName=fighterType[i];
		let colorName= ((!game.playerColor)? 'white':'black')
	 	let iafighter= new Fighter(fighterType[i],gameScene.iaTeam,gameScene,!game.playerColor);
	 	iafighter.sprite=  this.physics.add.sprite(2400-100*i, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);
		iafighter.sprite.flipX=true;
        iafighter.sprite.setBounce(0.15);
		keyName="ROOK"
		this.physics.add.collider(iafighter.sprite, floor);
		iafighter.sprite.body.setGravityY(300)
		iafighter.sprite.setSize(100,200,true)
		createAnimations('ROOK',WHITE);
	 	gameScene.iaTeam.fighters[i]=iafighter;

	 }
}

//-----------------------------------------------------UPDATE FUNCTION!
function update() {
	switch (gameScene.gameState){
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
				if(!gameScene.playerAttack_collider!=='null'){
					console.log('afsafdsafsdafds')
					this.physics.add.collider(gameScene.currentFighter.sprite,gameScene.iaFighter.sprite);
									
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
				}
				updateFight();
			}else{ 
				if(gameScene.movingCamera){
					moveMainCamera_to(this.cameras.main,gameScene.fixCamPoint,4);
				}else{
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
				if(gameScene.iaFighter.sprite.body.position.x<=1590){
					gameScene.iaFighter.sprite.body.setVelocityX(0);
					gameScene.iaFighter.sprite.anims.play('idle',true);
				}else{
					gameScene.iaFighter.sprite.body.setVelocityX(-200);
					gameScene.iaFighter.sprite.anims.play('walk',true);
				}
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
	processInput();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------FIGHT SYSTEM
function updateFight(){
	if(gameScene.currentFighter.fighterState!='INMUNE'){
		if(!check_enemyHit()){
			processInput();
			// checkPlayerHit();
		}
	}

	if(gameScene.currentFighter.health<=0){
		// matchOver(false,gameScene.fightingQueen);
	}else if(gameScene.iaFighter.health<=0){
		// matchOver(true,gameScene.fightingQueen);
	}

}
function check_enemyHit() {
	// if((enemyFighter.attackBox.collides(playerFighter))&&( playerFighter.fighterState!= DEFENDING)){
	// 	playerFighter.health -= enemyFighter.damage*modifier; 
	// 	playerFighter.fighterState= INMUNE;
	// 	playerFighter.setAnimation('hit');
	// 	playerFighter.on.animationEnd.fighterState = idle;
	// 	return true;
	// }
	return false;
}

function attack(){ 
}

//------------------------------------------------------------------INPUT MANAGEMENT

function processInput(){ 
	if(gameScene.currentFighter!=null){
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
		if(gameScene.inputKeys.quickAttack_key.isDown){
			fighter.fighterState='FIGHTING';

			fighter.sprite.anims.play('attack1',true)
				if(fighter.fighterState=='FIGHTING'){
					attackBox= mainPhysics.add.sprite(gameScene.currentFighter.sprite.x+150,gameScene.currentFighter.sprite.y,'select_btn').setOrigin(0.5,0.5)
					attackBox.body.setAllowGravity(false);
					gameScene.playerAttack_collider=mainPhysics.add.collider(
						attackBox,
						gameScene.iaFighter.sprite,
						function(_attack,fighter){
							if(gameScene.iaFighter.fighterState!='INMUNE'||gameScene.iaFighter.fighterState!='DEFENDING'){
								// gameScene.iaFighter.hit();
								fighter.anims.play('hit',true);
							}
							_attack.destroy();
						}
					);
					// attackBox.destroy();
				}
			
			// fighter.attackBox.destroy();
		}else if(gameScene.inputKeys.heavyAttack_key.isDown){
			
			fighter.sprite.anims.play('attack2',true);
		}
		else if(gameScene.inputKeys.defense_key.isDown){
			
			fighter.sprite.anims.play('defense',true);
		}
	}
}

function activateFighter(isPlayer,index){ 
	if(isPlayer){
		gameScene.currentFighter= gameScene.playerTeam.fighters[index];
		delete gameScene.playerTeam.fighters[index];
		try{ gameScene.playerTeam.fighters.forEach(function(fighter){fighter.sprite.visible=false;})}catch(e){};

		delete buttons[index];
		console.log()
		gameScene.currentFighter.scrollFactorX=0;
		index=Phaser.Math.Between(1,4);
		gameScene.iaFighter= gameScene.iaTeam.fighters[index];
		delete gameScene.iaTeam.fighters[index];
		gameScene.fixCamPoint=SPAWN_PLAYER;
		gameScene.movingCamera = true;
		gameScene.currentFighter.sprite.anims.play('walk',true);
		gameScene.iaFighter.sprite.anims.play('walk',true);
		gameScene.gameState='FIGHT';
		gameScene.selectFighter_txt.forEach(function(f){f.visible=false;});

		
		
	}

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
}
function goTo_selection(){
	buttons.forEach(function (button) {
		if (button != null) {
			button.disableInteractive();
		}
	});
	gameScene.fixCamPoint=600;
}
function goTo_queen(){gameScene.fixCamPoint=1600;}