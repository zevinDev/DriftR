var LeaderBoardEnter = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "LeaderBoardEnter" });
},

preload: function()
{
this.load.image('LeaderBoardEnterBox', 'assets/images/UI/LeaderBoardScreen.png');
this.load.spritesheet('ABC', 'assets/images/UI/nameselect.png', {
    frameWidth: 56,
    frameHeight: 60
});
},

create: function()
{

ABC1 = this.add.image(300,440, "ABC");
ABC2 = this.add.image(400,440, "ABC");
ABC3 = this.add.image(500,440, "ABC");
testvar5 = 0;
test6 = true;
test7 = true;
pauseScene = this.add.image(400,400, 'LeaderBoardEnterBox');
keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
Done5 = true;
PlaceValue = this.add.text(438, 202, placevalue,{ fontFamily: 'Dogica', fontSize: 32, color: '#ffbe00' });
var layer = this.add.layer();
    layer.add([ABC1, ABC2, ABC3])
ABC = ABC1;
ABCList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
Letter1 = "";
Letter2 = "";
Letter3 = "";
},
update: function()
{
    ABC.setFrame(testvar5);
    if(keyDOWN.isDown && (testvar5 == 25 && test6 == true)){
        testvar5 = 0;
        test6 = false;
    } else if(keyUP.isDown && (testvar5 == 0 && test6 == true)){
        testvar5 = 25;
        test6 = false;
    } else if(keyUP.isDown && test6 == true){
        testvar5 = testvar5 - 1;
        test6 = false;
    } else if(keyDOWN.isDown && test6 == true){
        testvar5 = testvar5 + 1;
        test6 = false;
    } if(keyUP.isUp && keyDOWN.isUp){
        test6 = true;
    }




    if(keyENTER.isDown && (ABC == ABC3 && test7 == true)){
        Letter3 = ABCList[testvar5];
        UserName = Letter1 + Letter2 + Letter3;
        test7 = false
        testvar5 = 0;
        var map1leadername = localStorage.getItem('map1leadername');
        map1leadername = JSON.parse(map1leadername);
        map1leadername.splice((placevalue-1), 0, UserName);
        localStorage.setItem('map1leadername', JSON.stringify(map1leadername));
        this.scene.launch("lapsComplete");
        this.scene.stop("LeaderBoardEnter");
    } else if(keyENTER.isDown && (ABC == ABC2 && test7 == true)){
        Letter2 = ABCList[testvar5];
        ABC = ABC3;
        test7 = false;
        testvar5 = 0;
    } else if(keyENTER.isDown && (ABC == ABC1 && test7 == true)){
        Letter1 = ABCList[testvar5];
        ABC = ABC2;
        test7 = false;
        testvar5 = 0;
    }
    if(keyENTER.isUp){
        test7 = true;
    }
}});