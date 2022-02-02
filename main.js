
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
SPAWN_PLAYER = 1200;
SPAWN_ENEMY = 1600;
CAM_SELECTION=600;
CAM_FIGHT=1200;
CAM_ENEMYQUEEN=1800;
_gameState = ['MENU', 'PAUSE', 'SELECTFIGHTER', 'COUNTDOWN', 'FIGHT', 'FIGHTQUEEN', 'GAMEOVER'];

const gameStateManager = {
	currentState: 0,
	getCurrentState: function () {
		return _gameState[this.currentState]
	},
	setCurrentState: function (state) {
		try {
			this.currentState = _gameState.indexOf(state);
		} catch (e) {
			console.log('ERR_ state send not recognized:' + state + '\n' + e)
		}
	},
	next: function () {
		this.currentState+=1;
		if(this.currentState>=values.length()){this.currentState=0;}
	},
	update(){
	}
};

/*
 *  PHASER GAME CONFIGURATION
*/

const config = {
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
			gravity: {y: 200},
			debug: true
		}
	},
	scene: [loaderScene, menuScene, gameScene, uiscene]
};
game = new Phaser.Game(config); // <--- main game object, it has the scenes, more known as "this"