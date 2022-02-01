var map1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "map1"
        });
    },

    //Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
    preload: function() {

        var car = localStorage.getItem('car');
        this.load.image('player', car);
        this.load.spritesheet('ABC', 'assets/images/UI/nameselect.png', {
            frameWidth: 56,
            frameHeight: 60
        });
        //this.cameras.main.fadeIn(1000, 0, 0, 0)
        
    },
  
    //Creates Anything When The Game Is Finished Preloading
    create: function() {
        test56 = false;
        // corgi = this.sound.add("corgi", {
        //     loop: true
        // });
        // corgi.play();
        //Creates The Player
        player = this.physics.add.sprite(396, 3300, 'player');

        //Sets Colliders And Bounce
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //Defines Player MaxSpeed And Start Angle
        player.body.setMaxSpeed(500);
        player.angle = -90;

        //Creates Camera And Sets It To Follow Player
        camera = this.cameras.main;
        camera.startFollow(player);

        ABC1 = this.add.image(396,3300, "ABC");
        testvar5 = 0;
        test6 = true;

        const tilemap1 = this.make.tilemap({
            key: 'tilemap1'
        })

        const map1_pallet = tilemap1.addTilesetImage('map1_pallet', 'map1_pallet', 8, 8, 1, 2)


        BackLayer = tilemap1.createLayer('Back', map1_pallet)
        TrackLayer = tilemap1.createLayer('Track', map1_pallet)
        StartLine = tilemap1.createLayer('Start', map1_pallet)
        Check1 = tilemap1.createLayer('Check1', map1_pallet)
        Check2 = tilemap1.createLayer('Check2', map1_pallet)
        Check3 = tilemap1.createLayer('Check3', map1_pallet)
        BorderLayer = tilemap1.createLayer('Border', map1_pallet)
        //Defines Layers And Border Physics
        BorderLayer.setCollisionByProperty({
            collides: true
        })
        BackLayer.setCollisionByProperty({
            collides: true
        })
        const layer = this.add.layer();
        layer.add([player, ABC1])
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
        Timertext = this.add.text();
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


        getTile = function(){
        tile = BackLayer.getTileAtWorldXY(player.x, player.y, true);
        tile2 = StartLine.getTileAtWorldXY(player.x, player.y, true);
        Check1tile = Check1.getTileAtWorldXY(player.x, player.y, true);
        Check2tile = Check2.getTileAtWorldXY(player.x, player.y, true);
        Check3tile = Check3.getTileAtWorldXY(player.x, player.y, true);
        }

    },
  
    update: function() {

        getTile();
        
        player.setMaxVelocity(1000,1000);
        if (player.body.speed > 15 && (keyA.isDown || keyLEFT.isDown)) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed > 15 && (keyD.isDown || keyRIGHT.isDown)) {
            player.setAngularVelocity(150);
        } else {
            player.setAngularVelocity(0);
        }
        if (keyW.isDown || keyUP.isDown) {
            this.physics.velocityFromRotation(player.rotation, 700, player.body.acceleration);
        } else {
            player.setAcceleration(0);
            player.body.drag.x = 160;
            player.body.drag.y = 160;
            this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        }
        //this slows down the car in grass 
        if (tile.index == 4 || tile.index == 5 || tile.index == 6 || tile.index == 7 || tile.index == 8 || tile.index == 9) {
            player.setMaxVelocity(100,100); //Player cannot accelerate past 100
            player.setAcceleration(0); 
            if (player.body.speed > 15 && (keyA.isDown || keyLEFT.isDown)) {
                player.setAngularVelocity(-50);
            } else if (player.body.speed > 15 && (keyD.isDown || keyRIGHT.isDown)) {
                player.setAngularVelocity(50);
            } else {
                player.setAngularVelocity(0);
            }
            if (keyW.isDown || keyUP.isDown) {
                this.physics.velocityFromRotation(player.rotation, 100, player.body.velocity);
            } else {
                player.setAcceleration(0);
                player.body.drag.x = 300;
                player.body.drag.y = 300;
                this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
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
                FinalTime = minutes + ":" + clocks + ":" + test3;
            } else if (clocks > 0) {
                FinalTime = clocks + ":" + test3;
            } else {
                FinalTime = test3;
            }
       Timertext.setText(FinalTime);
       Timertext.x = player.x - 200;
       Timertext.y = player.y - 200;

       if (keyESC.isDown && localStorage.getItem('paused') == "0") {
        localStorage.setItem("paused", "1");
        this.scene.pause();
        //if (test56 == false) {
            //test56 = true;
            this.scene.launch("pauseMenu");
        //} else {
            //this.scene.wake("pauseMenu");
        //}
    } 

        
       
       ABC1.setFrame(testvar5);
       
       if(keyUP.isDown && (testvar5 == 25 && test6 == true)){
           testvar5 = 0;
           test6 = false;
       } else if(keyDOWN.isDown && (testvar5 == 0 && test6 == true)){
           testvar5 = 25;
           test6 = false;
       } else if(keyUP.isDown && test6 == true){
           testvar5 = testvar5 + 1;
           test6 = false;
       } else if(keyDOWN.isDown && test6 == true){
           testvar5 = testvar5 - 1;
           test6 = false;
       } if(keyUP.isUp && keyDOWN.isUp){
           test6 = true;
       }

        if (Check1tile.index == 6 || Check1tile.index == 0 || Check1tile.index == 1) {
            if(Check1pass == false && Check2pass == false && Check3pass == false){
                Check1pass = true;
                console.log("Check 1 passed")
            }
        }

        if (Check2tile.index == 6 || Check2tile.index == 0 || Check2tile.index == 1) {
            if(Check1pass == true && Check2pass == false && Check3pass == false){
                Check2pass = true;
                console.log("Check 2 passed")
            }
        }

        if (Check3tile.index == 6 || Check3tile.index == 0 || Check3tile.index == 1) {
            if(Check1pass == true && Check2pass == true && Check3pass == false){
                Check3pass = true;
                console.log("Check 3 passed")
            }
        }

        if (tile2.index == 9 || tile2.index == 10) {
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
                //map1leader.splice(0, 1, "Test");
                //console.log(map1leader)
                //localStorage.setItem('test', JSON.stringify(map1leader));
                var done = false;
                for(var i=0; i<map1leader.length; i++){
                    if(done == false)
                    if(FinalTime < map1leader[i]){
                        map1leader.splice(i, 0, FinalTime);
                        localStorage.setItem('map1leader', JSON.stringify(map1leader));
                        done = true;
                    } else if(map1leader[i] == 0){
                        map1leader.splice(i, 0, FinalTime);
                        localStorage.setItem('map1leader', JSON.stringify(map1leader));
                        done = true;
                    }
                }
                localStorage.setItem('Race1Time', FinalTime);
                console.log("Race Finished");
                this.scene.launch("lapsComplete");
            }
            
        }


    }   
});
