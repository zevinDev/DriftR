var pauseMenu = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "pauseMenu" });
},

preload: function()
{
this.load.image('pauseMenu', 'assets/images/UI/pauseScreen.png');
},

create: function()
{


pauseScene = this.add.image(400,400, 'pauseMenu');
keyESC1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
},
update: function()
{
    if (keyESC1.isDown && localStorage.getItem("paused", "1")) {
        localStorage.setItem("paused", "0");
        this.scene.resume("map1");
        //this.scene.sleep("pauseMenu");
        this.scene.stop("pauseMenu");
    } 
}});