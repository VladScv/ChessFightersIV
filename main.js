
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
	this.load.image('blackTeam_btn','assets/selectTeam_black.png');
	this.load.image('blackTeam_btn_on','assets/selectTeam_black_on.png');
	this.load.image('whiteTeam_btn','assets/selectTeam_white.png');
	this.load.image('whiteTeam_btn_on','assets/selectTeam_white_on.png');
	//-----------------------------------------------------------------------loading screen
	//LOAD SECUENTIALIMAGES
	for (var i = 0; i < 50; i++) {
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



function preload() {
	this.gameState ='SELECTFIGHTER';
	gameScene.background = this.add.image( 0,  this.cameras.main.height/2, 'bg').setOrigin(0,0.5);
	if(game.playerColor===WHITE){background.flipX=true;}
	this.input.keyboard.on('keydown-SPACE', function() { gameScene.movingCamera = true;},this);
	this.input.keyboard.on('keyup-SPACE', function() { gameScene.movingCamera = false;},this);
}

function create() {
//--------------------------------------------------------------Create Screen text
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
		fighter.sprite=  this.physics.add.sprite(100+i*150, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);;
        fighter.sprite.setBounce(0.15);
		this.physics.add.collider(fighter.sprite, floor);
		keyName='ROOK';
		fighter.sprite.body.setGravityY(300)
		fighter.sprite.setSize(100,200,true)
		createAnimations('ROOK',WHITE);
		
		fighter.sprite.anims.play('idle',false);
		fighter.sprite.fighterIndex=i;
		fighter.sprite.setInteractive();
		fighter.sprite.on('pointerdown', function() { // cambiar por un carrusel con los cursores
			activateFighter(true,this.fighterIndex);
			console.log(this.fighterIndex);
		})
		
		gameScene.playerTeam.fighters[i]=fighter;
	 }
	 gameScene.iaTeam = new FighterTeam(!gameScene.playerColor,gameScene);
	 for(i=0; i<fighterType.length;i++){
		let keyName=fighterType[i];
		let colorName= ((!game.playerColor)? 'white':'black')
	 	let fighter= new Fighter(fighterType[i],gameScene.iaTeam,gameScene,!game.playerColor);
	 	fighter.sprite=  this.physics.add.sprite(2400-100*i, 100,'ROOK_white_idle' ).setOrigin(0.5,0.5);
        fighter.sprite.setBounce(0.15);
		keyName="ROOK"
		this.physics.add.collider(fighter.sprite, floor);
		fighter.sprite.body.setGravityY(300)
		fighter.sprite.setSize(100,200,true)
		createAnimations('ROOK',WHITE);
	 	gameScene.iaTeam.fighters[i]=fighter;

	 }
}

function update() {
	if(gameScene.movingCamera){
		moveMainCamera_to(this.cameras.main,1800,10);
	}
	processInput();
}


//------------------------------------------------------------------INPUT MANAGEMENT

function processInput(){ 
	if(gameScene.currentFighter!=null){
		let fighter = gameScene.currentFighter;
		if (gameScene.inputKeys.cursors.left.isDown) {
			if(fighter.sprite.body.velocity.x>(-180-(fighter.speed*10))){fighter.sprite.body.velocity.x-=20}
			else{fighter.sprite.body.velocity.x=-200-(fighter.speed*10)}
			fighter.sprite.anims.play('walk',true);
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
			
			fighter.sprite.anims.play('attack1',true);
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
	}else{
		gameScene.currentFighter= gameScene.iaTeam.fighters[index];
		delete gameScene.iaTeam.fighters[index];
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
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_attack2', {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12]}),
		frameRate: 12,
		repeat: 0,
	});
	game.anims.create({
		key: 'defense',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_defense', {frames:[0,1,2,3,4,5]}),
		frameRate: 12,
		repeat: 0,
	});
	game.anims.create({
		key: 'hit',
		frames: game.anims.generateFrameNumbers(keyName +'_'+colorName+ '_hit', {frames:[0,1,2,3,4,5,6,7,8]}),
		frameRate: 12,
		repeat: 0,
	});
}

//------------------------------------------------------------------UTILS
function moveMainCamera_to(camera,xPoint,speed){ 	
	if (camera.midPoint.x<xPoint){
		camera.scrollX+=speed;
	}else{
		movingCamera=false;
	}
}