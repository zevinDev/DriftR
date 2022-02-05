var lapsComplete = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "lapsComplete" });
},

preload: function()
{
this.load.image('X', 'assets/images/UI/X.png')
this.load.image('redo', 'assets/images/UI/redo.png')
this.load.spritesheet('pauseMenu', 'assets/images/UI/EndScreen.png', {
    frameWidth: 800,
    frameHeight: 800
});
},

create: function()
{
    if(currentmap == "map1"){
        var map1leader = localStorage.getItem('map1leader');
        maptop = JSON.parse(map1leader);
    }else if(currentmap == "map2"){
        var map2leader = localStorage.getItem('map2leader');
        maptop = JSON.parse(map2leader);
        maptop = map2leader
    }else if(currentmap == "map3"){
        var map3leader = localStorage.getItem('map3leader');
        maptop = JSON.parse(map3leader);
    }
lapTime = this.add.text(416,408,FinalTime,{ fontFamily: 'Dogica', fontSize: 32, color: '#3c853f' });
lapTop = this.add.text(416,516,maptop[0],{ fontFamily: 'Dogica', fontSize: 32, color: '#967532' });

pauseScene = this.add.image(400,400, 'pauseMenu');
const layer = this.add.layer();
layer.add([pauseScene, lapTime, lapTop])
if(LeaderTime <= 90){
    pauseScene.setFrame(3);
}else if(LeaderTime <= 120){
    pauseScene.setFrame(2);
}else if(LeaderTime > 0){
    pauseScene.setFrame(1);
}

var X = this.add.image(340, 630, 'X');
    X.setInteractive();
    X.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.scene.start('mapselect')
        this.scene.stop(currentmap);
        this.scene.stop();
})

var redo = this.add.image(474, 630, 'redo');
    redo.setInteractive();
    redo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.scene.restart(currentmap)
        this.scene.stop();
})
},
update: function()
{
}});