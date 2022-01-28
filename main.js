
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

const ASSETSLIST= [];


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
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
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
	//-----------------------------------------------------------------------loading screen
	//LOAD SECUENTIALIMAGES
	for (var i = 0; i < 500; i++) {
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
	
	
	this.load.on('progress', function (value) {
		progressBar.clear();
		progressBar.fillStyle(0xffffff, 1);
		progressBar.fillRect(250, 280, 300 * value, 30);
	});
				
	this.load.on('fileprogress', function (file) {
		console.log(file.src);
	});
	this.load.on('complete', function () {
		//SHOW SPLASH SCREEN
		progressBar.destroy();
		progressBox.destroy();
		
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
	this.add.image(400, 300, 'sky');
	this.load.image('ground', 'assets/platform.png');
	this.load.image('star', 'assets/star.png');
	this.load.image('bomb', 'assets/bomb.png');
	this.load.spritesheet('dude',
		'assets/dude.png',
		{ frameWidth: 32, frameHeight: 48 }
	);

    this.load.tilemapTiledJSON('map', 'tiled/Tiles/simpleMap.json');
}
function menuCreate() {
	//--------------------------------------------------------------construct menu
	txt = 'START!';
//MENU WILL BE THE TEAM SELECTION SCREEN
	var startButton = this.add.text(120, 250, txt, { fontSize: '64px', fill: '#ffffff' });
	startButton.setInteractive();
		startButton.on('pointerup', function () {
			game.scene.run('game');//run works as "resume" or "start" depending on current scene state
			game.scene.sleep('menu');
		},this);
	startButton.on('pointerover', () => { startButton.text="Goooooo!"; });
	startButton.on('pointerout', () => { startButton.text = txt });
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
	//this.children.removeAll();
}

function create() {
	

	//CHARACTER
	/*player = this.physics.add.sprite(100, 450, 'dude');

	player.setBounce(0.1);
	player.setCollideWorldBounds(true);
	player.body.setGravityY(300)
	this.physics.add.collider(player, platforms);
	
	//CREATE ANIMATIONS
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key: 'turn',
		frames: [{ key: 'dude', frame: 4 }],
		frameRate: 20
	});

	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
		frameRate: 10,
		repeat: -1
	});
	*/

	//CURSORS saves the cursor keys to check them

	cursors = this.input.keyboard.createCursorKeys();

	keyPause = this.input.keyboard.addKey('P');  // Get key P object



	//STARS with auto replicant method

	stars = this.physics.add.group({
		key: 'star',
		repeat: 11,
		setXY: { x: 12, y: 0, stepX: 70 }
	});

	stars.children.iterate(function (child) {

		child.setBounceY(Phaser.Math.FloatBetween(0.4, 1));

	});
	this.physics.add.collider(stars, platforms);
	this.physics.add.overlap(player, stars, collectStar, null, this);

	//SCORE
	scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	this.add.text(16, 50, 'P: pause', { fontSize: '32px', fill: '#000' });
	var score = 0;
	var scoreText;

	function collectStar(player, star) {
		star.disableBody(true, true);
		score += 10;
		scoreText.setText('Score: ' + score);

	}
}

function update() {

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

