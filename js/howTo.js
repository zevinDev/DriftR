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
    player = this.physics.add.sprite(3200, 3377, 'player');
    player.body.setMaxSpeed(500);
    player.angle = -90;
    player.setBounce(0.2);
    

    camera = this.cameras.main;
    camera.startFollow(player);
    canMove = true;
   
   
    //code for the boostpad function
    var usedBoostPad1 = false;
        var boostpad1;


    boostpad1 = this.physics.add.sprite(5920, 2915, 'boostPad');
    this.anims.create({
        key: "boost",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("boostPad", {
            start: 0,
            end: 3
        }),
        repeat: -1
    });
    boostpad1.play("boost")
    boostpad1.setScale(.5);
    boostpad1.angle = 180;
    
    //Adds a boostpad to the map
           boostpads = this.add.group();
           boostpads.add(boostpad1);
   
           cars = this.add.group();
           cars.add(player);
           
   
           //Handles BoostPads and BoostPad Collision
           this.physics.add.overlap(cars, boostpads, function(user, boostpad) {
               if (boostpad == boostpad1 && usedBoostPad1 == false) {
                   usedBoostPad1 = true;
                   boostpad1.stop("boost");
                   boostpad1.setFrame(0);
                   user.body.setMaxSpeed(1000);
                   user.body.velocity.normalize()
                       .scale(1000);
                   setTimeout(function() {
                       user.body.setMaxSpeed(500);
                   }, 500);
               }
           });
    
    ranOnce = false;
    masSpeed = 500;     
    
    timer = 0;
        timez = 0;
        seconds = 0;
        milliseconds = 0;
    
    tutorialText = this.add.text(200, 200, "this is placeholder text lol", {
        fontFamily: 'Dogica',
        fontSize: '32px'
    });
    tutorialText.setVisible(false); 
tutorialText.setScrollFactor(0,0); 

tutorialText2 = this.add.text(200, 200, "Do you want to engage\n in the tutorial?", {
    fontFamily: 'Dogica',
    fontSize: '32px'
});
tutorialText2.setVisible(true); 
tutorialText2.setScrollFactor(0,0); 

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
        tutorialText2.setVisible(false);
    })
    
     

 


    const TileTutorialMap = this.make.tilemap({
        key: 'TileTutorialMap'
    })

    //Assigns Images To TileMap
    const TutorialP = TileTutorialMap.addTilesetImage('TutorialP', 'TutorialP', 8, 8, 1, 2);

        MapLayer = TileTutorialMap.createLayer('GrassLayer', TutorialP)

        

        const layer = this.add.layer();
        layer.add([boostpad1, player, buttonz, continueButtonz, tutorialText2, tutorialText]); 
        
        
        
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
        
        //Adds a boostpad to the map
           //Ads A BoostPad To The Map
           boostpads = this.add.group();
           boostpads.add(boostpad1);
   
           cars = this.add.group();
           cars.add(player);
           
   
           //Handles BoostPads and BoostPad Collision
           this.physics.add.overlap(cars, boostpads, function(user, boostpad) {
               if (boostpad == boostpad1 && usedBoostPad1 == false) {
                   usedBoostPad1 = true;
                   boostpad1.stop("boost");
                   boostpad1.setFrame(0);
                   user.body.setMaxSpeed(1000);
                   user.body.velocity.normalize()
                       .scale(1000);
                   setTimeout(function() {
                       user.body.setMaxSpeed(500);
                   }, 500);
               }
           });
    },

update: function(){
    var input = true; 
    p1Tile = MapLayer.getTileAtWorldXY(player.x, player.y, true);
    
    if (p1Tile.index == 30 && seconds <= 6){
        console.log(p1Tile.index); 
        textValue = "This is placeholder text lol"; 
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
        if (seconds >= 6 && p1Tile.index == 30){
        input = true; 
        
        console.log("input is restored"); 
        }
        if (seconds >=3 && p1Tile.index != 30){
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

        //in grass, the car is slowed down
        if (p1Tile.index == 10 || p1Tile.index == 9 || p1Tile.index == 26){
            
            if (player.body.speed > 300) {
                masSpeed = (masSpeed - 7)
            }
            ranOnce = true;
            player.body.setMaxSpeed(masSpeed)
            if (player.body.speed < 310) {
                if (player.body.speed > 15 && (keyLEFT.isDown )) {
                    player.setAngularVelocity(-50);
                } else if (player.body.speed > 15 && (keyRIGHT.isDown )) {
                    player.setAngularVelocity(50);
                } else {
                    player.setAngularVelocity(0);
                }
                if (keyUP.isDown) {
                    this.physics.velocityFromRotation(player.rotation, 100, player.body.velocity);
                } else {
                    player.setAcceleration(0);
                    player.body.drag.x = 300;
                    player.body.drag.y = 300;
                    this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
                }
            }
        } else {
            masSpeed = 500
            if (ranOnce == true) {
                player.body.setMaxSpeed(500);
                ranOnce = false;
            }
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


