var lapsComplete = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "lapsComplete" });
},

preload: function()
{
},

create: function()
{
    mapTime = (minutes*60) + seconds + (milliseconds/100);
    stars = parseInt(localStorage.getItem("stars"));
    pauseScene = this.add.image(400,400, 'endScreen');
    if(currentMap == "map1"){
        var map1Leader = localStorage.getItem('map1Leader');
        mapTop = JSON.parse(map1Leader);
        if(mapTime <= 90){
            pauseScene.setFrame(3);
            stars = stars + 3;
        }else if(mapTime <= 120){
            pauseScene.setFrame(2);
            stars = stars + 2;
        }else if(mapTime > 0){
            pauseScene.setFrame(1);
            stars = stars + 1;
        }
    }else if(currentMap == "map2"){
        var map2Leader = localStorage.getItem('map2Leader');
        mapTop = JSON.parse(map2Leader);
        mapTop = map2Leader
        if(mapTime <= 120){
            pauseScene.setFrame(3);
            stars = stars + 3;
        }else if(mapTime <= 150){
            pauseScene.setFrame(2);
            stars = stars + 2;
        }else if(mapTime > 0){
            pauseScene.setFrame(1);
            stars = stars + 1;
        }
    }else if(currentMap == "map3"){
        var map3leader = localStorage.getItem('map3leader');
        mapTop = JSON.parse(map3leader);
        if(mapTime <= 70){
            pauseScene.setFrame(3);
            stars = stars + 3;
        }else if(mapTime <= 100){
            pauseScene.setFrame(2);
            stars = stars + 2;
        }else if(mapTime > 0){
            pauseScene.setFrame(1);
            stars = stars + 1;
        }
    }
lapTime = this.add.text(416,408,finalTime,{ fontFamily: 'Dogica', fontSize: 32, color: '#3c853f' });
lapTop = this.add.text(416,516,mapTop[0],{ fontFamily: 'Dogica', fontSize: 32, color: '#967532' });


const layer = this.add.layer();
layer.add([pauseScene, lapTime, lapTop])


var X = this.add.image(340, 630, 'X');
    X.setInteractive();
    X.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.scene.start('mapSelect')
        this.scene.stop(currentMap);
        this.scene.stop();
})

var redo = this.add.image(474, 630, 'redo');
    redo.setInteractive();
    redo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.scene.start(currentMap);
        this.scene.stop();
})
console.log(stars)
localStorage.setItem('stars', stars);
},
update: function()
{
}});