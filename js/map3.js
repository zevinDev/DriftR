var map3 = new Phaser.Class({            //initalizes and creates the scene for map1
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "map3"
        });
    },

    //Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
    preload: function() {
        var car = localStorage.getItem('car');          //variable for car that's used to assign the sprite to 
        this.load.image('player', car);                 //Sprite is being assigned to the player variable     
    },
  
    //Creates Anything When The Game Is Finished Preloading
    create: function() {
        currentMap = "map3"
        placeValue = 0;
        test56 = false;
        // corgi = this.sound.add("corgi", {
        //     loop: true
        // });
        // corgi.play();
        //Creates The Player
        player = this.physics.add.sprite(2375, 5533, 'player');         //physics is added to player sprite 
        player.body.setMaxSpeed(500);              
        player.angle = -180;
        player.setBounce(0.2);                                       //when colliding with other objects with physics, player will bounce off of them 
        player.setCollideWorldBounds(false);
        //extendedBackground = this.add.image(2048,2048, 'extendedBackground');

        //Sets Colliders And Bounce
        if(twoPlayer == true){
        player2 = this.physics.add.sprite(410, 3300, 'player2');   
        player2.setBounce(0.2);                                       //when colliding with other objects with physics, player will bounce off of them 
        player2.setCollideWorldBounds(false);  
        player2.body.setMaxSpeed(500);              
        player2.angle = -90;
        camera = this.cameras.main;
        camera.setSize(camera.width, (camera.height/2)-4); 
        camera.startFollow(player);
        var camera1 = this.cameras.add();
        camera1.setSize(camera1.width, (camera1.height/2)-4);
        camera1.setPosition(0,400);
        camera1.startFollow(player2);
        this.physics.add.collider(player, player2) 
        }else{
        camera = this.cameras.main;
        camera.startFollow(player);
        };


        const tilemap3 = this.make.tilemap({                        //Constant tile map is initialized 
            key: 'tilemap3'                                         
        })

        const map3_pallet = tilemap3.addTilesetImage('BusyBeach_Palette-Recovered-Recovered', 'map3_pallet', 8, 8, 1, 2) 
        const map3_pallet_obstruction = tilemap3.addTilesetImage('obstructionpallete', 'map3_pallet_obstruction', 8, 8, 1, 2) //The color values of the tile map are numbered so as to enable detection 


                 //This is the tilemap for the starting/finish line
        SlowDown = tilemap3.createLayer('SlowDown', map3_pallet) 
        Obstructions = tilemap3.createLayer('Obstructions', map3_pallet)
                 //This is the tilemap for checkpoint 1
        Road = tilemap3.createLayer('Road', map3_pallet)   
        StreetObstructions = tilemap3.createLayer('StreetObstructions', map3_pallet_obstruction)                    //This is the tilemap for checkpoint 2
                 //This is the tilemap for checkpoint 3
               //This is the tilemap for the outside border
        Finish_Start = tilemap3.createLayer('Finish/Start', map3_pallet)   
        CheckPoint3 = tilemap3.createLayer('CheckPoint3', map3_pallet)                  //This is the tilemap for the grass 
        CheckPoint2 = tilemap3.createLayer('CheckPoint2', map3_pallet)                //This is the tilemap for the track 
        CheckPoint1 = tilemap3.createLayer('CheckPoint1', map3_pallet)  


        Obstructions.setCollisionByProperty({                                   //Boundry detection is declared true. 
            collides: true
        })
        StreetObstructions.setCollisionByProperty({                                   //Boundry detection is declared true. 
            collides: true
        })
        //Defines Layers And Border Physics
        /*
        borderLayer.setCollisionByProperty({                                   //Boundry detection is declared true. 
            collides: true
        })
        backLayer.setCollisionByProperty({
            collides: true
        })
        */

        //camera.setBounds(0, 0, xLimit, yLimit);
        this.physics.add.collider(player, Obstructions);
        this.physics.add.collider(player, StreetObstructions);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //SPACEKEY TEST for leaderboard
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // test for exit game
        borderLayer = this.add.text(0,0,"",{ fontFamily: 'Dogica' });
        timer = 0;
        timez = 0;
        seconds = 0; //seconds
        minutes = 0; //minutes 
        milliseconds = 0; // milliseconds
        timerOn = false;
        testspeed = 0;
        check1Pass = true;
        check2Pass = true;
        check3Pass = true;
        lapCount = 0;
        spedkids = 0;
        accel = player.body.acceleration;
        finalTime = 0; //Time that's displayed
        var SCORETime; //Final score time that's added to leaderboard
        const layer = this.add.layer();
        layer.add([player])
        if(twoPlayer == true){
        layer.add([player2]); 
        this.physics.add.collider(player2, borderLayer);
        camera1.ignore(borderLayer)
        }
    },
  
    update: function() {

        getTile(currentMap, twoPlayer);
         player.setMaxVelocity(1000,1000);
        if (player.body.speed > 15 && (keyLEFT.isDown)) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed > 15 && (keyRIGHT.isDown)) {
            player.setAngularVelocity(150);
        } else {
            player.setAngularVelocity(0);
        }
        if (keyUP.isDown) {
            this.physics.velocityFromRotation(player.rotation, 700, player.body.acceleration);
        } else if (player.body.speed > 400){
            this.physics.velocityFromRotation(player.rotation, (player.body.speed- 75), player.body.velocity);
        }else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        }
        //this slows down the car in grass 
        
        if (p1Tile.index == 47 || p1Tile.index == 48 || p1Tile.index == 49 || p1Tile.index == 50 || p1Tile.index == 41 || p1Tile.index == 42 || p1Tile.index == 43 || p1Tile.index == 44) {
            player.setMaxVelocity(100,100); //Player cannot accelerate past 100
            player.setAcceleration(0); 
            if (player.body.speed > 15 && (keyLEFT.isDown)) {
                player.setAngularVelocity(-50);
            } else if (player.body.speed > 15 && (keyRIGHT.isDown)) {
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
        
 //player2's movement
 if(twoPlayer == true){
 player2.setMaxVelocity(1000,1000);
 if (player2.body.speed > 15 && (keyA.isDown)) {
     player2.setAngularVelocity(-150);
 } else if (player2.body.speed > 15 && (keyD.isDown)) {
     player2.setAngularVelocity(150);
 } else {
     player2.setAngularVelocity(0);
 }
 if (keyW.isDown) {
     this.physics.velocityFromRotation(player2.rotation, 700, player2.body.acceleration);
 } else if (player2.body.speed > 400){
            this.physics.velocityFromRotation(player2.rotation, (player2.body.speed- 75), player2.body.velocity);
  }else {
     player2.setAcceleration(0);
     player2.body.drag.x = 160;
     player2.body.drag.y = 160;
     this.physics.velocityFromRotation(player2.rotation, player2.body.speed, player2.body.velocity);
 }
 //this slows down the car in grass 
 if (p2Tile.index == 47 || p2Tile.index == 48 || p2Tile.index == 49 || p2Tile.index == 50 || p2Tile.index == 41 || p2Tile.index == 42 || p2Tile.index == 43 || p2Tile.index == 44) {
     player2.setMaxVelocity(100,100); //Player cannot accelerate past 100
     player2.setAcceleration(0); 
     if (player2.body.speed > 15 && (keyA.isDown)) {
         player2.setAngularVelocity(-50);
     } else if (player2.body.speed > 15 && (keyD.isDown)) {
         player2.setAngularVelocity(50);
     } else {
         player2.setAngularVelocity(0);
     }
     if (keyW.isDown) {
         this.physics.velocityFromRotation(player2.rotation, 100, player2.body.velocity);
     } else {
         player2.setAcceleration(0);
         player2.body.drag.x = 300;
         player2.body.drag.y = 300;
         this.physics.velocityFromRotation(player2.rotation, player2.body.speed, player2.body.velocity);
     }
 }
 }
        //This is the code for the timer function
        if(timerOn == true){
            while (timer <= 100) { //The while loop infinitely counts up
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
            if (seconds >= 60) {
                seconds = 00;
                minutes = minutes + 01;
            }
            milliseconds = (timez * 1.666666666666667).toFixed(0)
            if (minutes > 00) {
                finalTime = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + "." + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + "." + milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            } else if (seconds > 00) {
                finalTime = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + "." + milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            } else {
                finalTime = milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            }
            //minutes = minutes.toPrecision(2)
            //seconds = seconds.toPrecision(2)
            //milliseconds = milliseconds.toPrecision(2)
            LeaderTime = (minutes * 60) + seconds + (milliseconds / 100)
       borderLayer.setText(finalTime);
       borderLayer.x = player.x - 200;
       borderLayer.y = player.y - 150;

       if (keyESC.isDown && localStorage.getItem('paused') == "0") {
        localStorage.setItem("paused", "1");
        this.scene.pause();
        this.scene.launch("pauseMenu");
    } 
        if(twoPlayer == true){
            if (p1Check1Tile.index == 23 || p2Check1Tile.index == 23) {
                if(check1Pass == false && check2Pass == false && check3Pass == false){
                    check1Pass = true;
                }
            }
    
            if (p1Check2Tile.index == 23 || p2Check2Tile.index == 23) {
                if(check1Pass == true && check2Pass == false && check3Pass == false){
                    check2Pass = true;
                }
            }
    
            if (p1Check3Tile.index == 23 || p2Check3Tile.index == 23) {
                if(check1Pass == true && check2Pass == true && check3Pass == false){
                    check3Pass = true;
                }
            }
    
            if (p1StartTile.index == 37 || p1StartTile.index == 36 || p2StartTile.index == 37 || p2StartTile.index == 36) {
                if(lapCount == 0){
                    timerOn = true
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    lapCount = lapCount + 1;
                } else if(check1Pass == true && check2Pass == true && check3Pass == true){
                    check1Pass = false;
                    check2Pass = false;
                    check3Pass = false;
                    timerOn = false
                    var map3leader = localStorage.getItem('map3leader');
                    map3leader = JSON.parse(map3leader);
                    map3leader = map3leader.slice(0, 5);
                    var map3leaderlist = localStorage.getItem('map3leaderlist');
                    map3leaderlist = JSON.parse(map3leaderlist);
                    map3leaderlist = map3leaderlist.slice(0, 5);
                    var done = false;
                    for(var i=0; i<5; i++){
                        if(done == false){
                        if(LeaderTime < map3leaderlist[i]){
                            map3leader.splice(i, 0, finalTime);
                            map3leaderlist.splice(i, 0, LeaderTime);
                            localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
                            localStorage.setItem('map3leader', JSON.stringify(map3leader));
                            placeValue = i+1;
                            this.scene.launch("LeaderBoardEnter");
                            this.scene.pause();
                            done = true;
                        } else if(map3leaderlist[i] == 0){
                            map3leader.splice(i, 0, finalTime);
                            map3leaderlist.splice(i, 0, LeaderTime);
                            localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
                            localStorage.setItem('map3leader', JSON.stringify(map3leader));
                            placeValue = i+1;
                            this.scene.launch("LeaderBoardEnter");
                            this.scene.pause();
                            done = true;
                        }
                        }
                    }
                    if(done != true){
                        this.scene.launch("lapsComplete");
                        this.scene.pause();
                    }
                }  
            }
        }else{
        if (p1Check1Tile.index == 23) {
            if(check1Pass == false && check2Pass == false && check3Pass == false){
                check1Pass = true;
            }
        }

        if (p1Check2Tile.index == 23) {
            if(check1Pass == true && check2Pass == false && check3Pass == false){
                check2Pass = true;
            }
        }

        if (p1Check3Tile.index == 23) {
            if(check1Pass == true && check2Pass == true && check3Pass == false){
                check3Pass = true;
            }
        }

        if (p1StartTile.index == 37 || p1StartTile.index == 36) {
            if(lapCount == 0){
                timerOn = true
                check1Pass = false;
                check2Pass = false;
                check3Pass = false;
                lapCount = lapCount + 1;
            } else if(check1Pass == true && check2Pass == true && check3Pass == true){
                check1Pass = false;
                check2Pass = false;
                check3Pass = false;
                timerOn = false
                var map3leader = localStorage.getItem('map3leader');
                map3leader = JSON.parse(map3leader);
                map3leader = map3leader.slice(0, 5);
                var map3leaderlist = localStorage.getItem('map3leaderlist');
                map3leaderlist = JSON.parse(map3leaderlist);
                map3leaderlist = map3leaderlist.slice(0, 5);
                var done = false;
                for(var i=0; i<5; i++){
                    if(done == false){
                    if(LeaderTime < map3leaderlist[i]){
                        map3leader.splice(i, 0, finalTime);
                        map3leaderlist.splice(i, 0, LeaderTime);
                        localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
                        localStorage.setItem('map3leader', JSON.stringify(map3leader));
                        placeValue = i+1;
                        this.scene.launch("LeaderBoardEnter");
                        this.scene.pause();
                        done = true;
                    } else if(map3leaderlist[i] == 0){
                        map3leader.splice(i, 0, finalTime);
                        map3leaderlist.splice(i, 0, LeaderTime);
                        localStorage.setItem('map3leaderlist', JSON.stringify(map3leaderlist));
                        localStorage.setItem('map3leader', JSON.stringify(map3leader));
                        placeValue = i+1;
                        this.scene.launch("LeaderBoardEnter");
                        this.scene.pause();
                        done = true;
                    }
                    }
                }
                if(done != true){
                    this.scene.launch("lapsComplete");
                    this.scene.pause();
                }
            }  
        }
    }
    
    }   
});
