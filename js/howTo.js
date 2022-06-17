var howTo = new Phaser.Class({            
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "howTo"
        });
    },
preload: function() {
    gamePaused = false;
    var car = localStorage.getItem('car');
    this.load.image('player', car);
    
    
},

create: function(){
        timer = 0;
        timez = 0;
        seconds = 0;
        milliseconds = 0;

    tutorialText = this.add.text(200, 200, "taggart upload the tilemap or else...", {
        fontFamily: 'Dogica',
        fontSize: '32px'
    });
    tutorialText.setVisible(false); 
tutorialText.setScrollFactor(0,0); 
    var buttonz = this.add.image(255, 600, 'start');
    buttonz.setScrollFactor(0, 0);
   buttonz.setInteractive(); 
    buttonz.on(pointerDown, () => {
     this.cameras.main.fadeOut(1000, 0, 0, 0)
     this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
         this.scene.start('menu')
         this.scene.stop();
     })
 })
    
    var continueButtonz = this.add.image(550, 600, 'backButton'); 
    continueButtonz.setScrollFactor(0, 0);
    continueButtonz.setInteractive(); 
    continueButtonz.on(pointerDown, () => {
        continueButtonz.setVisible(false);
        buttonz.setVisible(false); 
        
    })
    
     

    player = this.physics.add.sprite(375, 1500, 'player');
    player.body.setMaxSpeed(500);
    player.angle = -90;
    player.setBounce(0.2);
    

    camera = this.cameras.main;
    camera.startFollow(player);
    canMove = true;


    const TileTutorialMap = this.make.tilemap({
        key: 'TileTutorialMap'
    })

    //Assigns Images To TileMap
    const TutorialP = TileTutorialMap.addTilesetImage('TutorialP', 'TutorialP', 8, 8, 1, 2);

        MapLayer = TileTutorialMap.createLayer('GrassLayer', TutorialP)

        const layer = this.add.layer();
        layer.add([player, buttonz, continueButtonz, tutorialText]); 
        
        
        
        //Defines Keyboard Keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);      
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        
},

update: function(){
    var input = true; 
    
    
    if (keySPACE.isDown && seconds <= 3){
        tutorialText.setVisible(true); 
        input = false; 
        player.setAngularVelocity(0); 
        player.body.speed = 0; 
        player.body.drag.x = 5000;
        player.body.drag.y = 5000;
       if (player.body.speed > 0){
           player.body.speed = 0;
           console.log(player.body.speed);
       }
        timerEvent(); 
        console.log("seconds" + seconds); 
        
    }else{
        if (seconds >= 3 && keySPACE.isDown){
        input = true; 
        
        console.log("input is restored"); 
        }
        if (seconds >=3 && keySPACE.isUp){
            timer = 0;
            timez = 0;
            seconds = 0; 
            input = true; 
        }
        input = true; 
        tutorialText.setVisible(false); 
    }
    
    
        if (player.body.speed > 15 && (keyLEFT.isDown) && input == true) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed > 15 && (keyRIGHT.isDown) && input == true) {
            player.setAngularVelocity(150);
        } else {
            player.setAngularVelocity(0);
        }
        if (keyUP.isDown && player.body.speed < 516  && input == true) {
            this.physics.velocityFromRotation(player.rotation, 700, player.body.acceleration);
        } else if (player.body.speed > 400 && input == true) {
            this.physics.velocityFromRotation(player.rotation, (player.body.speed - 75), player.body.velocity);
        } else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        }
        }, 
});  
function timerEvent(){
    if (1 == 1) {
        while (timer <= 100) {
            timer = timer + 01;
        }
    }
    if (timer >= 100) {
        timer = 00;
        timez = timez + 01;
    }
    if (timez >= 60) {
        timez = 00;
        seconds = seconds + 01;
    }
    
}

