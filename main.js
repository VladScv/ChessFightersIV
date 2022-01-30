
/*
                                      
 8 8888 `8.`888b           ,8'               ,o888888o.          .8.                   ,8.       ,8.          8 8888888888     d888888o.   
 8 8888  `8.`888b         ,8'               8888     `88.       .888.                 ,888.     ,888.         8 8888         .`8888:' `88. 
 8 8888   `8.`888b       ,8'             ,8 8888       `8.     :88888.               .`8888.   .`8888.        8 8888         8.`8888.   Y8 
 8 8888    `8.`888b     ,8'              88 8888              . `88888.             ,8.`8888. ,8.`8888.       8 8888         `8.`8888.     
 8 8888     `8.`888b   ,8'               88 8888             .8. `88888.           ,8'8.`8888,8^8.`8888.      8 888888888888  `8.`8888.    
 8 8888      `8.`888b ,8'                88 8888            .8`8. `88888.         ,8' `8.`8888' `8.`8888.     8 8888           `8.`8888.   
 8 8888       `8.`888b8'                 88 8888   8888888 .8' `8. `88888.       ,8'   `8.`88'   `8.`8888.    8 8888            `8.`8888.  
 8 8888        `8.`888'                  `8 8888       .8'.8'   `8. `88888.     ,8'     `8.`'     `8.`8888.   8 8888        8b   `8.`8888. 
 8 8888   .8.   `8.`8'   .8.                8888     ,88'.888888888. `88888.   ,8'       `8        `8.`8888.  8 8888        `8b.  ;8.`8888 
 8 8888   `8'    `8.`    `8'                 `8888888P' .8'       `8. `88888. ,8'         `         `8.`8888. 8 888888888888 `Y8888P ,88P' 

																												_ _  _ _  _/ _ 
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /)/ (-_) (-/)/_) . . .
																											/
 @@@@@@@  @@@  @@@  @@@@@@@@   @@@@@@    @@@@@@      @@@@@@@@  @@@   @@@@@@@@  @@@  @@@  @@@@@@@  @@@@@@@@  @@@@@@@    @@@@@@   @@@  
@@@@@@@@  @@@  @@@  @@@@@@@@  @@@@@@@   @@@@@@@      @@@@@@@@  @@@  @@@@@@@@@  @@@  @@@  @@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@   @@@  
!@@       @@!  @@@  @@!       !@@       !@@          @@!       @@!  !@@        @@!  @@@    @@!    @@!       @@!  @@@  !@@       @@!  
!@!       !@!  @!@  !@!       !@!       !@!          !@!       !@!  !@!        !@!  @!@    !@!    !@!       !@!  @!@  !@!       !@   
!@!       @!@!@!@!  @!!!:!    !!@@!!    !!@@!!       @!!!:!    !!@  !@! @!@!@  @!@!@!@!    @!!    @!!!:!    @!@!!@!   !!@@!!    @!@  
!!!       !!!@!!!!  !!!!!:     !!@!!!    !!@!!!      !!!!!:    !!!  !!! !!@!!  !!!@!!!!    !!!    !!!!!:    !!@!@!     !!@!!!   !!!  
:!!       !!:  !!!  !!:            !:!       !:!     !!:       !!:  :!!   !!:  !!:  !!!    !!:    !!:       !!: :!!        !:!       
:!:       :!:  !:!  :!:           !:!       !:!      :!:       :!:  :!:   !::  :!:  !:!    :!:    :!:       :!:  !:!      !:!   :!:  
 ::: :::  ::   :::   :: ::::  :::: ::   :::: ::       ::        ::   ::: ::::  ::   :::     ::     :: ::::  ::   :::  :::: ::    ::  
 :: :: :   :   : :  : :: ::   :: : :    :: : :        :        :     :: :: :    :   : :     :     : :: ::    :   : :  :: : :    :::  
                                                                                                                                     
	#               #            ########## ##########         #       ######        #              #      #                          ########## ### 
##########         #  ########## #        # #        #    ##########     #          #              #    #######  ########## ######### #        # ### 
#        #    #   #           #          #          #         #    # ##########    #          #   #      # #             #  #       #         #  ### 
       ##      # #           #          #          #          #    #     #        #            # #       # #            #   #       #        #    #  
     ##         #         # #          #          #          #     #     #       #     #        #     ##########     # #    #       #       #        
   ##         ## #         #         ##         ##          #   # #      #      #########     ## #         #          #     #########     ##     ### 
 ##         ##    #         #      ##         ##           #     #        ####           #  ##    #        #           #                ##       ### 
                                                                                                                                                     
    ..................................................... _____ __  __  ___    __ _____ _____          __   __
  __ _  ___ ____/ /__   _    __(_) /_/ /   xxxxxxxxxx     ||_// ||==|| ||=||  ((  ||==  ||_//          ||  ((       xxxxxxxxxxxxxx
 /  ' \/ _ `/ _  / -_) | |/|/ / / __/ _ \      xxxxxxxxxx ||    ||  || || || \_)) ||___ || \\    || |__|| \_)) xxxxxxxxxxxxx
/_/_/_/\_,_/\_,_/\__/  |__,__/_/\__/_//_/           xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/
//CONST
var SPAWN_PLAYER = 1200;
var SPAWN_ENEMY = 1600;


 //SCENE CONFIGURATIONS:

var loaderScene = {
	key: 'loader',
	active: true,
	preload: bootLoader,
	create: bootCreate
};

var menuScene = {
	key: 'menu',
	active: false,
	visible: false,
	
	preload: menuLoad,
	create: menuCreate,
	update: menuUpdate
};


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

/*
 *  PHASER GAME CONFIGURATION
*/

