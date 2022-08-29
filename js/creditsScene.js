var creditsScene = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "creditsScene" });
},

preload: function()
{
    
},

create: function()
{
    var backimage = this.add.graphics();
    backimage.fillStyle(0x37313b, 1);
    backimage.fillRect(0, 0, 800, 800);

    //code for the back button to fade out and bring back the menu screen
    backButton = this.add.image(100, 50, 'backButton');
    backButton.setInteractive();
    backButton.on(pointerOver, () => {
        backButton.setFrame(1)
    })
    backButton.on(pointerOut, () => {
        backButton.setFrame(0)
    })
    backButton.on(pointerDown, () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('menu')
        })
    })
    var placeholdertext = this.add.text(600,700, "Venmo me:  \n\n@tlorenzana", {
        fontFamily: 'Dogica', 
        fontSize: 20,
        color: '#F4F6F7 ',
        align: 'right'
    });

    var help = this.add.text(25,700, "Want to make the game better? \n\nHere's what you can do to help ---> ", {
        fontFamily: 'Dogica', 
        fontSize: 20,
        color: '#F4F6F7 ',
        align: 'left'
    });
    var title = this.add.text(0, 100, "\n\nMeet The Team!\n\n\n\n\n\n\n\n" + " Currently Working on the Project", {
        fontFamily: 'Dogica',
        fontSize: 30,
        color: '#F4F6F7 ',
        align: 'center'
    });
    var text = this.add.text(25, 250, "", {
        fontFamily: 'Dogica',
        fontSize: 20,
        color: '#F4F6F7 '
    });
    text.setText(
        "Lead and Technical: Zevin Burzynski \n\n" +
        "Graphics Design and Developer:Taggart Lorenzana \n\n" +
        "Sound and Developer: Josh Perez \n\n\n\n\n\n\n" +
        "Lead and Technical: Taggart Lorenzana \n\n" +
        "Mobile Developer and Trainee: Trey Wheeler \n\n" +
        "Sound: Josh Perez"
    )

    //Defines the layer order
        const layer = this.add.layer();
        layer.add([backimage, backButton, text, title, help, placeholdertext]);

}});