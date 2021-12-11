var mapselect = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "mapselect" });
},
preload: function()
{
this.load.image('mapselectback', 'assets/images/UI/mapselectback.png');
this.load.image('map2select', 'assets/images/UI/map2select.png');
this.load.image('map1select', 'assets/images/UI/map1select.png');
this.load.image('mapbio', 'assets/images/UI/mapbio.png');
this.load.image('mapback', 'assets/images/UI/mapback.png');
},
create: function()
{
mapselectback = this.add.image(400,400,'mapselectback')
map2select = this.add.image(400,198,'map2select')
map1select = this.add.image(169,198,'map1select')
mapbio = this.add.image(400,570,'mapbio')
mapback = this.add.image(400,198,'mapback')
const layer = this.add.layer();
layer.add([mapselectback, mapback, map2select, map1select, mapbio])
mapbio.visible = false
map1select.setInteractive();
map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    map1select.setFrame(1)
})
map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
    map1select.setFrame(0)
})
map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    mapbio.visible = true
    this.scene.start('map1')
})

map2select.setInteractive();
map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    map2select.setFrame(1)
})
map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
    map2select.setFrame(0)
})
map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    mapbio.visible = true
    this.scene.start('map2')
})
},
update: function()
{
}
})