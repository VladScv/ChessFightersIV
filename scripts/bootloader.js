

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX LOADER SCENE XXXXXXXXXXXXXXXX
/*		██████   ██████   ██████  ████████     ██       ██████   █████  ██████  ███████ ██████..................
		██   ██ ██    ██ ██    ██    ██        ██      ██    ██ ██   ██ ██   ██ ██      ██   ██.................
		██████  ██    ██ ██    ██    ██        ██      ██    ██ ███████ ██   ██ █████   ██████..................
		██   ██ ██    ██ ██    ██    ██        ██      ██    ██ ██   ██ ██   ██ ██      ██   ██.................
		██████   ██████   ██████     ██        ███████  ██████  ██   ██ ██████  ███████ ██   ██.................
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

class LoaderScene extends Phaser.Scene {
	constructor(manager) {
		super('loader');
		this.key= 'loader';
		this.active= true;
		this.gameManager=manager;
	}

//-------------------------------------------------------------------------- LOAD FIRST ASSETS
	preload() {
		this.load.image('sky', 'assets/sky.png');
		this.load.image('space', 'assets/space3.png');
		this.load.image('logo', 'assets/phaser3-logo.png');
		this.load.image('redp', 'assets/redp.png');
		this.load.image('bg','assets/black_bg.png');
		this.load.image('hitbox','assets/hitbox.png');
		this.load.image('logicFloor','assets/logicFloor.png');
		this.load.image('select_btn','assets/selectButton.png');
		this.load.image('blackTeam_btn','assets/selectTeam_black.png');
		this.load.image('blackTeam_btn_on','assets/selectTeam_black_on.png');
		this.load.image('whiteTeam_btn','assets/selectTeam_white.png');
		this.load.image('whiteTeam_btn_on','assets/selectTeam_white_on.png');
		this.load.image('pause','assets/pause.png');
		this.load.image('gameOver_white','assets/gameover_white.png');
		this.load.image('gameOver_black','assets/gameover_black.png');
		this.load.spritesheet('countdown','assets/countdown.png',{ frameWidth: 50, frameHeight: 50 });
		//-----------------------------------------------------------------------loading screen
		//LOAD SECUENTIALIMAGES
		for (let i = 0; i <_fighterType.length; i++) {
			let name= _fighterType[i];
			this.load.spritesheet(name+'_white_idle','assets/'+name+'_white_idle.png',{ frameWidth: 512, frameHeight: 383 });
			this.load.spritesheet(name+'_white_walk','assets/'+name+'_white_walk.png',{ frameWidth: 512, frameHeight: 383 });
			this.load.spritesheet(name+'_white_attack1','assets/'+name+'_white_attack1.png',{ frameWidth: 512, frameHeight: 383 });
			this.load.spritesheet(name+'_white_attack2','assets/'+name+'_white_attack2.png',{ frameWidth: 512, frameHeight: 383 });
			this.load.spritesheet(name+'_white_defense','assets/'+name+'_white_defense.png',{ frameWidth: 512, frameHeight: 383 });
			this.load.spritesheet(name+'_white_hit','assets/'+name+'_white_hit.png',{ frameWidth: 512, frameHeight: 383 });
		}
		//------------------------------------------Create loading bar boxes
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(440, 320, 320, 50);
		let progressBar = this.add.graphics();
		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		let loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 80,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
		}
		});
		loadingText.setOrigin(0.5, 0.5);
		let percentText = this.make.text({
			x: width / 2,
			y: height / 2 + 10,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		let fileText = this.make.text({
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
			percentText.setText(''+Math.floor(value * 100) + '%');
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
	create() {
		let loadImage = this.add.image(0, 0, 'space').setOrigin(0); //Background
		let particles = this.add.particles('redp'); //particles stuff
		let emitter = particles.createEmitter({
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD'
		});
		let logo = this.physics.add.image(400, 100, 'logo');
		let clickText = this.make.text({
			x: 1200 / 2,
			y: 740-740 / 5 ,
			text: 'click to start',
			style: {
				font: '26px monospace',
				fill: '#ffffff'
			}
		}).setOrigin(0.5, 0.5);
		logo.setVelocity(200, 500).setBounce(0.8, 0.8).setCollideWorldBounds(true);
		emitter.startFollow(logo);
		//ADD A 'CLICK TO START'
		this.input.once(Phaser.Input.Events.POINTER_DOWN, function () {
			loadImage.destroy();
			particles.destroy();
			logo.destroy();
			clickText.destroy();
			this.scene.start('menu',this.gameManager);
		}, this);
	}
}

