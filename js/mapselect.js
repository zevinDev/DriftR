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
var mapselect;
mapselectback = this.add.image(400,400,'mapselectback')
map3select = this. add.image(631,198,'map1select')
map2select = this.add.image(400,198,'map2select')
map1select = this.add.image(169,198,'map1select')
mapbio = this.add.image(400,570,'mapbio')
mapback = this.add.image(400,198,'mapback')
const layer = this.add.layer();
layer.add([mapselectback, mapback, map3select, map2select, map1select, mapbio])
mapbio.visible = false
//interactive for map1
map1select.setInteractive();
map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    map1select.setFrame(1)
})
map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
    map1select.setFrame(0)
})
map1select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    mapbio.visible = true
    mapselect = 1;
})
//interactive for map 2
map2select.setInteractive();
    map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        map2select.setFrame(1)
    })
    map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        map2select.setFrame(0)
    })
    map2select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        mapbio.visible = true
        mapselect = 2;
});
//interactive for map 3
map3select.setInteractive();
    map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        map3select.setFrame(1)
    })
    map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        map3select.setFrame(0)
    })
    map3select.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        mapbio.visible = true
        mapselect = 3;
});
//interactive for starting the map
mapbio.setInteractive();
    mapbio.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
    if (mapselect == 1) {
        this.scene.start('map1')    
    } else if (mapselect == 2) {
        this.scene.start('map2')
    } else if (mapselect == 3) {
        this.scene.start('map3')
    }
})
},
update: function()
{
}
})