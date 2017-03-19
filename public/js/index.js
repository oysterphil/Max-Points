// Model
var model = { 
	appState: {
        landingPage: true,
        calculator: false,
        resultsPage: false,
        profilePage: false,
        addAnotherCardCount: 1,
        toggleToTos: () => {

            // Hide Current View
            if (model.appState.landingPage) {
                document.getElementById('landingPage').style.display = 'none';
            } else if (model.appState.calculator) {
                document.getElementById('pointsCalculator').style.display = 'none';
            } else if (model.appState.resultsPage) {
                document.getElementById('displayRecommendations').style.display = 'none';
            } else if (model.appState.profilePage) {
                // TO DO: Fill in id of profile page
                document.getElementById('').style.display = 'none';
            }

            // Display TOS
            document.getElementById('termsOfService').style.display = 'inline';

            // Declare Return Function
            function backToViewFromTos() {
               
                // Hide TOS
                document.getElementById('termsOfService').style.display = 'none';

                // Display Current View
                if (model.appState.landingPage) {
                    document.getElementById('landingPage').style.display = 'inline';
                } else if (model.appState.calculator) {
                    document.getElementById('pointsCalculator').style.display = 
                    'inline';
                    model.controllers.setup();
                } else if (model.appState.resultsPage) {
                    document.getElementById('displayRecommendations').style.display = 
                    'inline';
                    model.controllers.displayRecInteractions();
                } else if (model.appState.profilePage) {
                    // TO DO: Fill in id of profile page
                    document.getElementById('').style.display = 'inline';
                }
            }

            // Listen for Back Click
            document.getElementById('termsOfServiceBack').addEventListener('click', 
                backToViewFromTos);
        },
        toggleToPp: () => {

            // Hide Current View
            if (model.appState.landingPage) {
                document.getElementById('landingPage').style.display = 'none';
            } else if (model.appState.calculator) {
                document.getElementById('pointsCalculator').style.display = 'none';
            } else if (model.appState.resultsPage) {
                document.getElementById('displayRecommendations').style.display = 'none';
            } else if (model.appState.profilePage) {
                // TO DO: Fill in id of profile page
                document.getElementById('').style.display = 'none';
            }

            // Display TOS
            document.getElementById('privacyPolicy').style.display = 'inline';

            // Declare Return Function
            function backToViewFromPp() {
               
                // Hide TOS
                document.getElementById('privacyPolicy').style.display = 'none';

                // Display Current View
                if (model.appState.landingPage) {
                    document.getElementById('landingPage').style.display = 'inline';
                } else if (model.appState.calculator) {
                    document.getElementById('pointsCalculator').style.display = 
                    'inline';
                    model.controllers.setup();
                } else if (model.appState.resultsPage) {
                    document.getElementById('displayRecommendations').style.display = 
                    'inline';
                    model.controllers.displayRecInteractions();
                } else if (model.appState.profilePage) {
                    // TO DO: Fill in id of profile page
                    document.getElementById('').style.display = 'inline';
                }
            }

            // Listen for Back Click
            document.getElementById('privacyPolicyBack').addEventListener('click', 
                backToViewFromPp);
        }
    },
    auth: {
        handleCreateAcctWithEmailAndPassword: () => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Signal firstLoginEmailPass: true to Model
            model.appState.firstLoginEmailPass = true;

            model.custMeta.email = email;
            
            // Create Account through Firebase via Email and Password
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email,password);
            promise.catch(e => console.log(e.message));
        },
        handleGoogleRegister: () => {
            // Signal firstLoginEmailPass: false and firstLoginGoogleFacebook: true to Model.
            model.appState.firstLoginEmailPass = false;
            model.appState.firstLoginGoogleFacebook = true;

            // Authenticate through Google
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;

            // The signed-in user info.
            var user = result.user;

            var mystring = user.displayName;
            var arr = mystring.split(" ", 2);

            var firstName = arr[0];
            var lastName = arr[1];
            model.custMeta.uid = user.uid;
            model.custMeta.email = user.email;
            model.custMeta.firstName = firstName;
            model.custMeta.lastName = lastName;

            // Send Google Sign-up Data to Firebase
            firebase.database().ref('custMeta/' + model.custMeta.uid).set({
                firstName: model.custMeta.firstName,
                lastName: model.custMeta.lastName,
                email: model.custMeta.email
            });

            // Send App State Info to Firebase
            firebase.database().ref('custAppState/' + model.custMeta.uid).set({
                registerInfoComplete: model.appState.registerInfoComplete,
                firstLoginEmailPass: model.appState.firstLoginEmailPass,
                firstLoginGoogleFacebook: model.appState.firstLoginGoogleFacebook
            });

            }).catch(function(error) {

                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                // The email of the user's account used.
                var email = error.email;

                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                console.log(errorMessage);
                // ...
            });
        },
        handleAuthStateChange: () => {
            const user = firebase.auth().currentUser;

            if (user) {
              model.custMeta.uid = user.uid;
                  // Complete Login Flow
                  $.ajax({
                      type: 'POST',
                      url: 'https://27952f82.ngrok.io' + 'referralCandy/purchase',
                      // url: 'https://young-plateau-13187.herokuapp.com/' + 'referralCandy/purchase',
                      data: JSON.stringify({  
                          email: email
                      }), 
                      success: function(data) {
                          if (data.message === 'Success') {
                            console.log('It worked.');
                        // delete data.message;
                        // sendRegisterDataToFirebase(data, email, password, firstName, lastName);

                    }
                },
                contentType: "application/json",
                dataType: 'json'
            });

                  if (model.appState.firstLoginEmailPass) {
                    // Change firstLoginEmailPass to False
                    model.appState.firstLoginEmailPass = false;

                    // Send Sign-up Data to Firebase
                    firebase.database().ref('custMeta/' + model.custMeta.uid).set({
                      email: model.custMeta.email
                  }).then(function() {
                      // Send Storage Info to Firebase
                      firebase.database().ref('custStorage/' + model.custMeta.uid).set({
                        storageTerm: model.calculatorInputs.monthEstimate,
                        boxEstimate: model.calculatorInputs.boxEstimate,
                        itemEstimate: model.calculatorInputs.itemEstimate,
                        coupon: model.calculatorInputs.coupon,
                        quoteValue: model.calculatorInputs.quoteValue,
                        monthlyQuoteValue: model.calculatorInputs.monthlyQuoteValue,
                        planEstimate: model.calculatorInputs.planEstimate,
                        priceBoxMonth: model.calculatorInputs.priceBoxMonth,
                        priceItemMonth: model.calculatorInputs.priceItemMonth,
                        discount: model.calculatorInputs.discount,
                        boxActual: null,
                        itemActual: null
                    }).then(function(){
                        // Send Legal Info to Firebase
                        firebase.database().ref('custLegal/' + model.custMeta.uid).set({
                          acceptTerms: model.custLegal.acceptTerms
                      }).then(function() {
                          // Send App State Info to Firebase
                          firebase.database().ref('custAppState/' + model.custMeta.uid).set({
                            registerInfoComplete: model.appState.registerInfoComplete,
                            firstLoginEmailPass: model.appState.firstLoginEmailPass,
                            firstLoginGoogleFacebook: model.appState.firstLoginGoogleFacebook,
                            registerInfoComplete: model.appState.registerInfoComplete
                        }).then(function() {
                            window.location = "https://www.storganize.io/storganize-profile";
                        });
                    });
                  });
                });
              }
              if (model.appState.firstLoginGoogleFacebook) {
                model.appState.firstLoginGoogleFacebook = false;
                window.location = "https://www.storganize.io/storganize-profile";
            }
            } else {
                  // No user is signed in.
              }
        }
    },
    destinations: {
        selectionDesktop: null,
        optionsDesktop: {
            europeDesktop: [
                {
                    one: {
                        city: 'CITY1',
                        country: 'COUNTRY1',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                    },
                    two: {
                        city: 'CITY',
                        country: 'COUNTRY',
                        image: '/img/Beirut.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                    },
                    three: {
                        city: 'CITY',
                        country: 'COUNTRY',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                    }
                },
                {
                    one: {
                        city: 'CITY2',
                        country: 'COUNTRY2',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                    },
                    two: {
                        city: 'CITY',
                        country: 'COUNTRY',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                    },
                    three: {
                        city: 'CITY',
                        country: 'COUNTRY',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                    }
                }
            ],
            caribbeanDesktop: [
                {
                    one: {
                        destination: 'Example 1',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    two: {
                        destination: 'Example 2',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    three: {
                        destination: 'Example 3',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    }
                },
                {
                    one: {
                        destination: 'Example 4',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    two: {
                        destination: 'Example 5',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    three: {
                        destination: 'Example 6',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    }
                }
            ],
            asiaDesktop: [
                {
                    one: {
                        destination: 'Example 1',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    two: {
                        destination: 'Example 2',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    three: {
                        destination: 'Example 3',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    }
                }
            ],
            southAmericaDesktop: [
                {
                    one: {
                        destination: 'Example 1',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    two: {
                        destination: 'Example 2',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    three: {
                        destination: 'Example 3',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    }
                }
            ],
            unitedStatesDesktop: [
                {
                    one: {
                        destination: 'Example 1',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    two: {
                        destination: 'Example 2',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    three: {
                        destination: 'Example 3',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    }
                }
            ],
            cashBackLandingPageDesktop: [
                {
                    one: {
                        destination: 'Example 1',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    two: {
                        destination: 'Example 2',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    },
                    three: {
                        destination: 'Example 3',
                        image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                        timeframe: '2 months',
                        points: '40,000 miles',
                        value: '199.95'
                    }
                }
            ]
        },
        selectionMobile: null,
        optionsMobile: {
            europeMobile: [
                {
                        city: 'CITY1',
                        country: 'COUNTRY1',
                        image: '/img/Beirut.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                }, 
                {
                        city: 'CITY2',
                        country: 'COUNTRY2',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                }, 
                {
                        city: 'CITY3',
                        country: 'COUNTRY3',
                        image: '/img/icon.png',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles',
                        value: '199.95',
                        valueUnits: 'estimated fees'
                }
            ],
            caribbeanMobile: [
                {
                    destination: 'Example 1',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 2',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 3',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }
            ],
            asiaMobile: [
                {
                    destination: 'Example 1',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 2',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 3',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }
            ],
            southAmericaMobile: [
                {
                    destination: 'Example 1',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 2',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 3',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }
            ],
            unitedStatesMobile: [
                {
                    destination: 'Example 1',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 2',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 3',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }
            ],
            cashBackLandingPageMobile: [
                {
                    destination: 'Example 1',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 2',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }, 
                {
                    destination: 'Example 3',
                    image: 'https://image.freepik.com/free-vector/sydney-buildings_23-2147522790.jpg',
                    timeframe: '2 months',
                    points: '40,000 miles',
                    value: '199.95'
                }           
            ]
        }
    },
    cards: {
        all: [
            {
                cardName: 'No Credit Card',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'American Express Blue Cash Everyday',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                groceries: 3
            },
            {
                cardName: 'American Express Blue Cash Preferred',
                annualFee: 95,
                everywhere: 1, 
                gas: 3,
                groceries: 6
            },
            {
                cardName: 'American Express Blue Sky',
                annualFee: 0,
                everywhere: 0.75
            },
            {
                cardName: 'American Express Charles Schwabb Investor Card',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'American Express Platinum (Personal)',
                annualFee: 450,
                everywhere: 1,
                airfare: 5,
                uber: 2,
                amexTravel: 2
            },
            {
                cardName: 'American Express Platinum (Business)',
                annualFee: 450,
                everywhere: 1,
                uber: 2,
                amexTravel: 2
            },
            {
                cardName: 'American Express Everyday',
                annualFee: 0,
                everywhere: 1.2,
                groceries: 2.4,
                uber: 2.2,
                amexTravel: 2.2
            },
            {
                cardName: 'American Express Everyday Preferred',
                annualFee: 95,
                everywhere: 1.5,
                gas: 3,
                groceries: 4.5,
                uber: 2.5,
                amexTravel: 2.5 
            },
            {
                cardName: 'American Express Simply Cash Plus Business',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                airfare: 3,
                hotels: 2,
                carRentals: 2,
                socialMediaAdvertising: 2,
                shipping: 2
            },
            {
                cardName: 'American Express Business Gold Rewards',
                annualFee: 175,
                everywhere: 1,
                gas: 2,
                airfare: 3,
                uber: 2,
                amexTravel: 2,
                socialMediaAdvertising: 2,
                shipping: 2
            },
            {
                cardName: 'American Express Premier Rewards Gold',
                annualFee: 195,
                everywhere: 1,
                gas: 2,
                groceries: 2,
                diningOut: 2,
                airfare: 3,
                uber: 2,
                amexTravel: 2
            },
            {
                cardName: 'American Express Corporate Gold',
                annualFee: 0,
                everywhere: 1,
                uber: 2
            },
            {
                cardName: 'American Express Gold',
                annualFee: 160,
                everywhere: 1,
                diningOut: 2,
                airfare: 2,
                uber: 2
            },
            {
                cardName: 'American Express Corporate Platinum',
                annualFee: 0,
                everywhere: 1,
                uber: 2
            },
            {
                cardName: 'American Express Centurion',
                annualFee: 2500,
                everywhere: 1
            },
            {
                cardName: 'American Express Green',
                annualFee: 95,
                everywhere: 1,
                uber: 2,
                amexTravel: 2
            },
            {
                cardName: 'American Express Plum',
                annualFee: 250,
                everywhere: 1.5
            },
            {
                cardName: 'American Express Hilton HHonors',
                annualFee: 0,
                everywhere: 1.5,
                gas: 2.5,
                groceries: 2.5,
                diningOut: 2.5,
                hiltonHotels: 3.5
            },
            {
                cardName: 'American Express Hilton HHonors Surpass',
                annualFee: 75,
                everywhere: 1.5,
                gas: 3,
                groceries: 3,
                diningOut: 3,
                hiltonHotels: 6
            },
            {
                cardName: 'American Express Starwood Preferred Guest Personal',
                annualFee: 95,
                everywhere: 1,
                starwoodAndMarriottHotels: 2
            },
            {
                cardName: 'American Express Starwood Preferred Guest Business',
                annualFee: 95,
                everywhere: 1,
                starwoodAndMarriottHotels: 2
            },
            {
                cardName: 'American Express Gold Delta SkyMiles',
                annualFee: 95,
                everywhere: 1,
                deltaFlights: 2
            },
            {
                cardName: 'American Express Platinum Delta SkyMiles',
                annualFee: 195,
                everywhere: 1,
                deltaFlights: 2
            },
            {
                cardName: 'American Express Delta Reserve',
                annualFee: 450,
                everywhere: 1,
                deltaFlights: 2
            },
            {
                cardName: 'Bank of America BankAmericard Cash Rewards Visa (All Versions)',
                annualFee: 0,
                everywhere: 1,
                gas: 3,
                groceries: 2,
                wholesaleClubs: 2
            },
            {
                cardName: 'Bank of America BankAmericard Travel Rewards Visa',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Bank of America BankAmericard MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Bank of America BankAmericard Rewards Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Bank of America WorldPoints Visa or MasterCard',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Bank of America Alaska Airlines Visa Signature',
                annualFee: 75,
                everywhere: 1,
                alaskaAirlinesFlights: 3
            },
            {
                cardName: 'Bank of America Alaska Airlines Platinum Plus Visa',
                annualFee: 50,
                everywhere: 1,
                alaskaAirlinesFlights: 3
            },
            {
                cardName: 'Bank of America Alaska Airlines Business Visa',
                annualFee: 75,
                everywhere: 1,
                alaskaAirlinesFlights: 3
            },
            {
                cardName: 'Bank of America Virgin Atlantic World Elite MasterCard',
                annualFee: 90,
                everywhere: 1.5,
                virginAtlanticFlights: 3
            },
            {
                cardName: 'Bank of America Cash Rewards For Business MasterCard',
                annualFee: 0,
                everywhere: 1,
                gas: 3,
                diningOut: 2,
                officeSupplyStores: 3
            },
            {
                cardName: 'Bank of America Travel Rewards World MasterCard For Business',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Bank of America Hawaiian Airlines World Elite MasterCard',
                annualFee: 89,
                everywhere: 1,
                hawaiianAirlinesFlights: 2
            },
            {
                cardName: 'Barclaycard Arrival Plus World Elite MasterCard',
                annualFee: 89,
                everywhere: 2.1
            },
            {
                cardName: 'Barclaycard Rewards MasterCard',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                groceries: 2,
                telecommunications: 2,
                cellPhoneServices: null
            },
            {
                cardName: 'Barclaycard Cash Forward MasterCard',
                annualFee: 0,
                everywhere: 1.575
            },
            {
                cardName: 'Barclaycard Ring MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Barclaycard Upromise By Sallie Mae World MasterCard',
                annualFee: 0,
                everywhere: 1,
                groceries: 1,
                telecommunications: 1
            },
            {
                cardName: 'Barclaycard Hawaiian Airlines Business MasterCard',
                annualFee: 89,
                everywhere: 1,
                hawaiianAirlinesFlights: 2
            },
            {
                cardName: 'Barclaycard JetBlue Plus MasterCard',
                annualFee: 99,
                everywhere: 1,
                gas: null,
                groceries: 2,
                diningOut: 2,
                jetblueFlights: 6
            },
            {
                cardName: 'Barclaycard Lufthansa Premier Miles and More MasterCard',
                annualFee: 89,
                everywhere: 1,
                lufthansaFlights: 2
            },
            {
                cardName: 'Barclaycard JetBlue MasterCard',
                annualFee: 0,
                everywhere: 1,
                groceries: 2,
                diningOut: 2,
                jetblueFlights: 3
            },
            {
                cardName: 'Barclaycard JetBlue Business MasterCard',
                annualFee: 99,
                everywhere: 1,
                diningOut: 2,
                officeSupplyStores: 2,
                jetblueFlights: 6
            },
            {
                cardName: 'Barclaycard Frontier Airlines World MasterCard',
                annualFee: 69,
                everywhere: 1,
                frontierAirlinesFlights: 2
            },
            {
                cardName: 'Capital One Quicksilver MasterCard or Visa',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One Quicksilver One MasterCard or Visa',
                annualFee: 39,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One Venture Rewards Visa',
                annualFee: 59,
                everywhere: 2
            },
            {
                cardName: 'Capital One Venture One Rewards Visa',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'Capital One Platinum MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Capital One Secured MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Capital One Journey Student Rewards Visa',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'Capital One Buy Power MasterCard',
                annualFee: 0,
                everywhere: 2
            },
            {
                cardName: 'Capital One Spark Cash Select For Business Visa',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One Spark Miles Select For Business Visa',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One Spark Cash For Business Visa',
                annualFee: 59,
                everywhere: 2
            },
            {
                cardName: 'Capital One Spark Miles For Business Visa',
                annualFee: 59,
                everywhere: 2
            },
            {
                cardName: 'Capital One Spark Classic For Business Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Capital One BuyPower For Business MasterCard',
                annualFee: 0,
                everywhere: 1,
                gas: 3,
                diningOut: 3,
                officeSupplyStores: 3
            },
            {
                cardName: 'Capital One Cash Rewards Visa or MasterCard',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One Platinum Visa',
                annualFee: 19,
                everywhere: 0
            },
            {
                cardName: 'Capital One Platinum Prestige Visa or MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Capital One Spark Select For Business Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Chase Freedom Unlimited Visa',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Chase Freedom Visa',
                annualFee: 0,
                everywhere: 1,
                gas: 5,
                groceries: 5,
                diningOut: 5,
                uber: 5,
                localTransportation: 5,
                drugstores: 5,
                departmentStores: 5
            },
            {
                cardName: 'Chase Sapphire Preferred Visa',
                annualFee: 95,
                everywhere: 1,
                diningOut: 2,
                travel: 2
            },
            {
                cardName: 'Chase Sapphire Reserve Visa',
                annualFee: 450,
                everywhere: 1,
                diningOut: 3,
                travel: 3
            },
            {
                cardName: 'Chase Ink Plus or Bold Business Visa or MasterCard',
                annualFee: 95,
                everywhere: 1,
                gas: 2,
                hotels: 2,
                telecommunications: 5,
                officeSupplyStores: 5
            },
            {
                cardName: 'Chase Ink Cash Business Visa',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                telecommunications: 5,
                officeSupplyStores: 5
            },
            {
                cardName: 'Chase Ink Business Preferred Visa',
                annualFee: 95,
                everywhere: 1,
                diningOut: 3,
                travel: 3,
                telecommunications: 3,
                socialMediaAdvertising: 3,
                shipping: 3
            },
            {
                cardName: 'Chase Slate Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Chase Marriott Rewards Premier Visa',
                annualFee: 85,
                everywhere: 1,
                diningOut: 2,
                airfare: 2,
                carRentals: 2,
                marriottAndStarwoodHotels: 5
            },
            {
                cardName: 'Chase Marriott Rewards Premier Business Visa',
                annualFee: 99,
                everywhere: 1,
                diningOut: 2,
                airfare: 2,
                carRentals: 2,
                telecommunications: 2,
                officeSupplyStores: 2,
                marriottAndStarwoodHotels: 5
            },
            {
                cardName: 'Chase United MileagePlus Explorer Visa',
                annualFee: 95,
                everywhere: 1,
                unitedFlights: 2
            },
            {
                cardName: 'Chase United MileagePlus Club Visa',
                annualFee: 450,
                everywhere: 1.5,
                unitedFlights: 2
            },
            {
                cardName: 'Chase United MileagePlus Explorer Business Visa',
                annualFee: 95,
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                officeSupplyStores: 2,
                unitedFlights: 2
            },
            {
                cardName: 'Chase Amazon Rewards Visa',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                drugstores: 2,
                amazon: 3,
                officeSupplyStores: 2
            },
            {
                cardName: 'Synchrony Bank Amazon Prime Rewards Store Card',
                annualFee: 0,
                everywhere: 1,
                amazon: 5
            },
            {
                cardName: 'Chase Southwest Rapid Rewards Plus Business Visa',
                annualFee: 69,
                everywhere: 1,
                southwestFlights: 2
            },
            {
                cardName: 'Chase Southwest Airlines Rapid Rewards Premier Business Visa',
                annualFee: 99,
                everywhere: 1,
                southwestFlights: 2
            },
            {
                cardName: 'Chase Southwest Airlines Rapid Rewards Premier Visa',
                annualFee: 99,
                everywhere: 1,
                southwestFlights: 2
            },
            {
                cardName: 'Chase Southwest Airlines Rapid Rewards Plus Visa',
                annualFee: 69,
                everywhere: 1,
                southwestFlights: 2
            },
            {
                cardName: 'Chase Hyatt Visa',
                annualFee: 75,
                everywhere: 1,
                diningOut: 2,
                airfare: 2,
                carRentals: 2,
                hyattHotels: 3
            },
            {
                cardName: 'Chase IHG Rewards Club Select MasterCard',
                annualFee: 49,
                everywhere: 1,
                gas: 2,
                groceries: 2,
                diningOut: 2,
                ihgHotels: 5
            },
            {
                cardName: 'Chase Disney Rewards Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Chase Disney Premier Visa',
                annualFee: 49,
                everywhere: 1,
                gas: 2,
                groceries: 2,
                diningOut: 2,
                disneyPurchases: 2
            },
            {
                cardName: 'Chase Ritz Carlton Rewards Visa',
                annualFee: 450,
                everywhere: 1,
                diningOut: 2,
                airfare: 2,
                carRentals: 2,
                ritzCarltonMarriottAndStarwoodHotels: 5
            },
            {
                cardName: 'Chase Marriott Rewards Premier Business Visa Signature',
                annualFee: 99,
                everywhere: 1,
                diningOut: 2,
                airfare: 2,
                carRentals: 2,
                telecommunications: 2,
                officeSupplyStores: 2,
                marriottAndStarwoodHotels: 5
            },
            {
                cardName: 'American Express Mercedes Benz',
                annualFee: 95,
                everywhere: 1,
                gas: 3,
                diningOut: 2,
                selectMercedesPurchases: 5
            },
            {
                cardName: 'American Express Mercedes Benz Platinum',
                annualFee: 475,
                everywhere: 1,
                airfare: 5,
                selectMercedesPurchases: 5
            },
            {
                cardName: 'Citi Double Cash MasterCard',
                annualFee: 0,
                everywhere: 2
            },
            {
                cardName: 'Citi Simplicity MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Citi Diamond Preferred MasterCard',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Citi Costco Anywhere Visa',
                annualFee: 0,
                everywhere: 1,
                gas: 4,
                diningOut: 3,
                travel: 3,
                costco:2
            },
            {
                cardName: 'Citi Costco Anywhere Business Visa',
                annualFee: 0,
                everywhere: 1,
                gas: 4,
                diningOut: 3,
                travel: 3,
                costco:2
            },
            {
                cardName: 'Citi Thank You Prestige MasterCard',
                annualFee: 450,
                everywhere: 1,
                diningOut: 2,
                airfare: 3,
                hotels: 3,
                entertainment:2
            },
            {
                cardName: 'Citi Thank You Premier MasterCard',
                annualFee: 95,
                everywhere: 1,
                gas: 3,
                diningOut: 2,
                travel: 3,
                entertainment:2
            },
            {
                cardName: 'Citi Secured MasterCard',
                annualFee: 0,
                everywhere: 0            
            },
            {
                cardName: 'Citi Thank You Preferred MasterCard',
                annualFee: 0,
                everywhere: 1,
                diningOut: 2,
                entertainment:2
            },
            {
                cardName: 'Citi Forward MasterCard or Visa',
                annualFee: 0,
                everywhere: 1,
                diningOut: 2,
                entertainment:2
            },
            {
                cardName: 'Citi American Airlines AAdvantage Executive World Elite MasterCard',
                annualFee: 450,
                everywhere: 1,
                americanAirlinesFlights: 2
            },
            {
                cardName: 'Citi American Airlines AAdvantage Platinum Select World Elite MasterCard',
                annualFee: 95,
                everywhere: 1,
                americanAirlinesFlights: 2
            },
            {
                cardName: 'Citi Business American Airlines AAdvantage Platinum Select MasterCard',
                annualFee: 95,
                everywhere: 1,
                gas: 2,
                carRentals: 2,
                telecommunications: 2,
                americanAirlinesFlights: 2
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Red World Elite MasterCard',
                annualFee: 95,
                everywhere: 1,  
                americanAirlinesFlights: 2
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Silver World Elite MasterCard',
                annualFee: 195,
                everywhere: 1,
                hotels: 2,
                carRentals: 2,
                americanAirlinesFlights: 3
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Mastercard',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Blue Mastercard',
                annualFee: 49,
                everywhere: 1,
                americanAirlinesFlights: 2
            },
            {
                cardName: 'Discover It',
                annualFee: 0,
                everywhere: 1,
                gas: 5,
                diningOut: 5,
                localTransportation: 5,
                departmentStores: 5,
                amazon: 5,
                wholesaleClubs: 5
            },
            {
                cardName: 'Discover It Miles',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Discover It Secured Card',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2
            },
            {
                cardName: 'Discover It Chrome',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2
            },
            {
                cardName: 'Discover More',
                annualFee: 0,
                everywhere: 1,
                gas: 5,
                diningOut: 5,
                localTransportation: 5,
                departmentStores: 5,
                amazon: 5,
                wholesaleClubs: 5
            },
            {
                cardName: 'Discover Business Card',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                officeSupplyStores: 5
            },
            {
                cardName: 'Wells Fargo Cash Wise Visa',
                annualFee: 0,
                Everywhere: 1.5
            },
            {
                cardName: 'Wells Fargo Propel 365 By American Express',
                annualFee: 45,
                everywhere: 1,
                gas: 3,
                diningOut: 2
            },
            {
                cardName: 'Wells Fargo Platinum Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Wells Fargo Rewards Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Wells Fargo Propel By American Express',
                annualFee: 0,
                everywhere: 1,
                gas: 3,
                diningOut: 2
            },
            {
                cardName: 'Wells Fargo Secured Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Wells Fargo Business VIsa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Citi Hilton HHonors Visa Signature',
                annualFee: 1,
                everywhere: 0,
                gas: 1.5,
                groceries: 1.5,
                drugstores: 1.5,
                hiltonHotels: 3
            },
            {
                cardName: 'Citi Hilton HHonors Reserve Visa',
                annualFee: 95,
                everywhere: 1.5,
                airfare: 2.5,
                carRentals: 2.5,
                hiltonHotels: 5
            },
            {
                cardName: 'USAA Platinum Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'USAA Cash Rewards World MasterCard',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'USAA Preferred Cash Rewards World MasterCard',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'USAA Rate Advantage Platinum Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'USAA Rewards Visa or World MasterCard',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'USAA Active Military MasterCard',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'USAA Secured Card By American Express',
                annualFee: 35,
                everywhere: 0
            },
            {
                cardName: 'USAA Rewards By American Express',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                groceries: 2
            },
            {
                cardName: 'USAA Cash Rewards By American Express',
                annualFee: 0,
                everywhere: 1.25,
                gas: 2.25,
                groceries: 2.25
            },
            {
                cardName: 'TD Cash Rewards or Cash Rewards Platinum Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'TD Cash Visa',
                annualFee: 0,
                everywhere: 1,
                diningOut: 2
            },
            {
                cardName: 'TD Business Solutions Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'TD Easy Rewards Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'TD Aeroplan Visa',
                annualFee: 95,
                everywhere: 1,
                airCanadaFlights: 2
            },
            {
                cardName: 'Lowe’s Credit Card',
                annualFee: 0,
                everywhere: 1,
                lowes: 5
            },
            {
                cardName: 'Target Credit Card',
                annualFee: 0,
                everywhere: 1,
                target:5
            },
            {
                cardName: 'Banana Republic Credit Card',
                annualFee: 0,
                everywhere: 1,
                bananaRepublic: 5
            },
            {
                cardName: 'Walmart Credit Card',
                annualFee: 0,
                everywhere: 1,
                walmartOnline: 3
            },
            {
                cardName: 'Other Store Card',
                annualFee: 0,
                everywhere: 1,
                oneStore: 5
            },
            {
                cardName: 'Other No Annual Fee Card',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'M&T Rewards Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'M&T Business Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'M&T Business Bonus Rewards Visa',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'M&T Business Bonus Rewards Plus Visa',
                annualFee: 50,
                everywhere: 1.5
            },
            {
                cardName: 'M&T Visa Signature',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Suntrust Cash Rewards MasterCard',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                groceries: 2
            },
            {
                cardName: 'Suntrust Travel Rewards MasterCard',
                annualFee: 89,
                everywhere: 1,
                travel: 3
            },
            {
                cardName: 'Suntrust Prime Rewards MasterCard',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Suntrust Business Visa or MasterCard',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Other Personal Bank Credit Card',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Other Business Bank Credit Card',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'PNC CashBuilder Visa',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'PNC Core Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'PNC Points Visa',
                annualFee: 0,
                everywhere: 1.17
            },
            {
                cardName: 'PNC Premier Traveler Visa Signature',
                annualFee: 85,
                everywhere: 2
            },
            {
                cardName: 'PNC Points Business Visa',
                annualFee: 0,
                everywhere: 1.35
            },
            {
                cardName: 'PNC Business Cash Rewards Visa Signature',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'PNC Business Travel Rewards Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'PNC Business Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Barclaycard Wyndham Rewards Visa Signature',
                annualFee: 0,
                everywhere: 0.6,
                gas: 1.2,
                groceries: 1.5,
                telecommunications: 1.2,
                Wyndham: 1.8
            },
            {
                cardName: 'Barclaycard Wyndham Rewards Visa Signature (Annual Fee Version)',
                annualFee: 75,
                everywhere: 0.6,
                gas: 1.2,
                groceries: 1.2,
                telecommunications: 1.2,
                Wyndham: 3
            },
            {
                 cardName: 'US Bank Cash Plus Visa Signature',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                groceries: 2,
                departmentStores: 5
            },
            {
                cardName: 'US Bank Club Carlson Premier Rewards Visa Signature',
                annualFee: 75,
                everywhere: 2,
                clubCarlsonHotels: 4
            },
            {
                cardName: 'US Bank Club Carlson Rewards Visa Signature',
                annualFee: 50,
                everywhere: 1.2,
                clubCarlsonHotels: 2.4
            },
            {
                cardName: 'US Bank Club Carlson Rewards Visa',
                annualFee: 0,
                everywhere: .4,
                clubCarlsonHotels: 1.2
            },
            {
                cardName: 'US Bank Club Carlson Business Rewards Visa',
                annualFee: 60,
                everywhere: 2,
                clubCarlsonHotels: 4
            },
            {
                cardName: 'US Bank Cash Rewards Business Visa',
                annualFee: 0,
                everywhere: 1,
                gas: 3,
                cellPhoneServices: 3,
                officeSupplyStores: 3
            },
            {
                cardName: 'US Bank Flexperks Business Select Visa',
                annualFee: 0,
                everywhere: 1.8
            },
            {
                cardName: 'US Bank Flexperks Business Travel Rewards Visa',
                annualFee: 55,
                everywhere: 1.8,
                gas: 3.6,
                cellPhoneServices: 3.6
            },
            {
                cardName: 'US Bank Flexperks Travel Rewards Visa',
                annualFee: 49,
                everywhere: 1.8,
                groceries: 3.6,
                charitableDonations: 5.4
            },
            {
                cardName: 'US Bank Flexperks By American Express',
                annualFee: 0,
                everywhere: 1.8
            },
            {
                cardName: 'Best Western Rewards Secured MasterCard',
                annualFee: 40,
                everywhere: 0.5,
                bestWesternHotels:1.5
            },
            {
                cardName: 'Best Western Rewards Premier MasterCard',
                annualFee: 59,
                everywhere: 0.5,
                bestWesternHotels: 5
            },
            {
                cardName: 'Best Western Rewards MasterCard',
                annualFee: 0,
                everywhere: 0.5,
                bestWesternHotels: 1.5
            },
            {
                cardName: 'Best Western Rewards Business MasterCard',
                annualFee: 55,
                everywhere: 0.5,
                bestWesternHotels: 1.5
            },
            {
                cardName: 'Choice Privileges Visa Signature ',
                annualFee: 0,
                everywhere: 1,
                choiceHotels: 2.5
            },
            {
                cardName: 'JP Morgan Chase Palladium Visa Signature',
                annualFee: 595,
                everywhere: 1,
                travel: 2
            },
            {
                cardName: 'Chase British Airways Avios Visa Signature',
                annualFee: 95,
                everywhere: 1,
                britishAirwaysFlights: 3
            },
            {
                cardName: 'Bank of America Allegiant Airlines World MasterCard',
                annualFee: 59,
                everywhere: 1,
                diningOut: 2,
                allegiantAirlinesFlights: 3
            },
            {
                cardName: 'Bank of America Spirit Airlines World MasterCard',
                annualFee: 59,
                everywhere: 1
            },
            {
                cardName: 'Comenity Bank Virgin America Visa Signature',
                annualFee: 49,
                everywhere: 1,
                virginAmericaFlights: 3
            },
            {
                cardName: 'Comenity Bank Virgin America Premium Visa Signature',
                annualFee: 149,
                everywhere: 1,
                virginAmericaFlights: 3
            }
        ],
        categories: [
            'oneStore',
            'localTranportationYearOne',
            'departmentStoresYearOne',
            'amazonYearOne',
            'wholesaleClubsYearOne',
            'everywhereYearOne',
            'gasYearOne',
            'diningOutYearOne',
            'deltaFlights',
            'hiltonHotels',
            'entertainment',
            'starwoodAndMarriottHotels',
            'hiltonHotels',
            'alaskaAirlinesFlights',
            'virginAtlanticFlights',
            'hawaiianAirlinesFlights',
            'jetblueFlights',
            'lufthansaFlights',
            'frontierAirlinesFlights',
            'marriottAndStarwoodHotels ',
            'unitedFlights',
            'southwestFlights',
            'hyattHotels',
            'ihgHotels',
            'disneyPurchases',
            'ritzCarltonMarriottAndStarwoodHotels',
            'selectMercedesPurchases',
            'costco',
            'samsClub',
            'americanAirlinesFlights ',
            'airCanadaFlights',
            'lowes',
            'target',
            'bananaRepublic ',
            'walmartOnline ',
            'wyndham',
            'clubCarlsonHotels',
            'bestWesternHotels',
            'choiceHotels ',
            'britishAirwaysFlights',
            'spiritAirlinesFlights ',
            'virginAmericaFlights ',
            'annualFee',
            'everywhere',
            'gas',
            'groceries',
            'diningOut',
            'travel',
            'airfare',
            'hotels',
            'carRentals',
            'uber',
            'localTransportation',
            'amexTravel',
            'drugstores',
            'departmentStores',
            'amazon',
            'telecommunications',
            'cellPhoneServices',
            'officeSupplyStores',
            'socialMediaAdvertising',
            'shipping',
            'wholesaleClubs',
            'singleHotelChain',
            'singleAirline'
        ],
        justCardNames: [
            'No Credit Card',
            'American Express Blue Cash Everyday',
            'American Express Blue Cash Preferred',
            'American Express Blue Sky',
            'American Express Charles Schwabb Investor Card',
            'American Express Platinum (Personal)',
            'American Express Platinum (Business)',
            'American Express Everyday',
            'American Express Everyday Preferred',
            'American Express Simply Cash Plus Business',
            'American Express Business Gold Rewards',
            'American Express Premier Rewards Gold',
            'American Express Corporate Gold',
            'American Express Gold',
            'American Express Corporate Platinum',
            'American Express Centurion',
            'American Express Green',
            'American Express Plum',
            'American Express Hilton HHonors',
            'American Express Hilton HHonors Surpass',
            'American Express Starwood Preferred Guest Personal',
            'American Express Starwood Preferred Guest Business',
            'American Express Gold Delta SkyMiles',
            'American Express Platinum Delta SkyMiles',
            'American Express Delta Reserve',
            'Bank of America BankAmericard Cash Rewards Visa (All Versions)',
            'Bank of America BankAmericard Travel Rewards Visa',
            'Bank of America BankAmericard MasterCard',
            'Bank of America BankAmericard Rewards Visa',
            'Bank of America WorldPoints Visa or MasterCard',
            'Bank of America Alaska Airlines Visa Signature',
            'Bank of America Alaska Airlines Platinum Plus Visa',
            'Bank of America Alaska Airlines Business Visa',
            'Bank of America Virgin Atlantic World Elite MasterCard',
            'Bank of America Cash Rewards For Business MasterCard',
            'Bank of America Travel Rewards World MasterCard For Business',
            'Bank of America Hawaiian Airlines World Elite MasterCard',
            'Barclaycard Arrival Plus World Elite MasterCard',
            'Barclaycard Rewards MasterCard',
            'Barclaycard Cash Forward MasterCard',
            'Barclaycard Ring MasterCard',
            'Barclaycard Upromise By Sallie Mae World MasterCard',
            'Barclaycard Hawaiian Airlines Business MasterCard',
            'Barclaycard JetBlue Plus MasterCard',
            'Barclaycard Lufthansa Premier Miles and More MasterCard',
            'Barclaycard JetBlue MasterCard',
            'Barclaycard JetBlue Business MasterCard',
            'Barclaycard Frontier Airlines World MasterCard',
            'Capital One Quicksilver MasterCard or Visa',
            'Capital One Quicksilver One MasterCard or Visa',
            'Capital One Venture Rewards Visa',
            'Capital One Venture One Rewards Visa',
            'Capital One Platinum MasterCard',
            'Capital One Secured MasterCard',
            'Capital One Journey Student Rewards Visa',
            'Capital One Buy Power MasterCard',
            'Capital One Spark Cash Select For Business Visa',
            'Capital One Spark Miles Select For Business Visa',
            'Capital One Spark Cash For Business Visa',
            'Capital One Spark Miles For Business Visa',
            'Capital One Spark Classic For Business Visa',
            'Capital One BuyPower For Business MasterCard',
            'Capital One Cash Rewards Visa or MasterCard',
            'Capital One Platinum Visa',
            'Capital One Platinum Prestige Visa or MasterCard',
            'Capital One Spark Select For Business Visa',
            'Chase Freedom Unlimited Visa',
            'Chase Freedom Visa',
            'Chase Sapphire Preferred Visa',
            'Chase Sapphire Reserve Visa',
            'Chase Ink Plus or Bold Business Visa or MasterCard',
            'Chase Ink Cash Business Visa',
            'Chase Ink Business Preferred Visa',
            'Chase Slate Visa',
            'Chase Marriott Rewards Premier Visa',
            'Chase Marriott Rewards Premier Business Visa',
            'Chase United MileagePlus Explorer Visa',
            'Chase United MileagePlus Club Visa',
            'Chase United MileagePlus Explorer Business Visa',
            'Chase Amazon Rewards Visa',
            'Synchrony Bank Amazon Prime Rewards Store Card',
            'Chase Southwest Rapid Rewards Plus Business Visa',
            'Chase Southwest Airlines Rapid Rewards Premier Business Visa',
            'Chase Southwest Airlines Rapid Rewards Premier Visa',
            'Chase Southwest Airlines Rapid Rewards Plus Visa',
            'Chase Hyatt Visa',
            'Chase IHG Rewards Club Select MasterCard',
            'Chase Disney Rewards Visa',
            'Chase Disney Premier Visa',
            'Chase Ritz Carlton Rewards Visa',
            'Chase Marriott Rewards Premier Business Visa Signature',
            'American Express Mercedes Benz',
            'American Express Mercedes Benz Platinum',
            'Citi Double Cash MasterCard',
            'Citi Simplicity MasterCard',
            'Citi Diamond Preferred MasterCard',
            'Citi Costco Anywhere Visa',
            'Citi Costco Anywhere Business Visa',
            'Citi Thank You Prestige MasterCard',
            'Citi Thank You Premier MasterCard',
            'Citi Secured MasterCard',
            'Citi Thank You Preferred MasterCard',
            'Citi Forward MasterCard or Visa',
            'Citi American Airlines AAdvantage Executive World Elite MasterCard',
            'Citi American Airlines AAdvantage Platinum Select World Elite MasterCard',
            'Citi Business American Airlines AAdvantage Platinum Select MasterCard',
            'Barclaycard American Airlines AAdvantage Aviator Red World Elite    MasterCard',
            'Barclaycard American Airlines AAdvantage Aviator Silver World Elite MasterCard',
            'Barclaycard American Airlines AAdvantage Aviator Mastercard',
            'Barclaycard American Airlines AAdvantage Aviator Blue Mastercard',
            'Discover It',
            'Discover It Miles',
            'Discover It Secured Card',
            'Discover It Chrome',
            'Discover More',
            'Discover Business Card',
            'Wells Fargo Cash Wise Visa',
            'Wells Fargo Propel 365 By American Express',
            'Wells Fargo Platinum Visa',
            'Wells Fargo Rewards Visa',
            'Wells Fargo Propel By American Express',
            'Wells Fargo Secured Visa',
            'Wells Fargo Business VIsa',
            'Citi Hilton HHonors Visa Signature',
            'Citi Hilton HHonors Reserve Visa',
            'USAA Platinum Visa',
            'USAA Cash Rewards World MasterCard',
            'USAA Preferred Cash Rewards World MasterCard',
            'USAA Rate Advantage Platinum Visa',
            'USAA Rewards Visa or World MasterCard',
            'USAA Active Military MasterCard',
            'USAA Secured Card By American Express',
            'USAA Rewards By American Express',
            'USAA Cash Rewards By American Express',
            'TD Cash Rewards or Cash Rewards Platinum Visa',
            'TD Cash Visa',
            'TD Business Solutions Visa',
            'TD Easy Rewards Visa',
            'TD Aeroplan Visa',
            'Lowe’s Credit Card',
            'Target Credit Card',
            'Banana Republic Credit Card',
            'Walmart Credit Card',
            'Other Store Card',
            'Other No Annual Fee Card',
            'M&T Rewards Visa',
            'M&T Business Visa',
            'M&T Business Bonus Rewards Visa',
            'M&T Business Bonus Rewards Plus Visa',
            'M&T Visa Signature',
            'Suntrust Cash Rewards MasterCard',
            'Suntrust Travel Rewards MasterCard',
            'Suntrust Prime Rewards MasterCard',
            'Suntrust Business Visa or MasterCard',
            'Other Personal Bank Credit Card',
            'Other Business Bank Credit Card',
            'PNC CashBuilder Visa',
            'PNC Core Visa',
            'PNC Points Visa',
            'PNC Premier Traveler Visa Signature',
            'PNC Points Business Visa',
            'PNC Business Cash Rewards Visa Signature',
            'PNC Business Travel Rewards Visa',
            'PNC Business Visa',
            'Barclaycard Wyndham Rewards Visa Signature',
            'Barclaycard Wyndham Rewards Visa Signature (Annual Fee Version)',
            'US Bank Cash Plus Visa Signature',
            'US Bank Club Carlson Premier Rewards Visa Signature',
            'US Bank Club Carlson Rewards Visa Signature',
            'US Bank Club Carlson Rewards Visa',
            'US Bank Club Carlson Business Rewards Visa',
            'US Bank Cash Rewards Business Visa',
            'US Bank Flexperks Business Select Visa',
            'US Bank Flexperks Business Travel Rewards Visa',
            'US Bank Flexperks Travel Rewards Visa',
            'US Bank Flexperks By American Express',
            'Best Western Rewards Secured MasterCard',
            'Best Western Rewards Premier MasterCard',
            'Best Western Rewards MasterCard',
            'Best Western Rewards Business MasterCard',
            'Choice Privileges Visa Signature ',
            'JP Morgan Chase Palladium Visa Signature',
            'Chase British Airways Avios Visa Signature',
            'Bank of America Allegiant Airlines World MasterCard',
            'Bank of America Spirit Airlines World MasterCard',
            'Comenity Bank Virgin America Visa Signature',
            'Comenity Bank Virgin America Premium Visa Signature'
        ],
        userSelections: [],
        currentStatusBasedOnSelections: {
        	email: null,
        	ownBusiness: null,
        	creditScore: null,
    		rewardsGoal: null,
            monthlySpend: null,
    		totalAnnualFee: null        
        },
        currentCategoriesArray: {
        },
        possiblePersRecs: [
            {
                cardName: 'Discover It',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 5,
                    diningOut: 5,
                    localTransportation: 5,
                    departmentStores: 5,
                    amazon: 5,
                    wholesaleClubs: 5
                },
                cardDetails: {
                    cardImage: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some bonus details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some annual fee details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some extra benefits details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some redemption details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some analysis details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 50,
                        bonusCopy: 'Here is some signup bonus copy.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png'
                }
            },
            {
                cardName: 'Discover It Secured Card',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 2,
                    diningOut: 2
                },
                cardDetails: {
                    cardImage: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 500,
                        bonusCopy: 'Here is some signup bonus copy.'
                    },
                    earningRateIncrease: 100,
                    affiliateLink: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png'
                }
            },
            {
                cardName: 'Capital One Quicksilver One MasterCard or Visa',
                annualFee: 39,
                categories: {
                    everywhere: 1.5
                },
                howCardIncreasesPoints: [
                    '$39 annual fee.',
                    '1.5% cash back everywhere.',
                    'No foreign transaction fees.'
                ]
            },
            {
                cardName: 'Citi Double Cash MasterCard',
                annualFee: 0,
                categories: {
                    everywhere: 2
                },
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '2% cash back everywhere.',
                    'Access to Citi Price Rewind automatic savings on purchase price drops.'
                ]
            },
            {
                cardName: 'Chase Freedom Visa',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 5,
                    groceries: 5,
                    diningOut: 5,
                    uber: 5,
                    localTransportation: 5,
                    drugstores: 5,
                    departmentStores: 5
                },
                cardDetails: {
                    cardImage: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        },
                        {
                            icon: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png',
                            detail: 'Here are some details.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 150,
                        bonusCopy: 'Here is some signup bonus copy.'
                    },
                    earningRateIncrease: 50,
                    affiliateLink: 'https://cache.addthiscdn.com/icons/v3/thumbs/32x32/email.png'
                }
            },
            {
                cardName: 'Barclaycard Arrival Plus World Elite MasterCard',
                annualFee: 89,
                categories: {
                    everywhere: 2.1
                },
                signUpBonus: '50,000 points (plus 5% redemption bonus=52,500) after spending $3,000 in the first three months.',
                howCardIncreasesPoints: [
                    'Card earns 2% everywhere (2.1% with bonus).',
                    'Receive 5% of points back every time you redeem.',
                    '$89 annual fee waived for the first year.',
                    'Free TransUnion FICO score updated monthly.',
                    'No foreign transaction fees.',
                    'Chip and pin enabled.'
                ]
            },
            {
                cardName: 'Discover It Miles',
                annualFee: 0,
                categories: {
                    everywhere: 1.5
                },
                howCardIncreasesPoints: [
                    '1.5% cash back everywhere and 3% in year one.',
                    'No foreign transaction fees.',
                    'Free TransUnion FICO score updated monthly. ',
                    'Access to Discover Deals online shopping portal.',
                    '$30 of free inflight wifi annually.',
                    'All cash back doubled at the end of year one.'
                ]
            },
            {
                cardName: 'Chase Freedom Unlimited Visa',
                annualFee: 0,
                categories: {
                    everywhere: 1.5
                },
                signUpBonus: '15,000 points after spending $500 in the first three months.',
                howCardIncreasesPoints: [
                    '1.5x everywhere.',
                    'Access to Chase’s online shopping portal.',
                    'Points are cash back but if the same cardholder has the Chase Sapphire Preferred, Reserve, Ink Plus, Ink Bold or Ink Preferred, then all points are transferable to many frequent flyer and hotel loyalty programs for even more value.'
                ]
            },
            {
                cardName: 'Chase Sapphire Preferred Visa',
                annualFee: 95,
                categories: {
                    everywhere: 1,
                    diningOut: 2,
                    travel: 2
                },
                signUpBonus: '50,000 points after spending $4,000 in the first three months.',
                howCardIncreasesPoints: [
                    '$95 annual fee waived the first year.',
                    '1x everywhere.',
                    '2x on travel (from airfare to hotels, cruises, car rentals, travel agencies, trains, uber, tolls, parking and more).',
                    '2x on dining.',
                    'No foreign transaction fees.',
                    'Access to Chase’s online shopping portal.',
                    'Complimentary primary rental car and flight delay insurance.',
                    'Points are directly transferable to many frequent flyer and hotel loyalty programs for even more value.'
                ]
            },
            {
                cardName: 'Chase Sapphire Reserve Visa',
                annualFee: 450,
                categories: {
                    everywhere: 1,
                    diningOut: 3,
                    travel: 3
                },
                signUpBonus: '100,000 points after spending $4,000 in the first three months.',
                howCardIncreasesPoints: [
                    '$450 annual fee.',
                    '$300 annual automatic reimbursement for travel purchases charged to the card.',
                    'Access to 1,000+ airline lounges worldwide with Priority Pass Select Membership.',
                    '$100 TSA Precheck or Global Entry reimbursement every five years.',
                    '1x everywhere.',
                    '3x on travel (from airfare to hotels, cruises, car rentals, travel agencies, trains, uber, tolls, parking and more).',
                    '3x on dining.',
                    'No foreign transaction fees.',
                    'Access to Chase’s online shopping portal.',
                    'Complimentary primary rental car and flight delay insurance.',
                    'Points are directly transferable to many frequent flyer and hotel loyalty programs for even more value.'
                ]
            },
            {
                cardName: 'American Express Everyday',
                annualFee: 0,
                categories: {
                    everywhere: 1.2,
                    groceries: 2.4,
                    uber: 2.2,
                    amexTravel: 2.2
                },
                signUpBonus: '10,000 points after spending $1,000 in the first three months.',
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '1x (1.2x with bonus) everywhere.',
                    '2x (2.2x with bonus) on Uber & Amex Travel.',
                    '2x (2.4x with bonus) on groceries (up to $6,000 spent annually).',
                    'If you make 20 transactions a month, receive a 20% bonus on points earned.',
                    'Free Experian FICO score updated monthly.',
                    'Access to valuable Amex Sync Offers for automatic savings and bonus points.',
                    'Points are directly transferable to many frequent flyer programs for even more value.'
                ]
            },
            {
                cardName: 'American Express Everyday Preferred',
                annualFee: 95,
                categories: {
                    everywhere: 1.5,
                    gas: 3,
                    groceries: 4.5,
                    uber: 2.5,
                    amexTravel: 2.5
                },
                signUpBonus: '15,000 points after spending $1,000 in the first three months.',
                howCardIncreasesPoints: [
                    '$95 annual fee.',
                    '1x (1.5x with bonus) everywhere.',
                    '2x (2.5x with bonus) on Uber & Amex Travel.',
                    '2x (3x with bonus) on gas.',
                    '3x (4.5x with bonus) on groceries (up to $6,000 spent annually).',
                    'If you make 30 transactions a month, receive a 50% bonus on points earned.',
                    'Free Experian FICO score updated monthly.',
                    'Access to valuable Amex Sync Offers for automatic savings and bonus points.',
                    'Points are directly transferable to many frequent flyer programs for even more value.'
                ]
            },
            {
                cardName: 'Capital One Secured MasterCard',
                annualFee: 0,
                categories: {
                    everywhere: 0
                },
                howCardIncreasesPoints: [
                    'No annual fee.',
                    'No foreign transaction fees.'
                ]
            }
        ],
        possibleBizRecs: [
            {
                cardName: 'Chase Ink Business Preferred Visa',
                annualFee: 95,
                categories: {
                    everywhere: 1,
                    diningOut: 3,
                    travel: 3,
                    telecommunications: 3,
                    socialMediaAdvertising: 3,
                    shipping: 3
                },
                signUpBonus: '80,000 points after spending $5,000 in the first three months.',
                howCardIncreasesPoints: [
                    '$95 annual fee.',
                    '1x everywhere.',
                    '3x on travel (from airfare to hotels, Uber, car rentals and more), internet, TV & phone services, Netflix, shipping purchases, advertising on search engine & social media (Facebook, Adwords, etc.) up to $150,000 in combined spending annually.',
                    'No foreign transaction fees.',
                    'Access to Chase’s online shopping portal.',
                    'Points are directly transferable to many frequent flyer and hotel loyalty programs for even more value.'
                ]
            },
            {
                cardName: 'Capital One Spark Classic For Business Visa',
                annualFee: 0,
                categories: {
                    everywhere: 1
                },
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '1% cash back everywhere.',
                    'No foreign transaction fees.'
                ]
            },
            {
                cardName: 'Capital One Spark Cash Select For Business Visa',
                annualFee: 0,
                categories: {
                    everywhere: 1.5
                },
                signUpBonus: '20,000 points after spending $3,000 in the first three months.',
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '1.5% cash back everywhere.',
                    'No foreign transaction fees.'
                ]
            },
            {
                cardName: 'Capital One Spark Cash For Business Visa',
                annualFee: 59,
                categories: {
                    everywhere: 2
                },
                signUpBonus: '50,000 points after spending $5,000 in the first three months.',
                howCardIncreasesPoints: [
                    '$59 annual fee waived the first year.',
                    '2% cash back everywhere.',
                    'No foreign transaction fees.'
                ]
            },
            {
                cardName: 'Chase Ink Cash Business Visa',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 2,
                    diningOut: 2,
                    telecommunications: 5,
                    officeSupplyStores: 5
                },
                signUpBonus: '30,000 points after spending $3,000 in the first three months.',
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '1% everywhere.',
                    '2% on restaurants & gas (up to $25,000 spent annually).',
                    '5% on on internet, TV & phone services, Netflix & office supply stores (up to $25,000 spent per year).',
                    'Access to Chase’s online shopping portal.',
                    'Points are cash back but if the same cardholder has the Chase Sapphire Preferred, Reserve, Ink Plus, Ink Bold or Ink Preferred, then all points are transferable to many frequent flyer and hotel loyalty programs for even more value.'
                ]
            },
            {
                cardName: 'Citi Business American Airlines AAdvantage Platinum Select MasterCard',
                annualFee: 95,
                categories: {
                    everywhere: 1,
                    gas: 2,
                    carRentals: 2,
                    telecommunications: 2,
                    americanAirlinesFlights: 2
                },
                signUpBonus: '50,000 American Airlines miles after spending $3,000 in the first three months.',
                howCardIncreasesPoints: [
                    '$95 annual fee waived the first year.',
                    '1 AA mile everywhere.',
                    '2 AA miles on AA flights, rental cars, gas, Netflix, internet, TV & phone services.',
                    'No foreign transaction fees.',
                    'Group one boarding on domestic AA flights.',
                    'First checked bag free on domestic AA flights for you & up to four passengers on your itinerary.'
                ]
            }
        ],
        intermediateRecsBiz: [
        ],
        intermediateRecsPers: [
        ],
        finalRecsBiz: [
        ],
        finalRecsPers: [
        ],
        currentDisplayRec: null,
        combinedRecs: [
        ]
    },
    templates: {
        variables: {
            displayRecommendationsTemplate: null,
            carouselGoalSliderDesktopTemplate: null,
            carouselGoalSliderMobileTemplate: null,
            pointsCalculatorTemplate: null
        },
        compile: () => {
            // Compile Display Recommendations Template
            var displayRecommendationsTemplateSource = 
                document.getElementById('displayRecommendationsTemplate').innerHTML;
            model.templates.variables.displayRecommendationsTemplate = 
                Handlebars.compile(displayRecommendationsTemplateSource);

            // Compile Carousel Goal Slider Desktop
            var carouselGoalSliderDesktopTemplateSource = 
                document.getElementById('carouselGoalSliderDesktopTemplate').innerHTML;
            model.templates.variables.carouselGoalSliderDesktopTemplate = 
                Handlebars.compile(carouselGoalSliderDesktopTemplateSource);

            // Compile Carousel Goal Slider Mobile
            var carouselGoalSliderMobileTemplateSource = 
                document.getElementById('carouselGoalSliderMobileTemplate').innerHTML;
            model.templates.variables.carouselGoalSliderMobileTemplate = 
                Handlebars.compile(carouselGoalSliderMobileTemplateSource);

            // Compile Points Calculator Template
            var pointsCalculatorTemplateSource = 
                document.getElementById('pointsCalculatorTemplate').innerHTML;
            model.templates.variables.pointsCalculatorTemplate = 
                Handlebars.compile(pointsCalculatorTemplateSource);
        },
        renderDisplayRecommendationsTemplate: () => {
            var displayRecommendationsTemplateHtml = 
                model.templates.variables.displayRecommendationsTemplate(model.cards);
            document.getElementById('displayRecommendations').innerHTML = 
                displayRecommendationsTemplateHtml;
        },
        renderCarouselGoalSliderDesktopTemplate: () => {
            var carouselGoalSliderDesktopTemplateHtml = 
                model.templates.variables.carouselGoalSliderDesktopTemplate(model.destinations);
            document.getElementById('carouselGoalSliderDesktop').innerHTML = 
                carouselGoalSliderDesktopTemplateHtml;
        },
        renderCarouselGoalSliderMobileTemplate: () => {
            var carouselGoalSliderMobileTemplateHtml = 
                model.templates.variables.carouselGoalSliderMobileTemplate(model.destinations);
            document.getElementById('carouselGoalSliderMobile').innerHTML = 
                carouselGoalSliderMobileTemplateHtml;
        },
        renderPointsCalculatorTemplate: () => {
            var pointsCalculatorTemplateHtml = 
                model.templates.variables.pointsCalculatorTemplate(model.cards);
            document.getElementById('pointsCalculator').innerHTML = 
                pointsCalculatorTemplateHtml;
        }
    },
    controllers: {
        setup: () => {

            // Compile Templates
            model.templates.compile();

            // Set Rewards Goal Selections for Mobile/Desktop to Europe
            model.destinations.selectionDesktop = model.destinations.optionsDesktop.europeDesktop;
            model.destinations.selectionMobile = model.destinations.optionsMobile.europeMobile;
            
            // Render Rewards Goal Tempalates and Establish the View for Mobile/Desktop
            model.templates.renderCarouselGoalSliderDesktopTemplate();
            model.controllers.setupCarouselViewDesktop();
            model.templates.renderCarouselGoalSliderMobileTemplate();
            model.controllers.setupCarouselViewMobile();

            // Landing Page PP and TOS Event Listeners
            document.getElementById('termsOfServiceButtonLpDesktop').addEventListener('click', model.appState.toggleToTos);
            document.getElementById('privacyPolicyButtonLpDesktop').addEventListener('click', model.appState.toggleToPp);
            document.getElementById('termsOfServiceButtonLpMobile').addEventListener('click', model.appState.toggleToTos);
            document.getElementById('privacyPolicyButtonLpMobile').addEventListener('click', model.appState.toggleToPp);
            
            // Rewards Goal Event Listeners 
            $("#rewardsGoalDesktopSelect").on('change', changeRewardGoalViewDesktop);
            $("#rewardsGoalMobileSelect").on('change', changeRewardGoalViewMobile);

            function changeRewardGoalViewDesktop() {

                if ($(this).val().includes('europe')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.europeDesktop;
                } else if ($(this).val().includes('caribbean')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.caribbeanDesktop;
                } else if ($(this).val().includes('asia')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.asiaDesktop;
                } else if ($(this).val().includes('south')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.southAmericaDesktop;
                } else if ($(this).val().includes('united')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.unitedStatesDesktop;
                } else if ($(this).val().includes('cashBack')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.cashBackLandingPageDesktop;
                }

                model.templates.renderCarouselGoalSliderDesktopTemplate();
                model.controllers.setupCarouselViewDesktop();
            }

            function changeRewardGoalViewMobile() {
                
                if ($(this).val().includes('europe')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.europeMobile;
                } else if ($(this).val().includes('caribbean')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.caribbeanMobile;
                } else if ($(this).val().includes('asia')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.asiaMobile;
                } else if ($(this).val().includes('south')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.southAmericaMobile;
                } else if ($(this).val().includes('united')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.unitedStatesMobile;
                } else if ($(this).val().includes('cashBack')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.cashBackLandingPageMobile;
                }

                model.templates.renderCarouselGoalSliderMobileTemplate();
                model.controllers.setupCarouselViewMobile();
            }
        },
        setupCarouselViewMobile: () => {
            var carouselSlidesMobile = document.getElementsByClassName("mySlides4");
            var carouselSlidesMobileArray = Array.from(carouselSlidesMobile);
            for (var i = 0; i < carouselSlidesMobileArray.length; i++) {
                if (i === 0) {
                    carouselSlidesMobileArray[i].style.display = 'block';
                } else {
                    carouselSlidesMobileArray[i].style.display = 'none';
                }
            }
        },
        setupCarouselViewDesktop: () => {
            var carouselSlidesDesktop = document.getElementsByClassName("mySlides2");
            var carouselSlidesDesktopArray = Array.from(carouselSlidesDesktop);
            for (var i = 0; i < carouselSlidesDesktopArray.length; i++) {
                if (i === 0) {
                    carouselSlidesDesktopArray[i].style.display = 'block';
                } else {
                    carouselSlidesDesktopArray[i].style.display = 'none';
                }
            }
        },
        insertLivIconsForCalculator: () => {
            // Rewards Goal Icon Desktop
            jQuery('#addTouch').addLiviconEvo({
                name: 'touch.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Own a Business Icon Desktop
            jQuery('#addBriefcase').addLiviconEvo({
                name: 'briefcase.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Credit Score Icon Desktop
            jQuery('#addDashboard').addLiviconEvo({
                name: 'dashboard.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Monthly Spend Icon Desktop
            jQuery('#addCreditCardOut').addLiviconEvo({
                name: 'credit-card-out.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Email Icon Desktop
            jQuery('#addEnvelopePut').addLiviconEvo({
                name: 'envelope-put.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Current Credit Cards Icon Desktop
            jQuery('#addCreditCardIn').addLiviconEvo({
                name: 'credit-card-in.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Rewards Goal Icon Mobile
            jQuery('#addTouchMobile').addLiviconEvo({
                name: 'touch.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Own a Business Icon Mobile
            jQuery('#addBriefcaseMobile').addLiviconEvo({
                name: 'briefcase.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Credit Score Icon Mobile
            jQuery('#addDashboardMobile').addLiviconEvo({
                name: 'dashboard.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Monthly Spend Icon Mobile
            jQuery('#addCreditCardOutMobile').addLiviconEvo({
                name: 'credit-card-out.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Email Icon Mobile
            jQuery('#addEnvelopePutMobile').addLiviconEvo({
                name: 'envelope-put.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });

            // Current Credit Cards Icon Mobile
            jQuery('#addCreditCardInMobile').addLiviconEvo({
                name: 'credit-card-in.svg',
                size: '120px',
                style: 'original',
                tryToSharpen: true
            });
        },
        calculatorSetup: () => {
            
            // Scroll to Top
            $('html,body').scrollTop(0);

            // Change App State
            model.appState.landingPage = false;
            model.appState.calculator = true;

            // Hide Landing Page
            document.getElementById('landingPage').style.display = "none";

            // Render Points Calculator Template 
            model.templates.renderPointsCalculatorTemplate();

            // Insert LivIcons
            model.controllers.insertLivIconsForCalculator();

            // Show Points Calculator Template
            document.getElementById('pointsCalculator').style.display = "inline";

            // Manage Calculator Inputs Desktop
            function manageCalculatorInputsDesktop() {
                const selection = this.id;
                if (selection === "freeFlights" || 
                    selection === "cashBack") {

                    // Make sure to reset box inputs
                    var ids = ['cashBack', 'freeFlights'];
                    ids.forEach(function(id) {
                        document.getElementById(id).classList.remove('active');
                        document.getElementById(id).style.color = '#039be5';
                    });

                    // Add Active to selection
                    $(this).addClass('active');

                    // Log Active to the Model
                    model.cards.currentStatusBasedOnSelections.rewardsGoal = selection;

                    // Turn Selection Font White
                    document.getElementById(selection).style.color = 'white';

                    // Remove selection from ids Array
                    var index = ids.indexOf(selection);
                    ids.splice(index, 1);

                    // Grey out other option/s
                    ids.forEach(function (id) {
                        document.getElementById(id).style.color = 'grey';
                    });
                } else if (selection === "yesOwnBusiness" || 
                    selection ==='noOwnBusiness') {

                    // Make sure to reset box inputs
                    var ids = ['yesOwnBusiness', 'noOwnBusiness'];
                    ids.forEach(function(id) {
                        document.getElementById(id).classList.remove('active');
                        document.getElementById(id).style.color = '#039be5';
                    });
                    
                    // Add Active to selection
                    $(this).addClass('active');

                    // Log Active to the Model
                    if (selection === "yesOwnBusiness"){
                        model.cards.currentStatusBasedOnSelections.ownBusiness = true;
                    } else {
                        model.cards.currentStatusBasedOnSelections.ownBusiness = false;
                    }

                    // Turn Selection Font White
                    document.getElementById(selection).style.color = 'white';

                    // Remove selection from ids Array
                    var index = ids.indexOf(selection);
                    ids.splice(index, 1);

                    // Grey out other option/s
                    ids.forEach(function (id) {
                        document.getElementById(id).style.color = 'grey';
                    });
                } else if (selection.includes('Credit')) {
                    // Make sure to reset box inputs
                    var ids = ['excellentCredit', 'goodCredit', 'fairCredit', 'poorCredit'];
                    ids.forEach(function(id) {
                        document.getElementById(id).classList.remove('active');
                        document.getElementById(id).style.color = '#039be5';
                    });
                    
                    // Add Active to selection
                    $(this).addClass('active');

                    // Log Active to the Model
                    model.cards.currentStatusBasedOnSelections.creditScore = selection;

                    // Turn Selection Font White
                    document.getElementById(selection).style.color = 'white';

                    // Remove selection from ids Array
                    var index = ids.indexOf(selection);
                    ids.splice(index, 1);

                    // Grey out other option/s
                    ids.forEach(function (id) {
                        document.getElementById(id).style.color = 'grey';
                    });
                } else if (selection.includes('00') || selection.includes('other')) {
                    
                    document.getElementById('otherSelection').style.display = 'none';

                    if (selection === 'other') {
                        // Make sure to reset box inputs
                        var ids = ['500', '1000', '1500', '2000', '3000+', 'other'];
                        ids.forEach(function(id) {
                            document.getElementById(id).classList.remove('active');
                            document.getElementById(id).style.color = '#039be5';
                        });
                        
                        // Add Active to selection
                        $(this).addClass('active');

                        // Turn Selection Font White
                        document.getElementById(selection).style.color = 'white';

                        // Show Other Form
                        document.getElementById('otherSelection').style.display = 'inline';
                    } else {

                        // Log Selection to the Model
                        model.cards.currentStatusBasedOnSelections.monthlySpend = selection;

                        // Make sure to reset box inputs
                        var ids = ['500', '1000', '1500', '2000', '3000+', 'other'];
                        ids.forEach(function(id) {
                            document.getElementById(id).classList.remove('active');
                            document.getElementById(id).style.color = '#039be5';
                        });
                        
                        // Add Active to selection
                        $(this).addClass('active');

                        // Turn Selection Font White
                        document.getElementById(selection).style.color = 'white';

                        // Remove selection from ids Array
                        var index = ids.indexOf(selection);
                        ids.splice(index, 1);

                        // Grey out other option/s
                        ids.forEach(function (id) {
                            document.getElementById(id).style.color = 'grey';
                        });
                    }
                }
                console.log(model.cards.currentStatusBasedOnSelections);
            }

            // Manage Calculator Inputs Mobile
            function manageCalculatorInputsMobile() {
                // Grab Selection
                var selection = this.id;
                // Delete Mobile String from Selection
                selection = selection.replace('Mobile', '');

                if (selection === "freeFlights" || 
                    selection === "cashBack") {

                    // Make sure to reset box inputs
                    var ids = ['cashBackMobile', 'freeFlightsMobile'];
                    ids.forEach(function(id) {
                        document.getElementById(id).classList.remove('active');
                        document.getElementById(id).style.color = '#039be5';
                    });

                    // Add Active to selection
                    $(this).addClass('active');

                    // Log Active to the Model
                    model.cards.currentStatusBasedOnSelections.rewardsGoal = selection;

                    // Turn Selection Font White
                    document.getElementById(selection + 'Mobile').style.color = 'white';

                    // Remove selection from ids Array
                    var index = ids.indexOf(selection + 'Mobile');
                    ids.splice(index, 1);

                    // Grey out other option/s
                    ids.forEach(function (id) {
                        document.getElementById(id).style.color = 'grey';
                    });
                } else if (selection === "yesOwnBusiness" || 
                    selection ==='noOwnBusiness') {

                    // Make sure to reset box inputs
                    var ids = ['yesOwnBusinessMobile', 'noOwnBusinessMobile'];
                    ids.forEach(function(id) {
                        document.getElementById(id).classList.remove('active');
                        document.getElementById(id).style.color = '#039be5';
                    });
                    
                    // Add Active to selection
                    $(this).addClass('active');

                    // Log Active to the Model
                    if (selection === "yesOwnBusiness"){
                        model.cards.currentStatusBasedOnSelections.ownBusiness = true;
                    } else {
                        model.cards.currentStatusBasedOnSelections.ownBusiness = false;
                    }

                    // Turn Selection Font White
                    document.getElementById(selection + 'Mobile').style.color = 'white';

                    // Remove selection from ids Array
                    var index = ids.indexOf(selection + 'Mobile');
                    ids.splice(index, 1);

                    // Grey out other option/s
                    ids.forEach(function (id) {
                        document.getElementById(id).style.color = 'grey';
                    });
                } else if (selection.includes('Credit')) {
                    // Make sure to reset box inputs
                    var ids = ['excellentCreditMobile', 'goodCreditMobile',
                                'fairCreditMobile', 'poorCreditMobile'];
                    ids.forEach(function(id) {
                        document.getElementById(id).classList.remove('active');
                        document.getElementById(id).style.color = '#039be5';
                    });
                    
                    // Add Active to selection
                    $(this).addClass('active');

                    // Log Active to the Model
                    model.cards.currentStatusBasedOnSelections.creditScore = selection;

                    // Turn Selection Font White
                    document.getElementById(selection + 'Mobile').style.color = 'white';

                    // Remove selection from ids Array
                    var index = ids.indexOf(selection + 'Mobile');
                    ids.splice(index, 1);

                    // Grey out other option/s
                    ids.forEach(function (id) {
                        document.getElementById(id).style.color = 'grey';
                    });
                } else if (selection.includes('00') || selection.includes('other')) {
                    
                    document.getElementById('otherSelectionMobile').style.display = 'none';

                    if (selection === 'other') {
                        // Make sure to reset box inputs
                        var ids = ['500Mobile', '1000Mobile', '1500Mobile', 
                                    '2000Mobile', '3000+Mobile', 'otherMobile'];
                        ids.forEach(function(id) {
                            document.getElementById(id).style.backgroundColor = 'white';
                            document.getElementById(id).style.color = '#039be5';
                        });
                        
                        // Add Active to selection
                        $(this).addClass('active');

                        // Turn Selection Font White
                        document.getElementById(selection + 'Mobile').style.color = 'white';
                        document.getElementById(selection + 'Mobile').style.backgroundColor = '#26a69a';

                        // Show Other Form
                        document.getElementById('otherSelectionMobile').style.display = 'inline';
                    } else {

                        // Log Selection to the Model
                        model.cards.currentStatusBasedOnSelections.monthlySpend = selection;

                        // Make sure to reset box inputs
                        var ids = ['500Mobile', '1000Mobile', '1500Mobile', 
                                    '2000Mobile', '3000+Mobile', 'otherMobile'];
                        ids.forEach(function(id) {
                            document.getElementById(id).style.backgroundColor = 'white';
                            document.getElementById(id).style.color = '#039be5';
                        });
                        
                        // Add Active to selection
                        $(this).addClass('active');

                        // Turn Selection Font White
                        document.getElementById(selection + 'Mobile').style.color = 'white';
                        document.getElementById(selection + 'Mobile').style.backgroundColor = '#26a69a';

                        // Remove selection from ids Array
                        var index = ids.indexOf(selection + 'Mobile');
                        ids.splice(index, 1);

                        // Grey out other option/s
                        ids.forEach(function (id) {
                            document.getElementById(id).style.color = 'grey';
                        });
                    }
                }
                console.log(model.cards.currentStatusBasedOnSelections);
            }

            // Manage CC Inputs Desktop
            function manageCreditCardInputsDesktop() {
                for (var i = 1; i < 3; i++) {
                    if (model.appState.addAnotherCardCount === i) {
                        var nextCard = 'card' + (i+1) + (i+1);
                        console.log(nextCard);
                        document.getElementById(nextCard).style.display = "inline";
                        model.appState.addAnotherCardCount += 1;
                        if (model.appState.addAnotherCardCount === 3) {
                            document.getElementById('addAnotherCard').innerHTML = "Limit Reached!";
                        }
                        break;
                    } 
                }
            }
            
            // Manage CC Inputs Mobile
            function manageCreditCardInputsMobile() {
                for (var i = 1; i < 3; i++) {
                    if (model.appState.addAnotherCardCount === i) {
                        var nextCard = 'card' + (i+1) + (i+1) + (i+1);
                        console.log(nextCard);
                        document.getElementById(nextCard).style.display = "inline";
                        model.appState.addAnotherCardCount += 1;
                        if (model.appState.addAnotherCardCount === 3) {
                            document.getElementById('addAnotherCardMobile').innerHTML = "Limit Reached!";
                        }
                        break;
                    } 
                }
            }

            // Set up Event Listeners for Calculator Inputs Desktop
            var collection = Array.from(document.getElementsByClassName("calculatorInputDesktop")); 
            for (var i = 0; i < collection.length; i++) {
                collection[i].addEventListener('click', manageCalculatorInputsDesktop, false);
            }

            // Set up Event Listeners for Calculator Inputs Mobile
            var collection = Array.from(document.getElementsByClassName("calculatorInputMobile")); 
            for (var i = 0; i < collection.length; i++) {
                collection[i].addEventListener('click', manageCalculatorInputsMobile, false);
            }

            // Add another card event listener desktop
            document.getElementById('addAnotherCard').addEventListener('click', manageCreditCardInputsDesktop, false);

            // Add another card event listener mobile
            document.getElementById('addAnotherCardMobile').addEventListener('click', manageCreditCardInputsMobile, false);

            // Submit Form Event Listeners
            document.getElementById('submitForm').addEventListener('click', model.controllers.vetPointCalcInputs);
            document.getElementById('submitFormMobile').addEventListener('click', model.controllers.vetPointCalcInputs);
            
            // Points Calculator PP and TOS Event Listeners
            document.getElementById('termsOfServiceButtonCalcDesktop').addEventListener('click', model.appState.toggleToTos);
            document.getElementById('termsOfServiceButtonCalcMobile').addEventListener('click', model.appState.toggleToTos);
            document.getElementById('privacyPolicyButtonCalcDesktop').addEventListener('click', model.appState.toggleToPp);
            document.getElementById('privacyPolicyButtonCalcMobile').addEventListener('click', model.appState.toggleToPp);

            // Add Autocomplete Functionality for Add Cards Section
            $('input.autocomplete').autocomplete({
                data: {
                    'No Credit Card': null,
                    'American Express Blue Cash Everyday': null,
                    'American Express Blue Cash Preferred': null,
                    'American Express Blue Sky': null,
                    'American Express Charles Schwabb Investor Card': null,
                    'American Express Platinum (Personal)': null,
                    'American Express Platinum (Business)': null,
                    'American Express Everyday': null,
                    'American Express Everyday Preferred': null,
                    'American Express Simply Cash Plus Business': null,
                    'American Express Business Gold Rewards': null,
                    'American Express Premier Rewards Gold': null,
                    'American Express Corporate Gold': null,
                    'American Express Gold': null,
                    'American Express Corporate Platinum': null,
                    'American Express Centurion': null,
                    'American Express Green': null,
                    'American Express Plum': null,
                    'American Express Hilton HHonors': null,
                    'American Express Hilton HHonors Surpass': null,
                    'American Express Starwood Preferred Guest Personal': null,
                    'American Express Starwood Preferred Guest Business': null,
                    'American Express Gold Delta SkyMiles': null,
                    'American Express Platinum Delta SkyMiles': null,
                    'American Express Delta Reserve': null,
                    'Bank of America BankAmericard Cash Rewards Visa (All Versions)': null,
                    'Bank of America BankAmericard Travel Rewards Visa': null,
                    'Bank of America BankAmericard MasterCard': null,
                    'Bank of America BankAmericard Rewards Visa': null,
                    'Bank of America WorldPoints Visa or MasterCard': null,
                    'Bank of America Alaska Airlines Visa Signature': null,
                    'Bank of America Alaska Airlines Platinum Plus Visa': null,
                    'Bank of America Alaska Airlines Business Visa': null,
                    'Bank of America Virgin Atlantic World Elite MasterCard': null,
                    'Bank of America Cash Rewards For Business MasterCard': null,
                    'Bank of America Travel Rewards World MasterCard For Business': null,
                    'Bank of America Hawaiian Airlines World Elite MasterCard': null,
                    'Barclaycard Arrival Plus World Elite MasterCard': null,
                    'Barclaycard Rewards MasterCard': null,
                    'Barclaycard Cash Forward MasterCard': null,
                    'Barclaycard Ring MasterCard': null,
                    'Barclaycard Upromise By Sallie Mae World MasterCard': null,
                    'Barclaycard Hawaiian Airlines Business MasterCard': null,
                    'Barclaycard JetBlue Plus MasterCard': null,
                    'Barclaycard Lufthansa Premier Miles and More MasterCard': null,
                    'Barclaycard JetBlue MasterCard': null,
                    'Barclaycard JetBlue Business MasterCard': null,
                    'Barclaycard Frontier Airlines World MasterCard': null,
                    'Capital One Quicksilver MasterCard or Visa': null,
                    'Capital One Quicksilver One MasterCard or Visa': null,
                    'Capital One Venture Rewards Visa': null,
                    'Capital One Venture One Rewards Visa': null,
                    'Capital One Platinum MasterCard': null,
                    'Capital One Secured MasterCard': null,
                    'Capital One Journey Student Rewards Visa': null,
                    'Capital One Buy Power MasterCard': null,
                    'Capital One Spark Cash Select For Business Visa': null,
                    'Capital One Spark Miles Select For Business Visa': null,
                    'Capital One Spark Cash For Business Visa': null,
                    'Capital One Spark Miles For Business Visa': null,
                    'Capital One Spark Classic For Business Visa': null,
                    'Capital One BuyPower For Business MasterCard': null,
                    'Capital One Cash Rewards Visa or MasterCard': null,
                    'Capital One Platinum Visa': null,
                    'Capital One Platinum Prestige Visa or MasterCard': null,
                    'Capital One Spark Select For Business Visa': null,
                    'Chase Freedom Unlimited Visa': null,
                    'Chase Freedom Visa': null,
                    'Chase Sapphire Preferred Visa': null,
                    'Chase Sapphire Reserve Visa': null,
                    'Chase Ink Plus or Bold Business Visa or MasterCard': null,
                    'Chase Ink Cash Business Visa': null,
                    'Chase Ink Business Preferred Visa': null,
                    'Chase Slate Visa': null,
                    'Chase Marriott Rewards Premier Visa': null,
                    'Chase Marriott Rewards Premier Business Visa': null,
                    'Chase United MileagePlus Explorer Visa': null,
                    'Chase United MileagePlus Club Visa': null,
                    'Chase United MileagePlus Explorer Business Visa': null,
                    'Chase Amazon Rewards Visa': null,
                    'Synchrony Bank Amazon Prime Rewards Store Card': null,
                    'Chase Southwest Rapid Rewards Plus Business Visa': null,
                    'Chase Southwest Airlines Rapid Rewards Premier Business Visa': null,
                    'Chase Southwest Airlines Rapid Rewards Premier Visa': null,
                    'Chase Southwest Airlines Rapid Rewards Plus Visa': null,
                    'Chase Hyatt Visa': null,
                    'Chase IHG Rewards Club Select MasterCard': null,
                    'Chase Disney Rewards Visa': null,
                    'Chase Disney Premier Visa': null,
                    'Chase Ritz Carlton Rewards Visa': null,
                    'Chase Marriott Rewards Premier Business Visa Signature': null,
                    'American Express Mercedes Benz': null,
                    'American Express Mercedes Benz Platinum': null,
                    'Citi Double Cash MasterCard': null,
                    'Citi Simplicity MasterCard': null,
                    'Citi Diamond Preferred MasterCard': null,
                    'Citi Costco Anywhere Visa': null,
                    'Citi Costco Anywhere Business Visa': null,
                    'Citi Thank You Prestige MasterCard': null,
                    'Citi Thank You Premier MasterCard': null,
                    'Citi Secured MasterCard': null,
                    'Citi Thank You Preferred MasterCard': null,
                    'Citi Forward MasterCard or Visa': null,
                    'Citi American Airlines AAdvantage Executive World Elite MasterCard': null,
                    'Citi American Airlines AAdvantage Platinum Select World Elite MasterCard': null,
                    'Citi Business American Airlines AAdvantage Platinum Select MasterCard': null,
                    'Barclaycard American Airlines AAdvantage Aviator Red World Elite    MasterCard': null,
                    'Barclaycard American Airlines AAdvantage Aviator Silver World Elite MasterCard': null,
                    'Barclaycard American Airlines AAdvantage Aviator Mastercard': null,
                    'Barclaycard American Airlines AAdvantage Aviator Blue Mastercard': null,
                    'Discover It': null,
                    'Discover It Miles': null,
                    'Discover It Secured Card': null,
                    'Discover It Chrome': null,
                    'Discover More': null,
                    'Discover Business Card': null,
                    'Wells Fargo Cash Wise Visa': null,
                    'Wells Fargo Propel 365 By American Express': null,
                    'Wells Fargo Platinum Visa': null,
                    'Wells Fargo Rewards Visa': null,
                    'Wells Fargo Propel By American Express': null,
                    'Wells Fargo Secured Visa': null,
                    'Wells Fargo Business VIsa': null,
                    'Citi Hilton HHonors Visa Signature': null,
                    'Citi Hilton HHonors Reserve Visa': null,
                    'USAA Platinum Visa': null,
                    'USAA Cash Rewards World MasterCard': null,
                    'USAA Preferred Cash Rewards World MasterCard': null,
                    'USAA Rate Advantage Platinum Visa': null,
                    'USAA Rewards Visa or World MasterCard': null,
                    'USAA Active Military MasterCard': null,
                    'USAA Secured Card By American Express': null,
                    'USAA Rewards By American Express': null,
                    'USAA Cash Rewards By American Express': null,
                    'TD Cash Rewards or Cash Rewards Platinum Visa': null,
                    'TD Cash Visa': null,
                    'TD Business Solutions Visa': null,
                    'TD Easy Rewards Visa': null,
                    'TD Aeroplan Visa': null,
                    'Lowe’s Credit Card': null,
                    'Target Credit Card': null,
                    'Banana Republic Credit Card': null,
                    'Walmart Credit Card': null,
                    'Other Store Card': null,
                    'Other No Annual Fee Card': null,
                    'M&T Rewards Visa': null,
                    'M&T Business Visa': null,
                    'M&T Business Bonus Rewards Visa': null,
                    'M&T Business Bonus Rewards Plus Visa': null,
                    'M&T Visa Signature': null,
                    'Suntrust Cash Rewards MasterCard': null,
                    'Suntrust Travel Rewards MasterCard': null,
                    'Suntrust Prime Rewards MasterCard': null,
                    'Suntrust Business Visa or MasterCard': null,
                    'Other Personal Bank Credit Card': null,
                    'Other Business Bank Credit Card': null,
                    'PNC CashBuilder Visa': null,
                    'PNC Core Visa': null,
                    'PNC Points Visa': null,
                    'PNC Premier Traveler Visa Signature': null,
                    'PNC Points Business Visa': null,
                    'PNC Business Cash Rewards Visa Signature': null,
                    'PNC Business Travel Rewards Visa': null,
                    'PNC Business Visa': null,
                    'Barclaycard Wyndham Rewards Visa Signature': null,
                    'Barclaycard Wyndham Rewards Visa Signature (Annual Fee Version)': null,
                    'US Bank Cash Plus Visa Signature': null,
                    'US Bank Club Carlson Premier Rewards Visa Signature': null,
                    'US Bank Club Carlson Rewards Visa Signature': null,
                    'US Bank Club Carlson Rewards Visa': null,
                    'US Bank Club Carlson Business Rewards Visa': null,
                    'US Bank Cash Rewards Business Visa': null,
                    'US Bank Flexperks Business Select Visa': null,
                    'US Bank Flexperks Business Travel Rewards Visa': null,
                    'US Bank Flexperks Travel Rewards Visa': null,
                    'US Bank Flexperks By American Express': null,
                    'Best Western Rewards Secured MasterCard': null,
                    'Best Western Rewards Premier MasterCard': null,
                    'Best Western Rewards MasterCard': null,
                    'Best Western Rewards Business MasterCard': null,
                    'Choice Privileges Visa Signature ': null,
                    'JP Morgan Chase Palladium Visa Signature': null,
                    'Chase British Airways Avios Visa Signature': null,
                    'Bank of America Allegiant Airlines World MasterCard': null,
                    'Bank of America Spirit Airlines World MasterCard': null,
                    'Comenity Bank Virgin America Visa Signature': null,
                    'Comenity Bank Virgin America Premium Visa Signature': null
                }
            });
        },
        vetPointCalcInputs: () => {
            // Create Shortcut to Model
            const m = model.cards.currentStatusBasedOnSelections;

            // Log E-mail Input to the Model, if filled in
            if (document.getElementById('email').value) {
                m.email = document.getElementById('email').value;
            } else if (document.getElementById('emailMobile').value) {
                m.email = document.getElementById('emailMobile').value;
            }

            // Vet inputs
            if (m.ownBusiness !== null && m.creditScore !== null 
                && m.rewardsGoal !== null && m.monthlySpend !== null 
                && m.email !== null) {
                model.controllers.createReport();
            } else {
                document.getElementById('vetPointCalcInputsDesktop').style.display = 'inline';
                document.getElementById('vetPointCalcInputsMobile').style.display = 'inline';
            }
        },
        createReport: () => {
            // Hide the Form
            document.getElementById('pointsCalculator').style.display = 'none';

            // Display the Loading Page
            document.getElementById('loading').style.display = 'inline';

            // Move on to Log the User's Selections to the Model
            model.controllers.determineSelections();
        },
        determineSelections: () => {
            
            // Log User's Remaining Inputs to the Model
            
            // Other Amount, if applicable
            var otherAmount = document.getElementById('otherSelectionInput').value;
            if (otherAmount) {
                model.cards.currentStatusBasedOnSelections.monthlySpend = otherAmount;
            }

            // Current CCs, if applicable
            const card1 = document.getElementById('card1').value;
            const card2 = document.getElementById('card2').value;
            const card3 = document.getElementById('card3').value; 
            var cards = model.cards.all;

            // Determine Cash Back Status for Rewards Goal Toggle on Display Recs View
            if (model.cards.currentStatusBasedOnSelections.rewardsGoal === 'cashBack') {
                model.cards.currentStatusBasedOnSelections.cashBack = true;
            } else {
                model.cards.currentStatusBasedOnSelections.cashBack = false;
            }

            // Create the Selections Object
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].cardName === card1) {
                    model.cards.userSelections.push(cards[i]);
                } else if (cards[i].cardName === card2) {
                    model.cards.userSelections.push(cards[i]);
                } else if (cards[i].cardName === card3) {
                    model.cards.userSelections.push(cards[i]);
                } 
            }

            console.log('Display User Selections');
            console.log(model.cards.userSelections);

            // Move on to create the Results Object from the Selection
            model.controllers.determineCurrentStatusBasedOnSelections();
        },
        determineCurrentStatusBasedOnSelections:() => {
            
            // Calculate totalAnnualFee
            model.cards.userSelections.forEach(function(a){
                model.cards.currentStatusBasedOnSelections.totalAnnualFee += a.annualFee;
            });

            // Determine Best Everything for currentStatusBasedOnSelections
            determineBest = [];
            model.cards.categories.forEach(function(cat) {      
                if (cat !== 'annualFee') {
                    for (var i = 0; i < model.cards.userSelections.length; i++) {
                        var a = model.cards.userSelections[i];
                        if (a.hasOwnProperty(cat)) {
                            determineBest.push(a[cat]);
                        }
                    }
                }
                determineBest.sort().reverse();
                model.cards.currentStatusBasedOnSelections[cat] = determineBest[0];
                determineBest = [];
            });

            // Determine Best Everything for currentCategoriesArray
            determineBest = [];
            model.cards.categories.forEach(function(cat) {      
                if (cat !== 'annualFee') {
                    for (var i = 0; i < model.cards.userSelections.length; i++) {
                        var a = model.cards.userSelections[i];
                        if (a.hasOwnProperty(cat)) {
                            determineBest.push(a[cat]);
                        }
                    }
                }
                determineBest.sort().reverse();
                model.cards.currentCategoriesArray[cat] = determineBest[0];
                determineBest = [];
            });

            model.controllers.cleanUpResults(model.cards.currentStatusBasedOnSelections);
            console.log('Display Current Status Based on Selections:');
            console.log(model.cards.currentStatusBasedOnSelections);

            model.controllers.cleanUpResults(model.cards.currentCategoriesArray);
            console.log('Display Current Categories Only:');
            console.log(model.cards.currentCategoriesArray);

            model.controllers.determineBizRecs();
        },
        cleanUpResults: (obj) => {
            for (var propName in obj) { 
                if (obj[propName] === null || obj[propName] === undefined) {
                  delete obj[propName];
                }
            }
        },
        determineBizRecs: () => {
            var a = model.cards.currentStatusBasedOnSelections;
            var c = model.cards;
            if (a.ownBusiness) {
                if (a.creditScore === 'poorCredit' || 
                    a.creditScore === 'limitedCredit' ||
                    a.creditScore === 'notSureCredit') {
                    // model.controllers.determinePersRecs();
                } else if (a.creditScore === 'fairCredit') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Classic For Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                } else if (a.creditScore === 'goodCredit') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash Select For Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash For Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Citi Business American Airlines AAdvantage Platinum Select MasterCard') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                } else if (a.creditScore === 'excellentCredit' 
                            && a.rewardsGoal === 'cashBack') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Chase Ink Cash Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash For Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Chase Ink Business Preferred Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash Select For Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                } else if (a.creditScore === 'excellentCredit' 
                            && a.rewardsGoal === 'freeFlights') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Chase Ink Business Preferred Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Chase Ink Cash Business Visa') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                }
            }

            model.controllers.determinePersRecs();
        },
        determinePersRecs: () => {
            console.log('Display Intermediate Business Recommendations');
            console.log(model.cards.intermediateRecsBiz);

            var a = model.cards.currentStatusBasedOnSelections;
            var b = model.cards.userSelections;
            var c = model.cards;
            var d = (cardName, list) => {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].cardName === cardName) {
                        return true;
                    }
                }

                return false;
            };

            if (a.creditScore === 'poorCredit') {
                for (var i = 0; i < c.possiblePersRecs.length; i++) {
                    if (c.possiblePersRecs[i].cardName === 'Discover It Secured Card') {
                        c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                    }
                }
                for (var i = 0; i < c.possiblePersRecs.length; i++) {
                    if (c.possiblePersRecs[i].cardName === 'Capital One Secured Mastercard') {
                        c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                    }
                }
            } else if (a.creditScore === 'limitedCredit' ||
                    a.creditScore === 'notSureCredit') {
                for (var i = 0; i < c.possiblePersRecs.length; i++) {
                    if (c.possiblePersRecs[i].cardName === 'Discover It Secured Card') {
                        c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                    }
                }
                for (var i = 0; i < c.possiblePersRecs.length; i++) {
                    if (c.possiblePersRecs[i].cardName === 'Discover It') {
                        c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                    }
                }
                for (var i = 0; i < c.possiblePersRecs.length; i++) {
                    if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                        c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                    } 
                }
            } else if (a.rewardsGoal === 'cashBack') {
                if (a.creditScore === 'fairCredit') {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Secured Card') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Capital One Quicksilver One MasterCard or Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                } else if ((a.creditScore === 'goodCredit' || 
                            a.creditScore === 'excellentCredit') && 
                            (a.everywhere < 1.5)) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        console.log(c.possiblePersRecs[i].cardName);
                        if (c.possiblePersRecs[i].cardName === 'Citi Double Cash MasterCard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Barclaycard Arrival Plus World Elite MasterCard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Miles') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                } else if ((a.creditScore === 'goodCredit' || 
                            a.creditScore === 'excellentCredit') && 
                            (a.everywhere >= 1.5 &&
                             a.everywhere < 2)) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Citi Double Cash MasterCard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Miles') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Barclaycard Arrival Plus World Elite MasterCard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                } else if ((a.creditScore === 'goodCredit' || 
                            a.creditScore === 'excellentCredit') && 
                            (a.everywhere = 2)) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Miles') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Citi Double Cash MasterCard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                } else if ((a.creditScore === 'goodCredit' || 
                            a.creditScore === 'excellentCredit') && 
                            (a.everywhere = 2.1)) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Citi Double Cash MasterCard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Miles') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                }
            } else if (a.rewardsGoal === 'freeFlights') {
                if (a.creditScore === 'poorCredit') {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Secured Card') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Capital One Secured Mastercard') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                } else if (a.creditScore === 'limitedCredit' ||
                        a.creditScore === 'notSureCredit') {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Secured Card') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        } 
                    }
                } else if (a.creditScore === 'fairCredit') {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Discover It Secured Card') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === 'Capital One Quicksilver One MasterCard or Visa') {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                } else if (a.creditScore === 'goodCredit' || a.creditScore === 'excellentCredit') {
                    if (d('American Express Platinum (Personal)', b) || 
                        d('American Express Platinum (Business)', b)) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Reserve Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Preferred Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday Preferred') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Unlimited Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    } else if (d('American Express Premier Rewards Gold', b) || 
                                d('American Express Gold', b)) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Reserve Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Preferred Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday Preferred') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Unlimited Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    } else if (d('Chase Sapphire Preferred Visa', b)) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Reserve Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Unlimited') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday Preferred') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    } else if (d('Chase Sapphire Reserve Visa', b)) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Unlimited') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday Preferred') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Preferred Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    } else if (d('American Express Everyday', b)) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday Preferred') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Preferred Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Reserve Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Unlimited Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    } else {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Preferred Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        } 
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'American Express Everyday Preferred') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            } 
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Sapphire Reserve Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            } 
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Unlimited Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === 'Chase Freedom Visa') {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    }
                }
            }

            console.log('Display Intermediate Personal Recommendations');
            console.log(model.cards.intermediateRecsPers);
            model.controllers.vetIntPersAndBizRecsAgainstUserSelections();
        },
        vetIntPersAndBizRecsAgainstUserSelections: () => {
            // User Selection
            for (var i = 0; i < model.cards.userSelections.length; i++) {
                
                // Vet Against Personal Recs 
                for (var j = 0; j < model.cards.intermediateRecsPers.length; j++) {
                    if (model.cards.userSelections[i].cardName === model.cards.intermediateRecsPers[j].cardName) {
                        model.cards.intermediateRecsPers.splice(j, 1);
                    }
                }

                // Vet Against Business Recs
                for (var k = 0; k < model.cards.intermediateRecsBiz.length; k++) {
                    if (model.cards.userSelections[i].cardName === model.cards.intermediateRecsBiz[k].cardName) {
                        model.cards.intermediateRecsBiz.splice(k, 1);
                    }
                }
            }

            console.log('Remove any recommended cards that the user already has.');
            console.log(model.cards.intermediateRecsBiz);
            console.log(model.cards.intermediateRecsPers);
            

            model.controllers.limitRecsToFour();
        },
        limitRecsToFour: () => {
            // Limit Pers Recs to 4
            if (model.cards.intermediateRecsPers.length > 3) {
                model.cards.intermediateRecsPers.splice(4);
            }

            // Limit Biz Recs to 3
            if (model.cards.intermediateRecsBiz.length > 3) {
                model.cards.intermediateRecsBiz.splice(4);
            }

            console.log('Limit Recs to no more than 4 per Biz/Pers Rec.');

            model.controllers.createCategoryComparisonArrayInEachRecommendation();
        },
        createCategoryComparisonArrayInEachRecommendation: () => {

            // TO DO:
            // Reformat this object along the lines set out in the 
            // old vs. new object file.


            // For Business 
            model.cards.intermediateRecsBiz.forEach((obj) => {
                // Combined Object Current and Rec Categories in the Same Object
                obj.combinedCategories = {};
                obj.combinedCategories.current = model.cards.currentCategoriesArray;
                obj.combinedCategories.recs = obj.categories;
                
                obj.combinedCategoryNames = {};


                // Create Combined Categories Object
                $.extend(obj.combinedCategoryNames, obj.categories, model.cards.currentCategoriesArray);

                // Create Categories Comparison Array
                obj.combinedCategoriesComparison = [];

                // Populate Array with Category Names
                for (var prop in obj.combinedCategoryNames) {
                    obj.combinedCategoriesComparison.push({
                        catName: prop
                    });
                }

                // Duplicate Total Annual Fee Key into Object
                obj.totalAnnualFee = model.cards.currentStatusBasedOnSelections.totalAnnualFee;
            });

            model.cards.intermediateRecsBiz.forEach((obj) => {
                obj.combinedCategoriesComparison.forEach((cat) => {
                    if (obj.combinedCategories.current.hasOwnProperty(cat.catName)) {
                        cat.currentVal = obj.combinedCategories.current[cat.catName];
                        cat.currentDisplayVal = cat.currentVal * 20;
                    } else {
                        cat.currentVal = 0;
                        cat.currentDisplayVal = 5;
                    }
                    if (obj.combinedCategories.recs.hasOwnProperty(cat.catName)) {
                        cat.recVal = obj.combinedCategories.recs[cat.catName];
                        if (cat.recVal > cat.currentVal) {
                            cat.recGreaterThanCurrent = true;
                            cat.recDisplayVal = (cat.recVal * 20) - cat.currentDisplayVal;
                            cat.recColor = '#81d4fa';
                        } else {
                            cat.recGreaterThanCurrent = false;
                            cat.recDisplayVal = 0;
                            cat.recColor = '';
                        }
                    } else {
                        cat.recVal = 0;
                        cat.recDisplayVal = 5;
                    }
                    if (cat.currentDisplayVal + cat.recDisplayVal < 100) {
                        cat.addEmptyRow = true;
                        cat.emptyRowDisplayVal = 100 - (cat.currentDisplayVal + cat.recDisplayVal);
                    }
                });

            });

            // For Personal 
            model.cards.intermediateRecsPers.forEach((obj) => {
                // Combined Object Current and Rec Categories in the Same Object
                obj.combinedCategories = {};
                obj.combinedCategories.current = model.cards.currentCategoriesArray;
                obj.combinedCategories.recs = obj.categories;
                
                obj.combinedCategoryNames = {};


                // Create Combined Categories Object
                $.extend(obj.combinedCategoryNames, obj.categories, model.cards.currentCategoriesArray);

                // Create Categories Comparison Array
                obj.combinedCategoriesComparison = [];

                // Populate Array with Category Names
                for (var prop in obj.combinedCategoryNames) {
                    obj.combinedCategoriesComparison.push({
                        catName: prop
                    });
                }

                // Duplicate Total Annual Fee Key into Object
                obj.totalAnnualFee = model.cards.currentStatusBasedOnSelections.totalAnnualFee;
            });

            model.cards.intermediateRecsPers.forEach((obj) => {
                obj.combinedCategoriesComparison.forEach((cat) => {
                    if (obj.combinedCategories.current.hasOwnProperty(cat.catName)) {
                        cat.currentVal = obj.combinedCategories.current[cat.catName];
                        cat.currentDisplayVal = cat.currentVal * 20;
                    } else {
                        cat.currentVal = 0;
                        cat.currentDisplayVal = 5;
                    }
                    if (obj.combinedCategories.recs.hasOwnProperty(cat.catName)) {
                        cat.recVal = obj.combinedCategories.recs[cat.catName];
                        if (cat.recVal > cat.currentVal) {
                            cat.recGreaterThanCurrent = true;
                            cat.recDisplayVal = (cat.recVal * 20) - cat.currentDisplayVal;
                            cat.recColor = '#81d4fa';
                        } else {
                            cat.recGreaterThanCurrent = false;
                            cat.recDisplayVal = 0;
                            cat.recColor = '';
                        }
                    } else {
                        cat.recVal = 0;
                        cat.recDisplayVal = 5;
                    }
                    if (cat.currentDisplayVal + cat.recDisplayVal < 100) {
                        cat.addEmptyRow = true;
                        cat.emptyRowDisplayVal = 100 - (cat.currentDisplayVal + cat.recDisplayVal);
                    }
                });
            });


            model.controllers.finalizeRecs();
        },
        finalizeRecs: () => {
            // Combine personal and business formatted recommendations into 
            // one array that is 4 objects long. 
            model.cards.finalRecsPers = model.cards.intermediateRecsPers;
            model.cards.finalRecsBiz = model.cards.intermediateRecsBiz;
            
            if (model.cards.finalRecsBiz.length >= 2) {
                model.cards.combinedRecs.push(model.cards.finalRecsBiz[0],
                    model.cards.finalRecsBiz[1]);
                model.cards.combinedRecs.push(model.cards.finalRecsPers[0],
                    model.cards.finalRecsPers[1]);
            } else if (model.cards.finalRecsBiz.length === 1) {
                model.cards.combinedRecs.push(model.cards.finalRecsBiz[0]);
                model.cards.combinedRecs.push(model.cards.finalRecsPers[0],
                    model.cards.finalRecsPers[1], model.cards.finalRecsPers[2]);
            } else if (model.cards.finalRecsBiz.length === 0) {
                model.cards.combinedRecs.push(model.cards.finalRecsPers[0],
                    model.cards.finalRecsPers[1], model.cards.finalRecsPers[2],
                    model.cards.finalRecsPers[3]);
            }

            console.log('Combined Recs Array:');
            console.log(model.cards.combinedRecs);


            // ONLY NEED TO DO IF MAX WANTS TO KEEP THE ICONS IN PLACE.
            // IF HE WANTS TO USE IMAGES, HANDLEBARS WILL TAKE CARE OF THIS!

            // if (model.cards.combinedRecs.length < 4) {
            //     // Trim Number of CC Images to the Number of Recs on Desktop View

            //     var desktopLength = [0,1,2,3];
            //     var numberOfRecsDesktop = [];

            //     for (var i = 0; i < model.cards.combinedRecs.length; i++) {
            //         numberOfRecsDesktop.push(i)
            //     }

            //     // Trim Number of CC Images to the Number of Recs on Desktop View

            //     var mobileLength = [4,5,6,7];
            //     var numberOfRecsMobile = [];

            //     for (var i = 0; i < model.cards.combinedRecs.length; i++) {
            //         numberOfRecsDesktop.push(i + 4)
            //     }

            //     array1 = array1.filter(val => !array2.includes(val));
            // }

            model.cards.currentDisplayRec = model.cards.combinedRecs[0];

            model.templates.renderDisplayRecommendationsTemplate();

            // Display Report
            setTimeout(function(){
                document.getElementById('loading').style.display = 'none';
                document.getElementById('displayRecommendations').style.display ='inline'; 
                model.controllers.displayRecInteractions();
                }, 3000);
        },
        displayRecInteractions: () => {
            
            // Change App State
            model.appState.calculator = false;
            model.appState.resultsPage = true;

            function toggleBetweenCardRecsDesktop (e) {
                if (e.target.nodeName === 'I') {
                    model.cards.currentDisplayRec = model.cards.combinedRecs[e.target.id];
                    model.templates.renderDisplayRecommendationsTemplate();
                    $("#pickCardDesktop>li>a.active").removeClass("active");
                    document.getElementById(e.target.id).parentNode.classList.add('active');
                }
                model.controllers.displayRecInteractions();
            }

            function toggleBetweenCardRecsMobile (e) {
                if (e.target.nodeName === 'I') {
                    model.cards.currentDisplayRec = model.cards.combinedRecs[e.target.id-4];
                    model.templates.renderDisplayRecommendationsTemplate();
                    $("#pickCardMobile>li>a.active").removeClass("active");
                    document.getElementById(e.target.id).parentNode.classList.add('active');
                };
                model.controllers.displayRecInteractions();
            }

            function toggleCashBackFreeFlightsSwitch () {
                if (model.cards.currentStatusBasedOnSelections.cashBack) {
                    model.cards.currentStatusBasedOnSelections.rewardsGoal = 'freeFlights';
                    model.cards.currentStatusBasedOnSelections.cashBack = false;
                    model.cards.intermediateRecsPers = [];
                    model.cards.intermediateRecsBiz = [];
                    model.cards.finalRecsPers = [];
                    model.cards.finalRecsBiz = [];
                    model.cards.combinedRecs = [];
                    model.controllers.determineBizRecs();
                } else {
                    model.cards.currentStatusBasedOnSelections.rewardsGoal = 'cashBack';
                    model.cards.currentStatusBasedOnSelections.cashBack = true;
                    model.cards.intermediateRecsPers = [];
                    model.cards.intermediateRecsBiz = [];
                    model.cards.finalRecsPers = [];
                    model.cards.finalRecsBiz = [];
                    model.cards.combinedRecs = [];
                    model.controllers.determineBizRecs();
                }
                model.controllers.displayRecInteractions();
            }

            function toggleBetweenDetailsCategoriesMobile (e) {
                // Makes sure the right thing was clicked
                if (e.target.nodeName === 'A') {

                    // Declare all variables
                    var i, tabcontent, tablinks;

                    // Get all elements with class="tabcontent" and hide them
                    tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }

                    // Get all elements with class="tablinks" and remove the class "active"
                    tablinks = document.getElementsByClassName("tablinks");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].className = tablinks[i].className.replace("active", "");
                    }

                    // Adds the active class to the element that was clicked - Mobile
                    document.getElementById(e.target.id).classList.add('active');
                    
                    // Adds the style attribute to the element that was clicked - Mobile
                    document.getElementById(e.target.id + 'Tab').style.display = "inline";

                    // Re-jigger the clicked id to be used for Desktop view as well. This
                    // allows user selections on both views to persist if, for whatever 
                    // reason, the user decides to make those changes.
                    var desktop = (e.target.id).slice(0,-6) + 'Desktop';

                    // Adds the active class to the element that was clicked - Desktop
                    document.getElementById(desktop).classList.add('active');
                    
                    // Adds the style attribute to the element that was clicked - Desktop
                    document.getElementById(desktop + 'Tab').style.display = "inline";
                }
            }

            function toggleBetweenDetailsCategoriesDesktop (e) {
                // Makes sure the right thing was clicked
                if (e.target.nodeName === 'A') {

                    // Declare all variables
                    var i, tabcontent, tablinks;

                    // Get all elements with class="tabcontent" and hide them
                    tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }

                    // Get all elements with class="tablinks" and remove the class "active"
                    tablinks = document.getElementsByClassName("tablinks");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].className = tablinks[i].className.replace("active", "");
                    }

                    // Adds the active class to the element that was clicked - Desktop
                    document.getElementById(e.target.id).classList.add('active');
                    
                    // Adds the style attribute to the element that was clicked - Desktop
                    document.getElementById(e.target.id + 'Tab').style.display = "inline";

                    // Re-jigger the clicked id to be used for Mobile view as well. This
                    // allows user selections on both views to persist if, for whatever 
                    // reason, the user decides to make those changes.
                    var mobile = (e.target.id).slice(0,-7) + 'Mobile';

                    // Adds the active class to the element that was clicked - Mobile
                    document.getElementById(mobile).classList.add('active');
                    
                    // Adds the style attribute to the element that was clicked - Mobile
                    document.getElementById(mobile + 'Tab').style.display = "inline";
                }
            }

            // Event Listeners

            // Change Card Recommendation Event Listeners Desktop/Mobile
            document.getElementById('pickCardDesktop').addEventListener('click', (e) => {
                toggleBetweenCardRecsDesktop(e);
            });
            document.getElementById('pickCardMobile').addEventListener('click', (e) => {
                toggleBetweenCardRecsMobile(e);
            });

            // Toggle b/w Cash Back and Free Flights Event Listeners Desktop/Mobile
            document.getElementById('desktopSwitch').addEventListener('click', 
                toggleCashBackFreeFlightsSwitch);
            document.getElementById('mobileSwitch').addEventListener('click', 
                toggleCashBackFreeFlightsSwitch);

            // Toggle b/w Card Details Event Listeners Desktop/Mobile
            document.getElementById('pickCategoryDesktop').addEventListener('click', (e) => {
                toggleBetweenDetailsCategoriesDesktop(e);
            });

            document.getElementById('pickCategoryMobile').addEventListener('click', (e) => {
                toggleBetweenDetailsCategoriesMobile(e);
            });

            // PP and TOS Event Listeners Desktop/Mobile
            document.getElementById('termsOfServiceButtonDesktopDisplayRecs').addEventListener('click', 
                model.appState.toggleToTos);
            document.getElementById('termsOfServiceButtonMobileDisplayRecs').addEventListener('click', 
                model.appState.toggleToTos);
            document.getElementById('privacyPolicyButtonDesktopDisplayRecs').addEventListener('click', 
                model.appState.toggleToPp);
            document.getElementById('privacyPolicyButtonMobileDisplayRecs').addEventListener('click', 
                model.appState.toggleToPp);
        }
    },
    tests: {
        testThatRecCardsAreInCardsArray: () => {
            var counter = 0;
            model.cards.possiblePersRecs.forEach(function(a) {
                console.log(a.cardName);
                for (var j = 0; j < model.cards.length; j++) {
                    if (a.cardName === model.cards[j].cardName) {
                        counter += 1;
                    }
                }
            });
            model.cards.possibleBizRecs.forEach(function(a) {
                console.log(a.cardName);
                for (var i = 0; i < model.cards.length; i++) {
                    if (a.cardName === model.cards[i].cardName) {
                        counter += 1;
                    }
                }
            });
            console.log(counter);
            console.log(model.cards.possiblePersRecs.length + model.cards.possibleBizRecs.length);
        },
        testForIn: () => {
        console.log(model.cards.currentStatusBasedOnSelections);

        Object.keys(model.cards.currentStatusBasedOnSelections).forEach(function(key) {
          var newkey = key + "xxx";
          model.cards.currentStatusBasedOnSelections[newkey] = model.cards.currentStatusBasedOnSelections[key];
          delete model.cards.currentStatusBasedOnSelections[key];
        });

        console.log(model.cards.currentStatusBasedOnSelections);
        
        }
    }
}


$(document).ready(model.controllers.setup);
