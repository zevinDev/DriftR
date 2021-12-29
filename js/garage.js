var garage = new Phaser.Class({
    Extends: Phaser.Scene,
initialize: function() {
    Phaser.Scene.call(this, { "key": "garage" });
},
preload: function()
{
    this.load.image('lockedIcon','assets/images/Garage/LockedCar.png');
    this.load.spritesheet('cancelButton','assets/images/Garage/CancelButton.png', {frameWidth: 264, frameHeight: 104});
    this.load.spritesheet('buyButton','assets/images/Garage/BuyButton.png', {frameWidth: 264, frameHeight: 104});
    this.load.spritesheet('backButton','assets/images/UI/BackButton.png', {frameWidth: 165, frameHeight: 80});
    this.load.spritesheet('garageIcon', 'assets/images/Garage/CarButton.png',{frameWidth: 144, frameHeight: 160});
    this.load.image('player1','assets/images/Cars/Player.png');
    this.load.image('player2','assets/images/Cars/RedCar.png');
    this.load.image('player3','assets/images/Cars/MagentaCar.png');
    this.load.image('player4','assets/images/Cars/LimeCar.png');
    this.load.image('darkbirdmobile','assets/images/Cars/DarkBirdMobile.png');
    this.load.image('mgcar', 'assets/images/Cars/MGKCar.png');

    this.load.image('infoPopUp', 'assets/images/Garage/InfoPopUp.png');
    this.load.image('GarageBack','assets/images/UI/garageBack.png');
},

create: function()
{
//this is for displaying current cash
currency = this.add.text (25,75, "Dbucks: " + Dbucks,{ font: '32px Courier Bold', fill: '#000000' })
var price = 0;

    //Background UI
    GarageBack = this.physics.add.sprite(400,400, 'GarageBack');

    //The buy popup loads but is not visible
    infoPopUp = this.add.image(400,400, 'infoPopUp');
    cancelButton = this.add.image(250,625,'cancelButton');
    buyButton = this.add.image(550,625,'buyButton');
    popUpText = this.add.text(150,150, "Are you sure you want to buy \n this car for " + price + " Dbucks?",{ font: '64px Courier Bold', fill: '#000000' });
    
    infoPopUp.visible = false;
    cancelButton.visible = false;
    buyButton.visible = false;
    popUpText.visible = false;

    cancelButton.setInteractive();
    cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
    {
                
        cancelButton.setFrame(1)
    })
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
    {
        cancelButton.setFrame(0)
    })
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
        price = 0;
        infoPopUp.visible = false;
        cancelButton.visible = false;
        buyButton.visible = false;
        popUpText.visible = false; 
        console.log(price);
    })

    buyButton.setInteractive();
    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
    {
                
        buyButton.setFrame(1)
    })
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
    {
        buyButton.setFrame(0)
    })
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {   

        Dbucks = Dbucks - price;
        currency.setText("Dbucks: " + Dbucks)

        infoPopUp.visible = false;
        cancelButton.visible = false;
        buyButton.visible = false;
        popUpText.visible = false; 

        //code below resets scene because buying something breaks the current scene but after restarting it seems fine
        //found it online
        //i found the problem but it would just be easier to restart the scene, it's because i dont create interactives for the rest of
        //the visuals since its only done if the car has been bought
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.restart();// restart current scene
    })




    backButton = this.add.image(100,50, 'backButton');
        backButton.setInteractive();   
            backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                backButton.setFrame(1)
            })
            backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                backButton.setFrame(0)
            })
            backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('menu')
                })
            })
    //(TEST) still needs code for clicking on them and adding a button

