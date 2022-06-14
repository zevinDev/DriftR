var options = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "options" });
},

preload: function()
{
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

},

create: function()
{
    const COLOR_PRIMARY = 0x4e342e;
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;
    var slider = this.rexUI.add.slider({
        x: 400,
        y: 500,
        width: 300,
        height: 30,
        orientation: 'x',

        track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
        indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),

        input: 'click', // 'drag'|'click'
        easeValue: { duration: 250 },

        valuechangeCallback: function (value) {
            console.log(value);
        },

    })
        .layout();

onFull = this.add.text(300, 400, 'full')
offFull = this.add.text(400, 400, 'offFull')
backbut = this.add.text(100, 100, 'back')
offFull = this.add.text(400, 400, 'offFull')
reset = this.add.text(200, 400, 'reset')


onFull.setInteractive();
onFull.on(pointerDown, () => {
    this.scale.startFullscreen();
})

offFull.setInteractive();
offFull.on(pointerDown, () => {
    this.scale.stopFullscreen();
})

backbut.setInteractive();
backbut.on(pointerDown, () => {
    this.scene.start('menu')
})

reset.setInteractive();
reset.on(pointerDown, () => {
    localStorage.clear();
})

},
update: function()
{
}});