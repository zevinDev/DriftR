//For Taggy
//localStorage.setItem("car","assets/images/Cars/LimeCar.png");
var garage = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            "key": "garage"
        });
    },
    preload: function() {
        this.load.image('lockedIcon', 'assets/images/Garage/LockedCar.png');
        this.load.spritesheet('cancelButton', 'assets/images/Garage/CancelButton.png', {
            frameWidth: 264,
            frameHeight: 104
        });
        this.load.spritesheet('buyButton', 'assets/images/Garage/BuyButton.png', {
            frameWidth: 264,
            frameHeight: 104
        });
        this.load.spritesheet('backButton', 'assets/images/UI/BackButton.png', {
            frameWidth: 165,
            frameHeight: 80
        });
        this.load.spritesheet('garageIcon', 'assets/images/Garage/CarButton.png', {
            frameWidth: 144,
            frameHeight: 160
        });
        this.load.image('player1', 'assets/images/Cars/Player.png');
        this.load.image('player2', 'assets/images/Cars/RedCar.png');
        this.load.image('player3', 'assets/images/Cars/MagentaCar.png');
        this.load.image('player4', 'assets/images/Cars/LimeCar.png');
        this.load.image('darkbirdmobile', 'assets/images/Cars/DarkBirdMobile.png');
        this.load.image('mgcar', 'assets/images/Cars/MGKCar.png');

        this.load.image('infoPopUp', 'assets/images/Garage/InfoPopUp.png');
        this.load.image('GarageBack', 'assets/images/UI/mapselectback.png');

        
    },

    create: function() {
        P1 = localStorage.getItem('P1');
        P2 = localStorage.getItem('P2');
        P3 = localStorage.getItem('P3');
        P4 = localStorage.getItem('P4');
        MGC = localStorage.getItem('MGC');
        DBM = localStorage.getItem('DBM');
        
        Dbucks = localStorage.getItem('Dbucks');

        //this is for displaying current cash
        currency = this.add.text(25, 75, "Dbucks: " + Dbucks, {
            font: '32px Courier Bold',
            fill: '#000000'
        });
        var price = 0;
        //Background UI
        GarageBack = this.physics.add.sprite(400, 400, 'GarageBack');

        //text if you don't have enough money
        var notEnoughMoney = this.add.text(25, 200, "You do not have enough Dbucks", {
            font: '56px Courier Bold',
            fill: '#e34d4d'

        });
        notEnoughMoney.visible = false;

        //The buy popup loads but is not visible
        infoPopUp = this.add.image(400, 400, 'infoPopUp');
        cancelButton = this.add.image(250, 625, 'cancelButton');
        buyButton = this.add.image(550, 625, 'buyButton');
        popUpText = this.add.text(150, 150, "Are you sure you want to buy \n this car for " + price + " Dbucks?", {
            font: '64px Courier Bold',
            fill: '#000000'
        });

        infoPopUp.visible = false;
        cancelButton.visible = false;
        buyButton.visible = false;
        popUpText.visible = false;

        cancelButton.setInteractive();
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            cancelButton.setFrame(1)
        })
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            cancelButton.setFrame(0)
        })
        cancelButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            price = 0;
            infoPopUp.visible = false;
            cancelButton.visible = false;
            buyButton.visible = false;
            popUpText.visible = false;
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
        })

        buyButton.setInteractive();
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            buyButton.setFrame(1)
        })
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            buyButton.setFrame(0)
        })
        buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            var Dbucks2 = localStorage.getItem('Dbucks');
            if (Dbucks2 - price >= 0) {
                localStorage.setItem("Dbucks", Dbucks2 - price);
                var finalPrice = localStorage.getItem("Dbucks");
                currency.setText("Dbucks: " + finalPrice)

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
                this.scene.restart(); // restart current scene
            } else {
                infoPopUp.visible = false;
                cancelButton.visible = false;
                buyButton.visible = false;
                popUpText.visible = false;
                notEnoughMoney.visible = true;
            }
        });




        backButton = this.add.image(100, 50, 'backButton');
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
        //There's gonna be code for just player1 that will show you step by step on what happens

        //Sets all image icons
        player1 = this.physics.add.sprite(200, 642, 'player1');
        GarageIcon1 = this.add.image(200, 650, 'garageIcon');
        GarageIconLocked1 = this.add.image(200, 650, 'lockedIcon')
        //Checks if the car is the currently selected car and if so it will show the selected icon
        if (localStorage.getItem("car") == 'assets/images/Cars/Player.png') {
            GarageIcon1.setFrame(3)
            player1.y = 650
        }
        //Checks to see if the car has been bought
        if (P1 == "true") {
            //clears the locked image
            GarageIconLocked1.visible = false;
            //creates an interactive for the button so you can select it
            GarageIcon1.setInteractive();
            //Changes frame for hovering
            GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/Player.png') {
                    GarageIcon1.setFrame(3)
                    player1.y = 650
                } else {
                    GarageIcon1.setFrame(1)
                    player1.y = 642
                }
            })
            //makes sure icon stays selected if moved away other wise it will be displayed as default image
            GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/Player.png') {
                    GarageIcon1.setFrame(3)
                    player1.y = 650
                } else {
                    GarageIcon1.setFrame(0)
                    player1.y = 642
                }
            })
            //This is so when it's selected it makes all the other cars unselected
            GarageIcon1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
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
                //sets the sprite to current car
                localStorage.setItem("car", "assets/images/Cars/Player.png");
            })
            //check for if the car isn't unlocked
        } else if (P1 == "false") {
            //sets locked icon interactive
            GarageIconLocked1.setInteractive();
            //when icon clicked
            GarageIconLocked1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                //sets not enough money text to not visible
                notEnoughMoney.visible = false;
                //the if statement prevents the user from buying multiple cars for the price of one
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 0;
                    //popup appears varifying if you want to buy the car
                    //all other buttons are defined beforehand in the beggining
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    //when buy button is pressed it selects that car to be current car
                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        //i couldve prevented this a numerous amount of ways but i just did this cuz why not
                        if (notEnoughMoney.visible == false) {
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
                            //sets the locked icon to false
                            GarageIconLocked1.visible = false;
                            //sets the Unlocked/Locked variable to true
                            localStorage.setItem("P1", true);
                            //selects that car to be current car
                            GarageIcon1.setFrame(3);
                            player1.y = 650
                            localStorage.setItem("car", "assets/images/Cars/Player.png");
                        } else {
                            //sets the not enough money text
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }



        player2 = this.physics.add.sprite(400, 642, 'player2');
        GarageIcon2 = this.add.image(400, 650, 'garageIcon');
        GarageIconLocked2 = this.add.image(400, 650, 'lockedIcon')
        if (localStorage.getItem("car") == 'assets/images/Cars/RedCar.png') {
            GarageIcon2.setFrame(3)
            player2.y = 650
        }
        if (P2 == "true") {
            GarageIconLocked2.visible = false;
            GarageIcon2.setInteractive();
            GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/RedCar.png') {
                    GarageIcon2.setFrame(3)
                    player2.y = 650
                } else {
                    GarageIcon2.setFrame(1)
                    player2.y = 642
                }
            })
            GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/RedCar.png') {
                    GarageIcon2.setFrame(3)
                    player2.y = 650
                } else {
                    GarageIcon2.setFrame(0)
                    player2.y = 642
                }
            })
            GarageIcon2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
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
                localStorage.setItem("car", "assets/images/Cars/RedCar.png");

            })
        } else if (P2 == "false") {
            GarageIconLocked2.setInteractive();
            GarageIconLocked2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 100;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
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
                            localStorage.setItem("P2", true);
                            GarageIcon2.setFrame(3);
                            player2.y = 650
                            localStorage.setItem("car", "assets/images/Cars/RedCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        player3 = this.physics.add.sprite(600, 642, 'player3');
        GarageIcon3 = this.add.image(600, 650, 'garageIcon');
        GarageIconLocked3 = this.add.image(600, 650, 'lockedIcon');
        //change what happens if == to the car
        if (localStorage.getItem("car") == 'assets/images/Cars/MagentaCar.png') {
            GarageIcon3.setFrame(3)
            player3.y = 650
        }
        if (P3 == "true") {
            GarageIconLocked3.visible = false;
            GarageIcon3.setInteractive();
            GarageIcon3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MagentaCar.png') {
                    GarageIcon3.setFrame(3)
                    player3.y = 650
                } else {
                    GarageIcon3.setFrame(1)
                    player3.y = 642
                }
            })
            GarageIcon3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MagentaCar.png') {
                    GarageIcon3.setFrame(3)
                    player3.y = 650
                } else {
                    GarageIcon3.setFrame(0)
                    player3.y = 642
                }
            })
            GarageIcon3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
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
                localStorage.setItem("car", "assets/images/Cars/MagentaCar.png");
            })
        } else if (P3 == "false") {
            GarageIconLocked3.setInteractive();
            GarageIconLocked3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 150;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
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
                            localStorage.setItem("P3", true);
                            GarageIcon3.setFrame(3);
                            player3.y = 650
                            localStorage.setItem("car", "assets/images/Cars/MagentaCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        player4 = this.physics.add.sprite(200, 442, 'player4');
        GarageIcon4 = this.add.image(200, 450, 'garageIcon');
        GarageIconLocked4 = this.add.image(200, 450, 'lockedIcon');
        if (localStorage.getItem("car") == 'assets/images/Cars/LimeCar.png') {
            GarageIcon4.setFrame(3)
            player4.y = 450
        }
        if (P4 == "true") {
            GarageIconLocked4.visible = false;
            GarageIcon4.setInteractive();
            GarageIcon4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/LimeCar.png') {
                    GarageIcon4.setFrame(3)
                    player4.y = 450
                } else {
                    GarageIcon4.setFrame(1)
                    player4.y = 442
                }
            })
            GarageIcon4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/LimeCar.png') {
                    GarageIcon4.setFrame(3)
                    player4.y = 450
                } else {
                    GarageIcon4.setFrame(0)
                    player4.y = 442
                }
            })
            GarageIcon4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
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
                localStorage.setItem("car", "assets/images/Cars/LimeCar.png");
            })
        } else if (P4 == "false") {
            GarageIconLocked4.setInteractive();
            GarageIconLocked4.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 150;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
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
                            localStorage.setItem("P4", true);
                            GarageIcon4.setFrame(3);
                            player4.y = 450
                            localStorage.setItem("car", "assets/images/Cars/LimeCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        darkbirdmobile = this.physics.add.sprite(400, 442, 'darkbirdmobile');
        GarageIcon5 = this.add.image(400, 450, 'garageIcon');
        GarageIconLocked5 = this.add.image(400, 450, 'lockedIcon');
        //change what happens if == to the car
        if (localStorage.getItem("car") == 'assets/images/Cars/DarkBirdMobile.png') {
            GarageIcon5.setFrame(3)
            darkbirdmobile.y = 450
        }
        if (DBM == "true") {
            GarageIconLocked5.visible = false;
            GarageIcon5.setInteractive();
            GarageIcon5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/DarkBirdMobile.png') {
                    GarageIcon5.setFrame(3)
                    darkbirdmobile.y = 450
                } else {
                    GarageIcon5.setFrame(1)
                    darkbirdmobile.y = 442
                }
            })
            GarageIcon5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/DarkBirdMobile.png') {
                    GarageIcon5.setFrame(3)
                    darkbirdmobile.y = 450
                } else {
                    GarageIcon5.setFrame(0)
                    darkbirdmobile.y = 442
                }
            })
            GarageIcon5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
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
                localStorage.setItem("car", "assets/images/Cars/DarkBirdMobile.png");
            })
        } else if (DBM == "false") {
            GarageIconLocked5.setInteractive();
            GarageIconLocked5.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 500;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
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
                            localStorage.setItem("DBM", true);
                            GarageIcon5.setFrame(3);
                            darkbirdmobile.y = 450
                            localStorage.setItem("car", "assets/images/Cars/DarkBirdMobile.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }

        mgcar = this.physics.add.sprite(600, 442, 'mgcar');
        GarageIcon6 = this.add.image(600, 450, 'garageIcon');
        GarageIconLocked6 = this.add.image(600, 450, 'lockedIcon');

        if (localStorage.getItem("car") == 'assets/images/Cars/MGKCar.png') {
            GarageIcon6.setFrame(3)
            mgcar.y = 450
        }
        if (MGC == "true") {
            GarageIconLocked6.visible = false;
            GarageIcon6.setInteractive();
            GarageIcon6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MGKCar.png') {
                    GarageIcon6.setFrame(3)
                    mgcar.y = 450
                } else {
                    GarageIcon6.setFrame(1)
                    mgcar.y = 442
                }
            })
            GarageIcon6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if (localStorage.getItem("car") == 'assets/images/Cars/MGKCar.png') {
                    GarageIcon6.setFrame(3)
                    mgcar.y = 450
                } else {
                    GarageIcon6.setFrame(0)
                    mgcar.y = 442
                }
            })
            GarageIcon6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
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
                localStorage.setItem("car", "assets/images/Cars/MGKCar.png");
            })
        } else if (MGC == "false") {
            GarageIconLocked6.setInteractive();
            GarageIconLocked6.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                notEnoughMoney.visible = false;
                if (infoPopUp.visible == false) {
                    //price also changed per car
                    price = 1000;
                    popUpText.setText("Are you sure you\nwant to buy this car \nfor " + price + " Dbucks?");
                    infoPopUp.visible = true;
                    cancelButton.visible = true;
                    buyButton.visible = true;
                    popUpText.visible = true;

                    buyButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        if (notEnoughMoney.visible == false) {
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
                            localStorage.setItem("MGC", true);
                            GarageIcon6.setFrame(3);
                            mgcar.y = 450
                            localStorage.setItem("car", "assets/images/Cars/MGKCar.png");
                        } else {
                            notEnoughMoney.visible = true;
                        }
                    })
                }
            })
        }


        //Defines Layers And Border Physics
        const layer = this.add.layer();
        layer.add([GarageBack, backButton, GarageIcon1, GarageIcon2, GarageIcon3, GarageIcon4, GarageIcon5, GarageIcon6, player1, player2, player3, player4, darkbirdmobile, mgcar, GarageIconLocked1, GarageIconLocked2, GarageIconLocked3, GarageIconLocked4, GarageIconLocked5, GarageIconLocked6, infoPopUp, currency, cancelButton, buyButton, popUpText, notEnoughMoney]);



    },
    update: function() {

    }
});