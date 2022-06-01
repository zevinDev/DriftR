
var howTo = new Phaser.Class({            
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "howTo"
        });
    },
preload: function() {
    var car = localStorage.getItem('car');
    this.load.image('player', car);
},

create: function(){
    var buttonz = this.add.image(375, 600, 'start');

    buttonz.setInteractive(); 
    buttonz.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
     this.cameras.main.fadeOut(1000, 0, 0, 0)
     this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
         this.scene.start('menu')
         this.scene.stop();
     })
 })
    
    
    
    
    extendedBackground = this.add.image(2048, 2048, 'extendedBackground');

    player = this.physics.add.sprite(375, 3300, 'player');
    player.body.setMaxSpeed(500);
    player.angle = -90;
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    

    camera = this.cameras.main;
    camera.startFollow(player);
    canMove = true;


        console.log("works"); 
           //Sets Collistion For Player
        
      
        const layer = this.add.layer();
        layer.add([extendedBackground, player, buttonz]); 
        
        
       
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
    if (player.body.speed > 15 && (keyLEFT.isDown)) {
        player.setAngularVelocity(-150);
        console.log("yoo"); 
    } else if (player.body.speed > 15 && (keyRIGHT.isDown)) {
        player.setAngularVelocity(150);
    } else {
        player.setAngularVelocity(0);
    }
    if (keyUP.isDown && player.body.speed < 516) {
        this.physics.velocityFromRotation(player.rotation, 700, player.body.acceleration);
    } else if (player.body.speed > 400) {
        this.physics.velocityFromRotation(player.rotation, (player.body.speed - 75), player.body.velocity);
    } else {
        player.setAcceleration(0);
        player.body.drag.x = 160;
        player.body.drag.y = 160;
        this.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
    }




}, 
});  