player1 = this.physics.add.sprite(200,642, 'player1');
GarageIcon1 = this.add.image(200,650, 'garageIcon');
GarageIconLocked1 = this.add.image(200,650, 'lockedIcon')
if (Car == 'assets/images/Cars/Player.png'){
    GarageIcon1.setFrame(3)
    player1.y = 650
}
if (P1 == true) 
{
    GarageIconLocked1.visible = false;
    GarageIcon1.setInteractive();
        GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
    {
        if (Car == 'assets/images/Cars/Player.png') {
            GarageIcon1.setFrame(3)
            player1.y = 650
        } else {
        GarageIcon1.setFrame(1)
        player1.y = 642
        }
    })
        GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
    {
        if (Car == 'assets/images/Cars/Player.png') {
            GarageIcon1.setFrame(3)
            player1.y = 650
        } else {
        GarageIcon1.setFrame(0)
        player1.y = 642
        }
    })
        GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
        GarageIcon1.setFrame(0);
        player1.y = 642
        GarageIcon2.setFrame(0);
        player2.y = 642
        GarageIcon3.setFrame(0);
        player3.y = 642
        GarageIcon4.setFrame(0);
        player4.y = 442
        GarageIcon5.setFrame(0);
        darkbirdmobile.y = 442
        GarageIcon6.setFrame(0);
        mgcar.y = 442
            GarageIcon1.setFrame(3)
            player1.y = 650
            Car = 'assets/images/Cars/Player.png';
    })
} else if (P1 == false) 
{
    GarageIconLocked1.setInteractive();
    GarageIconLocked1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>
    {
        //price also changed per car
    price = 0;
    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
    infoPopUp.visible = true;
    cancelButton.visible = true;
    buyButton.visible = true;
    popUpText.visible = true;
 
    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {   
        //things that need to be changed for every car
        GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
        GarageIconLocked1.visible = false;
        P1 = true;
        GarageIcon1.setFrame(3);
        player1.y = 650
        Car = 'assets/images/Cars/Player.png';
    })
    })
}



