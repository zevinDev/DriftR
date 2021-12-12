var options = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "options" });
},

preload: function()
{

},

create: function()
{
back = this.add.image(400,400, 'back')

        this.scale.startFullscreen();

},
update: function()
{

}});