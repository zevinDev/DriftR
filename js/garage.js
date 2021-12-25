var garage = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "garage" });
},

preload: function()
{
    this.load.image('lockedIcon','assets/images/Garage/LockedCar.png');
    this.load.spritesheet('backButton','assets/images/UI/BackButton.png', {frameWidth: 164, frameHeight: 80});
    this.load.spritesheet('garageIcon', 'assets/images/Garage/CarButton.png',{frameWidth: 144, frameHeight: 160});
    this.load.image('player1','assets/images/Cars/Player.png');
    this.load.image('player2','assets/images/Cars/RedCar.png');
    this.load.image('player3','assets/images/Cars/MagentaCar.png');
    this.load.image('player4','assets/images/Cars/LimeCar.png');
    this.load.image('darkbirdmobile','assets/images/Cars/DarkBirdMobile.png');
    this.load.image('mgcar', 'assets/images/Cars/MGKCar.png');

    this.load.image('GarageBack','assets/images/UI/garageBack.png');
},

create: function()
{
this.cameras.main.fadeIn(1000, 0, 0, 0)
    //(REMOVABLE IN FP(FINAL PRODUCT)) Coin
var Dbucks = 100;
    //Variables for unlocked vs locked cars
var P1 = true;
var P2 = false;
var P3 = false;
var P4 = false;
var DBM = false;
var MGC = false;
    //Background UI
    GarageBack = this.physics.add.sprite(400,400, 'GarageBack');

    backButton = this.add.image(100,50, 'backButton');
        backButton.setInteractive();   
            backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                backButton.setFrame(1)
            })
            backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                backButton.setFrame(0)
            })
            backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('menu')
                })
            })
    //(TEST) still needs code for clicking on them and adding a button

player1 = this.physics.add.sprite(200,650, 'player1');
GarageIcon1 = this.add.image(200,650, 'garageIcon');
GarageIconLocked1 = this.add.image(200,650, 'lockedIcon')
if (P1 == true) 
{
    GarageIconLocked1.visible = false;
    GarageIcon1.setInteractive();
        GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
    {
                GarageIcon1.setFrame(1)
    })
        GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
    {
        GarageIcon1.setFrame(0)
    })
        GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
            GarageIcon1.setFrame(3)
            Car = 'assets/images/Cars/Player.png';
    })
} else if (P1 == false) 
{
  GarageIcon1.visible = false;
}

player2 = this.physics.add.sprite(400,650, 'player2');
GarageIcon2 = this.add.image(400,650, 'garageIcon');
GarageIconLocked2 = this.add.image(400,650, 'lockedIcon')
if (P2 == true) 
{
    GarageIconLocked2.visible = false;
    GarageIcon2.setInteractive();
        GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
    {
                GarageIcon2.setFrame(1)
    })
        GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
    {
        GarageIcon2.setFrame(0)
    })
        GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
            Car = 'assets/images/Cars/Player.png';
    })
} else if (P2 == false) 
{
  GarageIcon2.visible = false;
}


    player3 = this.physics.add.sprite(600,650, 'player3');
    GarageIconLocked3 = this.add.image(600,650,'garageIcon');

    player4 = this.physics.add.sprite(200,450, 'player4');
    GarageIconLocked4 = this.add.image(200,450,'garageIcon');

    darkbirdmobile = this.physics.add.sprite(400,450, 'darkbirdmobile');
    GarageIconLocked5 = this.add.image(400,450,'garageIcon');

    mgcar = this.physics.add.sprite(600, 450, 'mgcar');
    GarageIconLocked6 = this.add.image(600,450,'garageIcon');
    mgcar.scaleX = 0.33;
    mgcar.scaleY = 0.33;



    //Defines Layers And Border Physics
    const layer = this.add.layer();
    layer.add([GarageBack,backButton, GarageIcon1, GarageIcon2, player1, player2, player3, player4, darkbirdmobile, mgcar, GarageIconLocked1, GarageIconLocked2, GarageIconLocked3, GarageIconLocked4, GarageIconLocked5, GarageIconLocked6]);

    //resetCarFunction(); {
     
    //}
},
update: function()
{

}});