player2 = this.physics.add.sprite(400,650, 'player2');
GarageIcon2 = this.add.image(400,650, 'garageIcon');
GarageIconLocked2 = this.add.image(400,650, 'lockedIcon')
if (Car == 'assets/images/Cars/RedCar.png'){
    GarageIcon2.setFrame(3)
    player2.y = 650
}
if (P2 == true) 
{
    GarageIconLocked2.visible = false;
    GarageIcon2.setInteractive();
        GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
    {
        if (Car == 'assets/images/Cars/RedCar.png') {
            GarageIcon2.setFrame(3)
            player2.y = 650
        } else {
        GarageIcon2.setFrame(1)
        player2.y = 642
        }
    })
        GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
    {
        if (Car == 'assets/images/Cars/RedCar.png') {
            GarageIcon2.setFrame(3)
            player2.y = 650
        } else {
        GarageIcon2.setFrame(0)
        player2.y = 642
        }
    })
        GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
        GarageIcon1.setFrame(0);
        player1.y = 642
        GarageIcon2.setFrame(0);
        player2.y = 642
        GarageIcon3.setFrame(0);
        player3.y = 642
        GarageIcon4.setFrame(0);
        player4.y = 442
        GarageIcon5.setFrame(0);
        darkbirdmobile.y = 442
        GarageIcon6.setFrame(0);
        mgcar.y = 442
            GarageIcon2.setFrame(3)
            player2.y = 650
            Car = 'assets/images/Cars/RedCar.png';
    })
} else if (P2 == false) 
{
    GarageIconLocked2.setInteractive();
    GarageIconLocked2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>
    {
        //price also changed per car
    price = 100;
    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
    infoPopUp.visible = true;
    cancelButton.visible = true;
    buyButton.visible = true;
    popUpText.visible = true;
 
    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {   
        //things that need to be changed for every car
        GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
        GarageIconLocked2.visible = false;
        P2 = true;
        GarageIcon2.setFrame(3);
        player2.y = 650
        Car = 'assets/images/Cars/RedCar.png';
    })
    })
}


    player3 = this.physics.add.sprite(600,650, 'player3');
    GarageIcon3 = this.add.image(600,650, 'garageIcon');
    GarageIconLocked3 = this.add.image(600,650,'lockedIcon');
    //change what happens if == to the car
    if (Car == 'assets/images/Cars/MagentaCar.png'){
        GarageIcon3.setFrame(3)
        player3.y = 650
    }
    if (P3 == true) 
    {
        GarageIconLocked3.visible = false;
        GarageIcon3.setInteractive();
            GarageIcon3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
        {
            if (Car == 'assets/images/Cars/MagentaCar.png') {
                GarageIcon3.setFrame(3)
                player3.y = 650
            } else {
            GarageIcon3.setFrame(1)
            player3.y = 642
            }
        })
            GarageIcon3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
        {
            if (Car == 'assets/images/Cars/MagentaCar.png') {
                GarageIcon3.setFrame(3)
                player3.y = 650
            } else {
            GarageIcon3.setFrame(0)
            player3.y = 642
            }
        })
            GarageIcon3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
                GarageIcon3.setFrame(3)
                player3.y = 650
                Car = 'assets/images/Cars/MagentaCar.png';
        })
    } else if (P3 == false) 
    {
        GarageIconLocked3.setInteractive();
        GarageIconLocked3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>
        {
            //price also changed per car
        price = 150;
        popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
        infoPopUp.visible = true;
        cancelButton.visible = true;
        buyButton.visible = true;
        popUpText.visible = true;
     
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {   
            //things that need to be changed for every car
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
            GarageIconLocked3.visible = false;
            P3 = true;
            GarageIcon3.setFrame(3);
            player3.y = 650
            Car = 'assets/images/Cars/MagentaCar.png';
        })
        })
    }
    

    player4 = this.physics.add.sprite(200,450, 'player4');
    GarageIcon4 = this.add.image(200,450, 'garageIcon');
    GarageIconLocked4 = this.add.image(200,450,'lockedIcon');
    if (Car == 'assets/images/Cars/LimeCar.png'){
        GarageIcon4.setFrame(3)
        player4.y = 450
    }
    if (P4 == true) 
    {
        GarageIconLocked4.visible = false;
        GarageIcon4.setInteractive();
            GarageIcon4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
        {
            if (Car == 'assets/images/Cars/LimeCar.png') {
                GarageIcon4.setFrame(3)
                player4.y = 450
            } else {
            GarageIcon4.setFrame(1)
            player4.y = 442
            }
        })
            GarageIcon4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
        {
            if (Car == 'assets/images/Cars/LimeCar.png') {
                GarageIcon4.setFrame(3)
                player4.y = 450
            } else {
            GarageIcon4.setFrame(0)
            player4.y = 442
            }
        })
            GarageIcon4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
                GarageIcon4.setFrame(3)
                player4.y = 450
                Car = 'assets/images/Cars/LimeCar.png';
        })
    } else if (P4 == false) 
    {
        GarageIconLocked4.setInteractive();
        GarageIconLocked4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>
        {
            //price also changed per car
        price = 150;
        popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
        infoPopUp.visible = true;
        cancelButton.visible = true;
        buyButton.visible = true;
        popUpText.visible = true;
     
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {   
            //things that need to be changed for every car
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
            GarageIconLocked4.visible = false;
            P4 = true;
            GarageIcon4.setFrame(3);
            player4.y = 450
            Car = 'assets/images/Cars/LimeCar.png';
        })
        })
    }
    

    darkbirdmobile = this.physics.add.sprite(400,450, 'darkbirdmobile');
    GarageIcon5 = this.add.image(400,450, 'garageIcon');
    GarageIconLocked5 = this.add.image(400,450,'lockedIcon');
    //change what happens if == to the car
    if (Car == 'assets/images/Cars/DarkBirdMobile.png'){
        GarageIcon5.setFrame(3)
        darkbirdmobile.y = 450
    }
    if (DBM == true) 
    {
        GarageIconLocked5.visible = false;
        GarageIcon5.setInteractive();
            GarageIcon5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
        {
            if (Car == 'assets/images/Cars/DarkBirdMobile.png') {
                GarageIcon5.setFrame(3)
                darkbirdmobile.y = 450
            } else {
            GarageIcon5.setFrame(1)
            darkbirdmobile.y = 442
            }
        })
            GarageIcon5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
        {
            if (Car == 'assets/images/Cars/DarkBirdMobile.png') {
                GarageIcon5.setFrame(3)
                darkbirdmobile.y = 450
            } else {
            GarageIcon5.setFrame(0)
            darkbirdmobile.y = 442
            }
        })
            GarageIcon5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
                GarageIcon5.setFrame(3)
                darkbirdmobile.y = 450
                Car = 'assets/images/Cars/DarkBirdMobile.png';
        })
    } else if (DBM == false) 
    {
        GarageIconLocked5.setInteractive();
        GarageIconLocked5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>
        {
            //price also changed per car
        price = 500;
        popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
        infoPopUp.visible = true;
        cancelButton.visible = true;
        buyButton.visible = true;
        popUpText.visible = true;
     
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {   
            //things that need to be changed for every car
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
            GarageIconLocked5.visible = false;
            DBM = true;
            GarageIcon5.setFrame(3);
            darkbirdmobile.y = 450
            Car = 'assets/images/Cars/DarkBirdMobile.png';
        })
        })
    }

    mgcar = this.physics.add.sprite(600, 450, 'mgcar');
    GarageIcon6 = this.add.image(600,450, 'garageIcon');
    GarageIconLocked6 = this.add.image(600,450,'lockedIcon');
    mgcar.scaleX = 0.33;
    mgcar.scaleY = 0.33;
    
    if (Car == 'assets/images/Cars/MGKCar.png'){
        GarageIcon6.setFrame(3)
        mgcar.y = 450
    }
    if (MGC == true) 
    {
        GarageIconLocked6.visible = false;
        GarageIcon6.setInteractive();
            GarageIcon6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => 
        {
            if (Car == 'assets/images/Cars/MGKCar.png') {
                GarageIcon6.setFrame(3)
                mgcar.y = 450
            } else {
            GarageIcon6.setFrame(1)
            mgcar.y = 442
            }
        })
            GarageIcon6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => 
        {
            if (Car == 'assets/images/Cars/MGKCar.png') {
                GarageIcon6.setFrame(3)
                mgcar.y = 450
            } else {
            GarageIcon6.setFrame(0)
            mgcar.y = 442
            }
        })
            GarageIcon6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
                GarageIcon6.setFrame(3)
                mgcar.y = 450
                Car = 'assets/images/Cars/MGKCar.png';
        })
    } else if (MGC == false) 
    {
        GarageIconLocked6.setInteractive();
        GarageIconLocked6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>
        {
            //price also changed per car
        price = 1000;
        popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
        infoPopUp.visible = true;
        cancelButton.visible = true;
        buyButton.visible = true;
        popUpText.visible = true;
     
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {   
            //things that need to be changed for every car
            GarageIcon1.setFrame(0);
            player1.y = 642
            GarageIcon2.setFrame(0);
            player2.y = 642
            GarageIcon3.setFrame(0);
            player3.y = 642
            GarageIcon4.setFrame(0);
            player4.y = 442
            GarageIcon5.setFrame(0);
            darkbirdmobile.y = 442
            GarageIcon6.setFrame(0);
            mgcar.y = 442
            GarageIconLocked6.visible = false;
            MGC = true;
            GarageIcon6.setFrame(3);
            mgcar.y = 450
            Car = 'assets/images/Cars/MGKCar.png';
        })
        })
    }


    //Defines Layers And Border Physics
    const layer = this.add.layer();
    layer.add([GarageBack,backButton, GarageIcon1, GarageIcon2, GarageIcon3, GarageIcon4, GarageIcon5, GarageIcon6, player1, player2, player3, player4, darkbirdmobile, mgcar, GarageIconLocked1, GarageIconLocked2, GarageIconLocked3, GarageIconLocked4, GarageIconLocked5, GarageIconLocked6, infoPopUp, currency, cancelButton, buyButton, popUpText]);


    
},
update: function()
{

}});