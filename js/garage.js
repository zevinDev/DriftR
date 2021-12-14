var garage = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "garage" });
},

preload: function()
{
    this.load.spritesheet('garageIcon', 'assets/images/UI/GarageIcon.png',{frameWidth: 100, frameHeight: 100});
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
    //(REMOVABLE IN FP(FINAL PRODUCT)) Coin
var Dbucks = 100;
    //Variables for unlocked vs locked cars
var P1 = false;
var P2 = false;
var P3 = false;
var P4 = false;
var DBM = false;
var MGC = false;

    //(TEST) still needs code for clicking on them and adding a button
    GarageBack = this.physics.add.sprite(400,400, 'GarageBack');

    player1 = this.physics.add.sprite(200,650, 'player1');
        if (P1 = true) {
        GarageIcon1 = this.add.image(200,650, 'garageIcon');
            GarageIcon1.setFrame(1);
            GarageIcon1.setInteractive();
                GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    Car = 'assets/images/Cars/Player.png';
                })
        } else if (P1 = false) {
        GarageIconLocked1 = this.add.image(200,650, 'garageIcon');
        }

    player2 = this.physics.add.sprite(400,650, 'player2');
    GarageIconLocked2 = this.add.image(400,650,'garageIcon');

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
    layer.add([GarageBack, player1, player2, player3, player4, darkbirdmobile, mgcar, GarageIconLocked1, GarageIconLocked2, GarageIconLocked3, GarageIconLocked4, GarageIconLocked5, GarageIconLocked6]);

},
update: function()
{

}});