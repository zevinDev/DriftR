var garage = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "garage" });
},

preload: function()
{
    this.load.image('player1','assets/images/Cars/player.png');
    this.load.image('player2','assets/images/Cars/RedCar.png');
    this.load.image('player3','assets/images/Cars/MagentaCar.png');
    this.load.image('player4','assets/images/Cars/LimeCar.png');
    this.load.image('darkbirdmobile','assets/images/Cars/DarkBirdMobile.png');

    this.load.image('back','assets/images/Garage/GarageBackGround.png');
},

create: function()
{
    //(TEST) still needs code for clicking on them and adding a button
    back = this.physics.add.sprite(400,400, 'back');
    player1 = this.physics.add.sprite(200,600, 'player1');
    player2 = this.physics.add.sprite(400,600, 'player2');
    player3 = this.physics.add.sprite(600,600, 'player3');
    player4 = this.physics.add.sprite(200,500, 'player4');
    darkbirdmobile = this.physics.add.sprite(400,500, 'darkbirdmobile');



    //Defines Layers And Border Physics
    const layer = this.add.layer();
    layer.add([back, player1, player2, player3, player4, darkbirdmobile]);

},
update: function()
{

}});