var config = {
	type: Phaser.AUTO,
	scale: {
        mode: Phaser.Scale.FIT, 
		autoCenter: Phaser.Scale.BOTH,
        width: 1200,
        height: 740
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		}
	},
	scene: [loaderScene, menuScene, gameScene]
};
var game = new Phaser.Game(config); // <--- main game object, it have the scenes, more known as "this"






//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX LOADER SCENE XXXXXXXXXXXXXXXX
/*		██████   ██████   ██████  ████████     ██       ██████   █████  ██████  ███████ ██████..................
		██   ██ ██    ██ ██    ██    ██        ██      ██    ██ ██   ██ ██   ██ ██      ██   ██.................
		██████  ██    ██ ██    ██    ██        ██      ██    ██ ███████ ██   ██ █████   ██████..................
		██   ██ ██    ██ ██    ██    ██        ██      ██    ██ ██   ██ ██   ██ ██      ██   ██.................
		██████   ██████   ██████     ██        ███████  ██████  ██   ██ ██████  ███████ ██   ██.................
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

//-------------------------------------------------------------------------- LOAD FIRST ASSETS
function bootLoader() {
	//first load, loads all assets
	this.load.image('sky', 'assets/sky.png');
	this.load.image('space', 'assets/space3.png');
	this.load.image('logo', 'phaser3-logo.png');
	this.load.image('redp', 'assets/redp.png');
	//for loop with white/black and fighterType values

	this.load.spritesheet('ROOK_white_idle','assets/ROOK_white_idle.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_walk','assets/ROOK_white_walk.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_attack1','assets/ROOK_white_attack1.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_attack2','assets/ROOK_white_attack2.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_defense','assets/ROOK_white_defense.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.spritesheet('ROOK_white_hit','assets/ROOK_white_hit.png',{ frameWidth: 512, frameHeight: 383 });
	this.load.image('bg','assets/black_bg.png');
	this.load.image('logicFloor','assets/logicFloor.png');
	this.load.image('select_btn','assets/selectButton.png');
	this.load.image('blackTeam_btn','assets/selectTeam_black.png');
	this.load.image('blackTeam_btn_on','assets/selectTeam_black_on.png');
	this.load.image('whiteTeam_btn','assets/selectTeam_white.png');
	this.load.image('whiteTeam_btn_on','assets/selectTeam_white_on.png');
	this.load.spritesheet('_countdown','assets/countdown.png',{ frameWidth: 50, frameHeight: 50 });
	//-----------------------------------------------------------------------loading screen
	//LOAD SECUENTIALIMAGES
	for (var i = 0; i < 5; i++) {
		this.load.image('logo'+i, 'phaser3-logo.png');
	}

	//Create loading bar boxes
	let progressBox = this.add.graphics();
	progressBox.fillStyle(0x222222, 0.8);
	progressBox.fillRect(440, 320, 320, 50);
	var progressBar = this.add.graphics();
	var width = this.cameras.main.width;
	var height = this.cameras.main.height;

	var loadingText = this.make.text({
		x: width / 2,
		y: height / 2 - 80,
		text: 'Loading...',
		style: {
			font: '20px monospace',
			fill: '#ffffff'
	}
	});
	loadingText.setOrigin(0.5, 0.5);

	var percentText = this.make.text({
		x: width / 2,
		y: height / 2 + 10,
		text: '0%',
		style: {
			font: '18px monospace',
			fill: '#ffffff'
		}
	});
	percentText.setOrigin(0.5, 0.5);

	var fileText = this.make.text({
		x: width / 2,
		y: height / 2 + 80,
		text: 'please wait... ',
		style: {
			font: '14px monospace',
			fill: '#ffffff'
		}
	});
	fileText.setOrigin(0.5, 0.5);
	
	this.load.on('progress', function (value) {
		progressBar.clear();
		progressBar.fillStyle(0xffffff, 1);
		progressBar.fillRect(450, 330, 300 * value, 30);
		percentText.setText(parseInt(value * 100) + '%');
	});
				
	this.load.on('fileprogress', function (file) {
		fileText.setText('loading file:'+ file.src);
	});

	this.load.on('complete', function () {
		//SHOW SPLASH SCREEN
		progressBar.destroy();
		progressBox.destroy();
		loadingText.destroy();
		percentText.destroy();
		fileText.destroy();
		
	});
}


//-------------------------------------------------------------------------- SPLASH SCREEN
function bootCreate() {
	var loadImage = this.add.image(0, 0, 'space').setOrigin(0); //Background
	var particles = this.add.particles('redp'); //particles stuff
	var emitter = particles.createEmitter({
		speed: 100,
		scale: { start: 1, end: 0 },
		blendMode: 'ADD'
	});

	var logo = this.physics.add.image(400, 100, 'logo');
	var clickText = this.make.text({
		x: 1200 / 2,
		y: 740-740 / 5 ,
		text: 'click to start',
		style: {
			font: '26px monospace',
			fill: '#ffffff'
		}
	});
	clickText.setOrigin(0.5, 0.5);

	logo.setVelocity(100, 200);
	logo.setBounce(1, 1);
	logo.setCollideWorldBounds(true);

	emitter.startFollow(logo);


	//ADD A 'CLICK TO START'
	this.input.once(Phaser.Input.Events.POINTER_DOWN, function () {
		//this.children.removeAll(); not necessary, it cleans screen when changing SCENE
		//coz we use "start" function, otherwise, "launch" will start a new scene WITH current scene
		this.scene.start('menu');
	}, this); // <-- "this" means scope = game
}




//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX MENU SCENE XXXXXXXXXXXXXXXXXX
/*		███    ███ ███████ ███    ██ ██    ██     ███████  ██████ ███████ ███    ██ ███████......................
		████  ████ ██      ████   ██ ██    ██     ██      ██      ██      ████   ██ ██...........................
		██ ████ ██ █████   ██ ██  ██ ██    ██     ███████ ██      █████   ██ ██  ██ █████........................
		██  ██  ██ ██      ██  ██ ██ ██    ██          ██ ██      ██      ██  ██ ██ ██...........................
		██      ██ ███████ ██   ████  ██████      ███████  ██████ ███████ ██   ████ ███████......................
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function menuLoad() {
	//-------------------------------------------------------------load more stuff
	this.add.image( 0,  this.cameras.main.height/2, 'bg').setOrigin(0,0.5);

}
function menuCreate() {
	//--------------------------------------------------------------construct menu
//MENU WILL BE THE TEAM SELECTION SCREEN
	var blackTeam_btn = this.add.image(0,  0, 'blackTeam_btn').setOrigin(0);
	var whiteTeam_btn = this.add.image(this.cameras.main.width/2,  0, 'whiteTeam_btn').setOrigin(0);

	blackTeam_btn.setInteractive();
		blackTeam_btn.on('pointerdown', function () {
			gameScene.playerColor = BLACK;
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