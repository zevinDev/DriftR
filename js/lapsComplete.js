var lapsComplete = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "lapsComplete" });
},

preload: function()
{
this.load.image('pauseMenu', 'assets/images/UI/pauseScreen.png');
},

create: function()
{
lapTime = this.add.text(300,400, "Laptime: " + localStorage.getItem('Race1Time'),{
    font: '64px Courier Bold',
    fill: '#000000'
})

pauseScene = this.add.image(400,400, 'pauseMenu');

},
update: function()
{

}});