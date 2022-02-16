var pauseMenu = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "pauseMenu" });
},

preload: function()
{

},

create: function()
{


pauseScene = this.add.image(400,400, 'pauseMenu');
keyESC1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

var selectedMap;
if (localStorage.getItem('mapselect') == 1) {

    selectedMap = 'map1'

} else if (localStorage.getItem('mapselect') == 2) {

    selectedMap = 'map2'

} else if (localStorage.getItem('mapselect') == 3) {

    selectedMap = 'map3'
}

if (keyESC1.isDown && localStorage.getItem("paused", "1")) {
    localStorage.setItem("paused", "0");
    this.scene.resume("map1");
    this.scene.stop();
} 
exit = this.add.image(400,350, 'exit');
resume = this.add.image(400, 450, 'resume');
restart = this.add.image(400,550, 'redo');

exit.setInteractive();
exit.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    exit.setFrame(1)
})
exit.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
    exit.setFrame(0)
})
exit.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    this.scene.start('mapselect');
    localStorage.setItem("paused", "0");
    this.scene.stop();
    this.scene.stop(selectedMap);
})

resume.setInteractive();
resume.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

    resume.setFrame(1)
})
resume.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
    resume.setFrame(0)
})
resume.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    localStorage.setItem("paused", "0");
    this.scene.resume(selectedMap);
    this.scene.stop();
})

restart.setInteractive();
restart.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    localStorage.setItem("paused", "0");
    this.scene.start(selectedMap);
    this.scene.stop();
})
},
update: function()
{
    if (keyESC1.isDown && localStorage.getItem("paused", "1")) {
        localStorage.setItem("paused", "0");
        this.scene.resume(currentmap);
        //this.scene.sleep("pauseMenu");
        this.scene.stop();
    } 
}});