var garage = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "garage" });
},

preload: function()
{
    this.load.image('player','assets/images/Cars/Player.png');
},

create: function()
{
    this.physics.add.sprite(2048,2048, 'player');
},
update: function()
{

}});