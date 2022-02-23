var map1 = new Phaser.Class({            //initalizes and creates the scene for map1
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "map1"
        });
    },

    //Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
    preload: function() {
        var car = localStorage.getItem('car');          //variable for car that's used to assign the sprite to 
        this.load.image('player', car);                 //Sprite is being assigned to the player variable     
    },
  
    //Creates Anything When The Game Is Finished Preloading
    create: function() {
        currentmap = "map1"
        placevalue = 0;
        test56 = false;
        // corgi = this.sound.add("corgi", {
        //     loop: true
        // });
        // corgi.play();
        //Creates The Player
        player = this.physics.add.sprite(396, 3300, 'player');         //physics is added to player sprite 
        player.body.setMaxSpeed(500);              
        player.angle = -90;
        player.setBounce(0.2);                                       //when colliding with other objects with physics, player will bounce off of them 
        player.setCollideWorldBounds(false);

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
        }else{
        camera = this.cameras.main;
        camera.startFollow(player);
        };


        const tilemap1 = this.make.tilemap({                        //Constant tile map is initialized 
            key: 'tilemap1'                                         
        })

        const map1_pallet = tilemap1.addTilesetImage('map1_pallet', 'map1_pallet', 8, 8, 1, 2)  //The color values of the tile map are numbered so as to enable detection 


        BackLayer = tilemap1.createLayer('Back', map1_pallet)                  //This is the tilemap for the grass 
        TrackLayer = tilemap1.createLayer('Track', map1_pallet)                //This is the tilemap for the track 
        StartLine = tilemap1.createLayer('Start', map1_pallet)                   //This is the tilemap for the starting/finish line
        Check1 = tilemap1.createLayer('Check1', map1_pallet)                    //This is the tilemap for checkpoint 1
        Check2 = tilemap1.createLayer('Check2', map1_pallet)                    //This is the tilemap for checkpoint 2
        Check3 = tilemap1.createLayer('Check3', map1_pallet)                    //This is the tilemap for checkpoint 3
        BorderLayer = tilemap1.createLayer('Border', map1_pallet)               //This is the tilemap for the outside border
        //Defines Layers And Border Physics
        BorderLayer.setCollisionByProperty({                                   //Boundry detection is declared true. 
            collides: true
        })
        BackLayer.setCollisionByProperty({
            collides: true
        })

        //camera.setBounds(0, 0, xLimit, yLimit);
        this.physics.add.collider(player, BorderLayer);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //SPACEKEY TEST for leaderboard
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // test for exit game
        Timertext = this.add.text(0,0,"",{ fontFamily: 'Dogica' });
        timer = 0;
        timez = 0;
        clocks = 0; //seconds
        minutes = 0; //minutes 
        test3 = 0; // milliseconds
        timeon = false;
        testspeed = 0;
        Check1pass = true;
        Check2pass = true;
        Check3pass = true;
        LapCount = 0;
        spedkids = 0;
        accel = player.body.acceleration;
        FinalTime = 0; //Time that's displayed
        var SCORETime; //Final score time that's added to leaderboard
        const layer = this.add.layer();
        layer.add([player])
        if(twoPlayer == true){
        layer.add([player2]); 
        this.physics.add.collider(player2, BorderLayer);
        camera1.ignore(Timertext)
        }

        getTile = function(){
        player1tile = BackLayer.getTileAtWorldXY(player.x, player.y, true);
        p1StartTile = StartLine.getTileAtWorldXY(player.x, player.y, true);
        p1Check1tile = Check1.getTileAtWorldXY(player.x, player.y, true);
        p1Check2tile = Check2.getTileAtWorldXY(player.x, player.y, true);
        p1Check3tile = Check3.getTileAtWorldXY(player.x, player.y, true);
        if(twoPlayer == true){
        player2tile = BackLayer.getTileAtWorldXY(player2.x, player2.y, true);
        p2StartTile = StartLine.getTileAtWorldXY(player2.x, player2.y, true);
        p2Check1tile = Check1.getTileAtWorldXY(player2.x, player2.y, true);
        p2Check2tile = Check2.getTileAtWorldXY(player2.x, player2.y, true);
        p2Check3tile = Check3.getTileAtWorldXY(player2.x, player2.y, true);
        }
        }
    },
  
    update: function() {

        getTile();
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
        } else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        }
        //this slows down the car in grass 
        if (player1tile.index == 4 || player1tile.index == 5 || player1tile.index == 6 || player1tile.index == 7 || player1tile.index == 8 || player1tile.index == 9) {
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
 } else {
     player2.setAcceleration(0);
     player2.body.drag.x = 160;
     player2.body.drag.y = 160;
     this.physics.velocityFromRotation(player2.rotation, player2.body.speed, player2.body.velocity);
 }
 //this slows down the car in grass 
 if (player2tile.index == 4 || player2tile.index == 5 || player2tile.index == 6 || player2tile.index == 7 || player2tile.index == 8 || player2tile.index == 9) {
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
        if(timeon == true){
            while (timer <= 100) { //The while loop infinitely counts up
                timer = timer + 1;
            }
        }
            if (timer >= 100) {
                timer = 0;
                timez = timez + 1;
            }
            if (timez >= 60) {
                timez = 0;
                clocks = clocks + 1;
            }
            if (clocks >= 60) {
                clocks = 0;
                minutes = minutes + 1;
            }
            test3 = (timez * 1.666666666666667).toFixed(0)
            if (minutes > 0) {
                FinalTime = minutes + "." + clocks + "." + test3;
            } else if (clocks > 0) {
                FinalTime = clocks + "." + test3;
            } else {
                FinalTime = test3;
            }
            LeaderTime = (minutes*60) + clocks + (test3/100);
       Timertext.setText(FinalTime);
       Timertext.x = player.x - 200;
       Timertext.y = player.y - 150;

       if (keyESC.isDown && localStorage.getItem('paused') == "0") {
        localStorage.setItem("paused", "1");
        this.scene.pause();
        this.scene.launch("pauseMenu");
    } 

        if(twoPlayer == true){
            if (p1Check1tile.index == 6 || p1Check1tile.index == 0 || p1Check1tile.index == 1 || p2Check1tile.index == 6 || p2Check1tile.index == 0 || p2Check1tile.index == 1) {
                if(Check1pass == false && Check2pass == false && Check3pass == false){
                    Check1pass = true;
                    console.log("Check 1 passed")
                }
            }
    
            if (p1Check2tile.index == 6 || p1Check2tile.index == 0 || p1Check2tile.index == 1 || p2Check2tile.index == 6 || p2Check2tile.index == 0 || p2Check2tile.index == 1) {
                if(Check1pass == true && Check2pass == false && Check3pass == false){
                    Check2pass = true;
                    console.log("Check 2 passed")
                }
            }
    
            if (p1Check3tile.index == 6 || p1Check3tile.index == 0 || p1Check3tile.index == 1 || p2Check3tile.index == 6 || p2Check3tile.index == 0 || p2Check3tile.index == 1) {
                if(Check1pass == true && Check2pass == true && Check3pass == false){
                    Check3pass = true;
                    console.log("Check 3 passed")
                }
            }
    
            if (p1StartTile.index == 9 || p1StartTile.index == 10 || p2StartTile.index == 9 || p2StartTile.index == 10) {
                if(LapCount == 0){
                    timeon = true
                    Check1pass = false;
                    Check2pass = false;
                    Check3pass = false;
                    LapCount = LapCount + 1;
                } else if(LapCount > 0 && LapCount < 3 && Check1pass == true && Check2pass == true && Check3pass == true){
                    Check1pass = false;
                    Check2pass = false;
                    Check3pass = false;
                    LapCount = LapCount + 1;
                    console.log(LapCount);
                } else if(LapCount == 3 && Check1pass == true && Check2pass == true && Check3pass == true){
                    Check1pass = false;
                    Check2pass = false;
                    Check3pass = false;
                    timeon = false
                    var map1leader = localStorage.getItem('map1leader');
                    map1leader = JSON.parse(map1leader);
                    map1leader = map1leader.slice(0, 5);
                    var map1leaderlist = localStorage.getItem('map1leaderlist');
                    map1leaderlist = JSON.parse(map1leaderlist);
                    map1leaderlist = map1leaderlist.slice(0, 5);
                    var done = false;
                    for(var i=0; i<5; i++){
                        if(done == false){
                        if(LeaderTime < map1leaderlist[i]){
                            map1leader.splice(i, 0, FinalTime);
                            map1leaderlist.splice(i, 0, LeaderTime);
                            localStorage.setItem('map1leaderlist', JSON.stringify(map1leaderlist));
                            localStorage.setItem('map1leader', JSON.stringify(map1leader));
                            placevalue = i+1;
                            this.scene.launch("LeaderBoardEnter");
                            this.scene.pause();
                            done = true;
                        } else if(map1leaderlist[i] == 0){
                            map1leader.splice(i, 0, FinalTime);
                            map1leaderlist.splice(i, 0, LeaderTime);
                            localStorage.setItem('map1leaderlist', JSON.stringify(map1leaderlist));
                            localStorage.setItem('map1leader', JSON.stringify(map1leader));
                            placevalue = i+1;
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
        if (p1Check1tile.index == 6 || p1Check1tile.index == 0 || p1Check1tile.index == 1) {
            if(Check1pass == false && Check2pass == false && Check3pass == false){
                Check1pass = true;
                console.log("Check 1 passed")
            }
        }

        if (p1Check2tile.index == 6 || p1Check2tile.index == 0 || p1Check2tile.index == 1) {
            if(Check1pass == true && Check2pass == false && Check3pass == false){
                Check2pass = true;
                console.log("Check 2 passed")
            }
        }

        if (p1Check3tile.index == 6 || p1Check3tile.index == 0 || p1Check3tile.index == 1) {
            if(Check1pass == true && Check2pass == true && Check3pass == false){
                Check3pass = true;
                console.log("Check 3 passed")
            }
        }

        if (p1StartTile.index == 9 || p1StartTile.index == 10) {
            if(LapCount == 0){
                timeon = true
                Check1pass = false;
                Check2pass = false;
                Check3pass = false;
                LapCount = LapCount + 1;
            } else if(LapCount > 0 && LapCount < 3 && Check1pass == true && Check2pass == true && Check3pass == true){
                Check1pass = false;
                Check2pass = false;
                Check3pass = false;
                LapCount = LapCount + 1;
                console.log(LapCount);
            } else if(LapCount == 3 && Check1pass == true && Check2pass == true && Check3pass == true){
                Check1pass = false;
                Check2pass = false;
                Check3pass = false;
                timeon = false
                var map1leader = localStorage.getItem('map1leader');
                map1leader = JSON.parse(map1leader);
                map1leader = map1leader.slice(0, 5);
                var map1leaderlist = localStorage.getItem('map1leaderlist');
                map1leaderlist = JSON.parse(map1leaderlist);
                map1leaderlist = map1leaderlist.slice(0, 5);
                var done = false;
                for(var i=0; i<5; i++){
                    if(done == false){
                    if(LeaderTime < map1leaderlist[i]){
                        map1leader.splice(i, 0, FinalTime);
                        map1leaderlist.splice(i, 0, LeaderTime);
                        localStorage.setItem('map1leaderlist', JSON.stringify(map1leaderlist));
                        localStorage.setItem('map1leader', JSON.stringify(map1leader));
                        placevalue = i+1;
                        this.scene.launch("LeaderBoardEnter");
                        this.scene.pause();
                        done = true;
                    } else if(map1leaderlist[i] == 0){
                        map1leader.splice(i, 0, FinalTime);
                        map1leaderlist.splice(i, 0, LeaderTime);
                        localStorage.setItem('map1leaderlist', JSON.stringify(map1leaderlist));
                        localStorage.setItem('map1leader', JSON.stringify(map1leader));
                        placevalue = i+1;
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
