var slide
var options = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "options" });
},

preload: function()
{
    this.load.spritesheet('VolControl', 'assets/images/UI/Right Button.png', {
        frameWidth: 32.2,
        frameHeight: 52
    });
    this.load.image('Ind', 'assets/images/UI/Indicator.png', {
        frameWidth: 32.2,
        frameHeight: 52
    });
},

create: function()
{
back = this.add.image(400,400, 'back')
onFull = this.add.text(300, 400, 'full')
offFull = this.add.text(400, 400, 'offFull')
backbut = this.add.text(100, 100, 'back')
offFull = this.add.text(400, 400, 'offFull')
reset = this.add.text(200, 400, 'reset')
ind1 = this.add.image 


var volUp = this.add.image(200, 600, 'VolControl');
var volDown = this.add.image(100, 600, 'VolControl');
volDown.angle = -180;

volUp.setInteractive();
volUp.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    volUp.setFrame(1)
        })
        volUp.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            volUp.setFrame(0)
        })
        volUp.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            volUp.setFrame(2)
        })
        volUp.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            volUp.setFrame(1)
        })

volDown.setInteractive();
volDown.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    volDown.setFrame(1)
        })
        volDown.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            volDown.setFrame(0)
        })
        volDown.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            volDown.setFrame(2)
        })
        volDown.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            volDown.setFrame(1)
        })







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