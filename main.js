
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
	this.load.spritesheet('PAWN_walk','assets/pawn_walk.png',{ frameWidth: 341, frameHeight: 341 });
	this.load.image('bg','assets/black_bg.png');

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
	progressBox.fillRect(240, 270, 320, 50);
	var progressBar = this.add.graphics();
	var width = this.cameras.main.width;
	var height = this.cameras.main.height;

	var loadingText = this.make.text({
		x: width / 2,
		y: height / 2 - 50,
		text: 'Loading...',
		style: {
			font: '20px monospace',
			fill: '#ffffff'
	}
	});
	loadingText.setOrigin(0.5, 0.5);

	var percentText = this.make.text({
		x: width / 2,
		y: height / 2 - 5,
		text: '0%',
		style: {
			font: '18px monospace',
			fill: '#ffffff'
		}
	});
	percentText.setOrigin(0.5, 0.5);

	var fileText = this.make.text({
		x: width / 2,
		y: height / 2 + 50,
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
		progressBar.fillRect(250, 280, 300 * value, 30);
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

	this.add.text(250,500, 'click to start', { fontSize: '32px', fill: '#ffffff' });

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
	txt = 'START!';
//MENU WILL BE THE TEAM SELECTION SCREEN
	var blackTeam_btn = this.add.image(0,  0, 'blackTeam_btn').setOrigin(0);
	var whiteTeam_btn = this.add.image(this.cameras.main.width/2,  0, 'whiteTeam_btn').setOrigin(0);

	blackTeam_btn.setInteractive();
		blackTeam_btn.on('pointerdown', function () {
			game.playerColor = BLACK;
			game.scene.run('game');//run works as "resume" or "start" depending on current scene state
			game.scene.sleep('menu');
		},this);
	blackTeam_btn.on('pointerover', () => { blackTeam_btn= this.add.image(0,  0, 'blackTeam_btn_on').setOrigin(0)});
	blackTeam_btn.on('pointerout', () => { blackTeam_btn= this.add.image(0,  0, 'blackTeam_btn').setOrigin(0)});

	whiteTeam_btn.setInteractive();
		whiteTeam_btn.on('pointerdown', function () {
			game.playerColor = WHITE;
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

this.movingCamera=false;
function preload() {
	this.gameState ='SELECTFIGHTER';
	var background = this.add.image( 0,  this.cameras.main.height/2, 'bg').setOrigin(0,0.5);
	if(game.playerColor===WHITE){background.flipX=true;}
	this.input.keyboard.on('keydown-SPACE', function() { movingCamera = true;},this);
	this.input.keyboard.on('keyup-SPACE', function() { movingCamera = false;},this);
}

function create() {
	
	var titleText = this.make.text({
		x: this.cameras.main.width / 2,
		y: 50,
		text: 'Press SPACE to move camera',
		style: {
			font: '28px monospace',
			fill: '#ffffff'
	}
	});
	
	titleText.setOrigin(0.5, 0.5);
	cursors = this.input.keyboard.createCursorKeys();
	keyPause = this.input.keyboard.addKey('P');  // Get key P object

}

function update() {
	if(movingCamera){
		moveMainCamera_to(this.cameras.main,1800,1);
	}

}



function processInput(){ 
	if (cursors.left.isDown) {
		player.setVelocityX(-160);
		player.anims.play('left', true);
	}
	else if (cursors.right.isDown) {
		player.setVelocityX(160);
		player.anims.play('right', true);
	}
	else {
		player.setVelocityX(0);
		player.anims.play('turn');
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.setVelocityY(-630);
	}
	if (keyPause.isDown) {
		this.scene.sleep();
		this.scene.run('menu');
		txt='Continue...';

	}
}

function moveMainCamera_to(camera,xPoint,speed){ 	
	if (camera.midPoint.x<xPoint){
		camera.scrollX+=10;
	}else{movingCamera=false;}
}