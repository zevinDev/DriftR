var map1 = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "map1" });
},

    
    
//Loads Stuff Before The Game Fully Loads So No Content Is missing While Playing Game
preload: function()
{
},
//Creates Anything When The Game Is Finished Preloading
create: function()
{
        corgi = this.sound.add("corgi", { loop: true });
        corgi.play();
        //Creates The Player
        player = this.physics.add.sprite(2048,2048, 'player');

        //Sets Colliders And Bounce
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //Defines Player MaxSpeed And Start Angle
        player.body.setMaxSpeed(500);
        player.angle = -90;

        //Creates Camera And Sets It To Follow Player
        camera = this.cameras.main;
        camera.startFollow(player);

        //Defines The Border
        border = this.physics.add.staticGroup();
        border.create(0,2048, 'border_u-d');
        border.create(4096, 2048, 'border_u-d');
        border.create(2048, 0, 'border_l-r');
        border.create(2048, 4096, 'border_l-r');

        //Defines All Of The Backgrounds Variables
        back = this.physics.add.image(0,0, 'back');
        back.x = back.displayWidth / 2;
        back.y = back.displayHeight / 2;
        xLimit = back.displayWidth;
        yLimit = back.displayHeight;

        //Creates Track
        track = this.add.group();
        track1 = track.create(496,3696, 'turn4');
        track2 = track.create(496,2896, 'verticle');
        track3 = track.create(496,2096, 'turn1');
        track4 = track.create(1296,2096, 'horizontal');
        track5 = track.create(2096,2096, 'turn3');
        track6 = track.create(2096,1296, 'turn2');
        track7 = track.create(1296,1296,'turn4');
        track8 = track.create(1296,496,'turn1');
        track9 = track.create(2096,496, 'horizontal');
        track10 = track.create(2896,496, 'turn2');
        track11 = track.create(2896,1296, 'verticle');
        track12 = track.create(2896,2096, 'turn4');
        track13 = track.create(3696,2096, 'turn2');
        track14 = track.create(3696,2896, 'verticle');
        track15 = track.create(3696,3696, 'turn3');
        track16 = track.create(2896,3696, 'turn4');
        track17 = track.create(2896,2969, 'turn2');
        track18 = track.create(2096,2969, 'horizontal');
        track19 = track.create(1296,2969,'turn1');
        track20 = track.create(1296,3696, 'turn3');

        
        //Defines Layers And Border Physics
        const layer = this.add.layer();
        layer.add([back, track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15, track16, track17, track18, track19, track20, player]);
        this.physics.add.collider(player, border);
        camera.setBounds(0, 0, xLimit, yLimit);


        
},
update: function()
{
    //Defines Keyboard Keys
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //Defines Friction, Mass, and Velocity For The Player
    //player.setFriction(30,30);
    //player.setMass(100);
    player.setMaxVelocity(1000,1000);


        //Defines All The Movement Controls For The Player
        if (player.body.speed>15 && (keyA.isDown || keyLEFT.isDown)) {
            player.setAngularVelocity(-150);
        } else if (player.body.speed>15 && (keyD.isDown || keyRIGHT.isDown)) {
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
    //This is the code for the timer function
     var timer = 0; //miliseconds
       var timez = 0; //idk
       var clocks = 0; //seconds
       while (timer <= 1000){ //The while loop infinitely counts up
           timer = timer + 1;
           if (timer >= 1000){
               timer = 0; 
               timez = timez + 1; 
               
               if (timez >= 60){
                   timez = 0;
clocks = (clocks + 1)/1000;
console.log(clocks); //The console log for the timer 
                   if (clocks >= 60){
                       clocks = 0;
                       
               } 
           }
           
       }
    
    
    
        }
});

