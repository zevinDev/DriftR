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
onFull = this.add.text(300, 400, 'full')
offFull = this.add.text(400, 400, 'offFull')
backbut = this.add.text(100, 100, 'back')
offFull = this.add.text(400, 400, 'offFull')
reset = this.add.text(200, 400, 'reset')


onFull.setInteractive();
onFull.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    this.scale.startFullscreen();
})

offFull.setInteractive();
offFull.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    this.scale.stopFullscreen();
})

backbut.setInteractive();
backbut.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    this.scene.start('menu')
})

reset.setInteractive();
reset.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    localStorage.clear();
    console.log('cleared cache')
})

},
update: function()
{

}});