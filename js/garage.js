var garage = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "garage" });
},

preload: function()
{
    this.load.image('garageIcon', 'assets/images/UI/GarageIcon.png');
    this.load.image('player1','assets/images/Cars/player.png');
    this.load.image('player2','assets/images/Cars/RedCar.png');
    this.load.image('player3','assets/images/Cars/MagentaCar.png');
    this.load.image('player4','assets/images/Cars/LimeCar.png');
    this.load.image('darkbirdmobile','assets/images/Cars/DarkBirdMobile.png');
    this.load.image('mgcar', 'assets/images/Cars/MGKCar.png');

    this.load.image('GarageBack','assets/images/UI/GarageBackgroundConcept.jpg');
},

create: function()
{
    //(TEST) still needs code for clicking on them and adding a button
    GarageBack = this.physics.add.sprite(400,400, 'GarageBack');

    player1 = this.physics.add.sprite(200,650, 'player1');
    GarageIcon1 = this.add.image(200,650,'garageIcon');

    player2 = this.physics.add.sprite(400,650, 'player2');
    GarageIcon2 = this.add.image(400,650,'garageIcon');

    player3 = this.physics.add.sprite(600,650, 'player3');
    GarageIcon3 = this.add.image(600,650,'garageIcon');

    player4 = this.physics.add.sprite(200,450, 'player4');
    GarageIcon4 = this.add.image(200,450,'garageIcon');

    darkbirdmobile = this.physics.add.sprite(400,450, 'darkbirdmobile');
    GarageIcon5 = this.add.image(400,450,'garageIcon');

    mgcar = this.add.image(600, 450, 'mgcar');
    GarageIcon6 = this.add.image(600,450,'garageIcon');
    mgcar.scaleX = 0.33;
    mgcar.scaleY = 0.33;



    //Defines Layers And Border Physics
    const layer = this.add.layer();
    layer.add([GarageBack,GarageIcon6, GarageIcon5, GarageIcon4, GarageIcon3, GarageIcon2, GarageIcon1, player1, player2, player3, player4, darkbirdmobile, mgcar]);

},
update: function()
{

}});