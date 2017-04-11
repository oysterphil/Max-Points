// Model
var model = { 
    appState: {
        loginLoading: false,
        uid: null,
        landingPage: true,
        calculator: false,
        resultsPage: false,
        acctInfo: false,
        profilePage: false,
        registerBeforeRecs: false,
        signInBeforeRecs: false,
        privacyPolicy: false,
        termsOfService: false,
        addAnotherCardCount: 1,
        firstLoginEmailPass: null,
        firstLoginGoogleFacebook: null,
        completedCalculator: false,
        toggleToTos: () => {

            // Scroll to Top
            window.scrollTo(0,0);

            model.appState.privacyPolicy = false;
            document.getElementById('privacyPolicy').style.display = 'none';

            // Hide Current View
            if (model.appState.landingPage) {
                document.getElementById('landingPage').style.display = 'none';
            } else if (model.appState.calculator) {
                document.getElementById('pointsCalculator').style.display = 'none';
            } else if (model.appState.resultsPage) {
                document.getElementById('displayRecommendations').style.display = 'none';
            } else if (model.appState.registerBeforeRecs) {
                document.getElementById('register').style.display = 'none';
            } else if (model.appState.signInBeforeRecs) {
                document.getElementById('signIn').style.display = 'none';
            } else if (document.getElementById('privacyPolicy').style.display === 'inline') {
                document.getElementById('privacyPolicy').style.display = 'none';
            } else if (model.appState.profilePage) {
                // TO DO: Fill in id of profile page
                document.getElementById('').style.display = 'none';
            }

            // Display TOS
            document.getElementById('termsOfService').style.display = 'inline';
            model.appState.termsOfService = true;

            // Declare Return Function
            function backToViewFromTos() {
               
                // Hide TOS
                document.getElementById('termsOfService').style.display = 'none';
                model.appState.termsOfService = false;

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
                } else if (model.appState.registerBeforeRecs) {
                    document.getElementById('register').style.display = 'inline';
                } else if (model.appState.signInBeforeRecs) {
                    document.getElementById('signIn').style.display = 'inline';
                } else if (model.appState.profilePage) {
                    // TO DO: Fill in id of profile page
                    document.getElementById('').style.display = 'inline';
                }
            }

            // Listen for Back Click/Home
            document.getElementById('termsOfServiceBack').addEventListener('click', 
                backToViewFromTos);
        },
        toggleToPp: () => {

            // Scroll to Top
            window.scrollTo(0,0);

            model.appState.termsOfService = false;
            document.getElementById('termsOfService').style.display = 'none';

            // Hide Current View
            if (model.appState.landingPage) {
                document.getElementById('landingPage').style.display = 'none';
            } else if (model.appState.calculator) {
                document.getElementById('pointsCalculator').style.display = 'none';
            } else if (model.appState.resultsPage) {
                document.getElementById('displayRecommendations').style.display = 'none';
            } else if (model.appState.registerBeforeRecs) {
                document.getElementById('register').style.display = 'none';
            } else if (model.appState.signInBeforeRecs) {
                document.getElementById('signIn').style.display = 'none';
            } else if (model.appState.profilePage) {
                // TO DO: Fill in id of profile page
                document.getElementById('').style.display = 'none';
            }

            // Display Privacy Policy
            document.getElementById('privacyPolicy').style.display = 'inline';
            model.appState.privacyPolicy = true;

            // Declare Return Function
            function backToViewFromPp() {
               
                // Hide TOS
                document.getElementById('privacyPolicy').style.display = 'none';
                model.appState.privacyPolicy = false;

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
                } else if (model.appState.registerBeforeRecs) {
                    document.getElementById('register').style.display = 'inline';
                } else if (model.appState.signInBeforeRecs) {
                    document.getElementById('signIn').style.display = 'inline';
                } else if (model.appState.profilePage) {
                    // TO DO: Fill in id of profile page
                    document.getElementById('').style.display = 'inline';
                }
            }

            // Listen for Back Click/Home
            document.getElementById('privacyPolicyBack').addEventListener('click', 
                backToViewFromPp);
        }
    },
    auth: {
        handleCreateAcctWithEmailAndPassword: () => {
            event.preventDefault();

            document.getElementById('createAccountEmailPass').style.display = 'none';
            document.getElementById('loadingRegister').style.display = 'inline';

            model.appState.firstLoginEmailPass = true;

            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            model.cards.currentStatusBasedOnSelections.email = email;

            if (email === "") {
              document.getElementById('authErrorMessageRegister').innerHTML = "<span style='color: red;'>" + "Email is required" + "</span>";
              document.getElementById('createAccountEmailPass').style.display = 'inline';
              document.getElementById('loadingRegister').style.display = 'none';
            } else if (password === "") {
              document.getElementById('authErrorMessageRegister').innerHTML = "<span style='color: red;'>" + "Password is required" + "</span>";
              document.getElementById('createAccountEmailPass').style.display = 'inline';
              document.getElementById('loadingRegister').style.display = 'none';
            } else if (password.length < 6) {
              document.getElementById('authErrorMessageRegister').innerHTML = "<span style='color: red;'>" + "Password must be at least 6 characters long." + "</span>";
              document.getElementById('createAccountEmailPass').style.display = 'inline';
              document.getElementById('loadingRegister').style.display = 'none';
            } else {
                // Create Account through Firebase via Email and Password
                const auth = firebase.auth();
                const promise = auth.createUserWithEmailAndPassword(email,password);
                promise.catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                  
                    document.getElementById('authErrorMessageRegister').innerHTML = "<span style='color: red;'>" + errorMessage + "</span>";
                    document.getElementById('createAccountEmailPass').style.display = 'inline';
                    document.getElementById('loadingRegister').style.display = 'none';
                });
            }
        },
        handleGoogleRegister: () => {

            // TO DO: Fix below so that a new account is not created
            model.appState.firstLoginGoogleFacebook = true;

            // Authenticate through Google
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;

            // The signed-in user info.
            var user = result.user;

            }).catch(function(error) {
                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                // The email of the user's account used.
                var email = error.email;

                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                document.getElementById('authErrorMessageRegister').innerHTML = "<span style='color: red;'>" + errorMessage + "</span>";
            });
        },
        handleLoginGoogle: () => {
            event.preventDefault();

            model.appState.firstLoginGoogleFacebook = false;

            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              // ...
            }).catch(function(error) {
                console.log(error);
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              document.getElementById('authErrorMessageSignIn').innerHTML = "<span style='color: red;'>" + errorMessage + "</span>";
            });
        },
        handleLoginEmailAndPassword: () => {
            event.preventDefault();

            model.appState.firstLoginEmailPass = false;

            document.getElementById('signInEmailPassword').style.display = 'none';
            document.getElementById('loadingSignIn').style.display = 'inline';

            const email = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;

            if (email === "") {
              document.getElementById('authErrorMessageSignIn').innerHTML = "<span style='color: red;'>" + "Email is required" + "</span>";
              document.getElementById('signInEmailPassword').style.display = 'inline';
              document.getElementById('loadingSignIn').style.display = 'none';
            } else if (password === "") {
              document.getElementById('authErrorMessageSignIn').innerHTML = "<span style='color: red;'>" + "Password is required" + "</span>";
              document.getElementById('signInEmailPassword').style.display = 'inline';
              document.getElementById('loadingSignIn').style.display = 'none';
            } else if (password.length < 6) {
              document.getElementById('authErrorMessageSignIn').innerHTML = "<span style='color: red;'>" + "Password must be at least 6 characters long." + "</span>";
              document.getElementById('signInEmailPassword').style.display = 'inline';
              document.getElementById('loadingSignIn').style.display = 'none';
            } else {
                // Login through Firebase via Email and Password
                const auth = firebase.auth();
                const promise = auth.signInWithEmailAndPassword(email, password);
                promise.catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                  
                    document.getElementById('authErrorMessageSignIn').innerHTML = "<span style='color: red;'>" + errorMessage + "</span>";
                    document.getElementById('signInEmailPassword').style.display = 'inline';
                    document.getElementById('loadingSignIn').style.display = 'none';
                });
            }
        },
        handleAuthStateChange: () => {
            const user = firebase.auth().currentUser;
            console.log('Auth state change fired');

            if (user) {

                model.appState.uid = user.uid;

                firebase.database().ref('/roles/users').once('value').then(function(snapshot) {

                    var loadUsers = (snapshot.val());
                    console.log(loadUsers.hasOwnProperty(user.uid));
                    if (loadUsers.hasOwnProperty(user.uid)) {
                        console.log('in');
                        // Load Data from Firebase into the Model Locally
                        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {

                            var loadUserData = (snapshot.val());
                            console.log('in in');
                            console.log(loadUserData);

                            model.appState.completedCalculator = loadUserData.completedCalculator;

                            if (model.appState.completedCalculator) {
                                model.cards.currentStatusBasedOnSelections = loadUserData;
                                model.controllers.insertCalcInputs();
                                model.controllers.displayRecsSetup();
                            } else {
                                // Write Functions to display a view for those that haven't filled out the calc yet
                                console.log('No data to load.');
                                document.getElementById('landingPage').style.display = 'none';
                                model.controllers.calculatorSetup();
                            }
                        });
                    } else {
                        console.log('First log in');
                        // Send User Info to Firebase
                        firebase.database().ref('users/' + user.uid).set({
                            completedCalculator: model.appState.completedCalculator
                        });

                        // Update Roles
                        var newUser ={};
                        newUser[user.uid] = true;
                        console.log(newUser);
                        var usersRef = firebase.database().ref("roles/users");
                        usersRef.update(newUser);

                        model.controllers.calculatorSetup();
                    } 
                });
            } else {
                console.log('No one is signed in.');
            }
        },
        resetPassword: () => {
          event.preventDefault();
          var auth = firebase.auth();
          const emailAddress = document.getElementById('forgotPasswordEmail').value;
          auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Remove Error Message
            document.getElementById('forgotPasswordResult').innerHTML = "";

            // Place in Success Message
            document.getElementById('forgotPasswordResult').style.color = 'green';
            document.getElementById('forgotPasswordResult').style.border = 'solid 1 px green';
            document.getElementById('forgotPasswordResult').style.display = 'inline';
            document.getElementById('forgotPasswordResult').innerHTML = 
              "<h6>Success! Check your email for the link to reset your password.</h6>";
          }, function(error) {
                // Display Error Message
                document.getElementById('forgotPasswordResult').style.display = 'inline';
                document.getElementById('forgotPasswordResult').innerHTML = 
                "<h6>" + error.message + "</h6>";
          });
        },
        resetPasswordAcct: () => {
            event.preventDefault();
            var auth = firebase.auth();
            const emailAddress = model.cards.currentStatusBasedOnSelections.email;
            auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Remove Error Message
            document.getElementById('outcomeMessageDesktop').innerHTML = "";
            document.getElementById('outcomeMessageMobile').innerHTML = "";

            // Place in Success Message
            document.getElementById('outcomeMessageDesktop').style.color = 'white';
            document.getElementById('outcomeMessageMobile').style.color = 'white';
            document.getElementById('outcomeMessageDesktop').innerHTML = 
              "<h6>Success! Check your email for the link to reset your password.</h6>";
              document.getElementById('outcomeMessageMobile').innerHTML = 
              "<h6>Success! Check your email for the link to reset your password.</h6>";
            document.getElementById('acctInfoOutcomeDesktop').style.display = 'inline';
            document.getElementById('acctInfoOutcomeMobile').style.display = 'inline';
            }, function(error) {
                // Display Error Message
                document.getElementById('acctInfoOutcomeDesktop').style.display = 'inline';
                document.getElementById('outcomeMessageDesktop').innerHTML = 
                "<h6>" + error.message + "</h6>";
                document.getElementById('acctInfoOutcomeMobile').style.display = 'inline';
                document.getElementById('outcomeMessageMobile').innerHTML = 
                "<h6>" + error.message + "</h6>";
            });
        },
        handleSignout: () => {
            event.preventDefault();
            // Logout User
            firebase.auth().signOut().then(function() {
              window.location.reload();
            }, function(error) {
              Materialize.toast(error, 4000);
            });
        },
        deleteAcct: () => {
            var user = firebase.auth().currentUser;

            user.delete().then(function() {
              window.location='https://maxpoints.co/';
            }, function(error) {
              // An error happened.
            });
        }
    }, 
    destinations: {
        selectionDesktop: null,
        optionsDesktop: {
            europeDesktop: [
                {
                    one: {
                        city: 'Paris',
                        country: 'France',
                        image: '/img/paris.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '34,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '81',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'London',
                        country: 'United Kingdom',
                        image: '/img/london.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '34,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '163',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Rome',
                        country: 'Italy',
                        image: '/img/rome.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '77',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                },
                {
                    one: {
                        city: 'Prague',
                        country: 'Czechia',
                        image: '/img/prague.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '49,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '45',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Reykjavik',
                        country: 'Iceland',
                        image: '/img/reykjavik.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '60',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Athens',
                        country: 'Greece',
                        image: '/img/athens.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '67',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }     
                 },
                 {
                    one: {
                        city: 'Madrid',
                        country: 'Spain',
                        image: '/img/madrid.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '49',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Vienna',
                        country: 'Austria',
                        image: '/img/vienna.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '115',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Amsterdam',
                        country: 'The Netherlands',
                        image: '/img/amsterdam.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '34,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '45',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                }
            ],
            asiaDesktop: [
                {
                    one: {
                        city: 'Tokyo',
                        country: 'Japan',
                        image: '/img/tokyo.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '84',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'

                    },
                    two: {
                        city: 'Bangkok',
                        country: 'Thailand',
                        image: '/img/bangkok.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '101',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Beijing',
                        country: 'China',
                        image: '/img/beijing.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '71',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                },
                {
                    one: {
                        city: 'Seoul',
                        country: 'South Korea',
                        image: '/img/seoul.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '78',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'New Delhi',
                        country: 'India',
                        image: '/img/delhi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '55,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '123',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Abu Dhabi',
                        country: 'United Arab Emirates',
                        image: '/img/abudhabi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '65,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '94',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                },
                {
                    one: {
                        city: 'Hanoi',
                        country: 'Vietnam',
                        image: '/img/hanoi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '80,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '105',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Singapore',
                        country: 'Singapore',
                        image: '/img/singapore.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '75,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '103',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Kuala Lumpur',
                        country: 'Malaysia',
                        image: '/img/kaulalumpur.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '75,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '96',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                }          
            ],
            unitedStatesDesktop: [
                {
                    one: {
                        city: 'New York City',
                        country: 'United States of America',
                        image: '/img/NYC.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '11',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Los Angeles',
                        country: 'United States of America',
                        image: '/img/LosAngeles.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '11',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Washington DC',
                        country: 'United States of America',
                        image: '/img/washingtondc.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '11',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                },
                {
                    one: {
                        city: 'Montreal',
                        country: 'Canada',
                        image: '/img/Montreal.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '12,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '57',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Vancouver',
                        country: 'Canada',
                        image: '/img/Vancouver.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '46',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Toronto',
                        country: 'Canada',
                        image: '/img/Toronto.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '12,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '52',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                }          
            ],
            latinAmericaDesktop: [
                {
                    one: {
                        city: 'Nassau',
                        country: 'The Bahamas',
                        image: '/img/nassau.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '11,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '101',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Santo Domingo',
                        country: 'Dominican Republic',
                        image: '/img/santodomingo.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '104',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Kingston',
                        country: 'Jamaica',
                        image: '/img/kingston.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '143',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                },
                {
                    one: {
                        city: 'San Jose',
                        country: 'Costa Rica',
                        image: '/img/sanjose.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '74',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Mexico City',
                        country: 'Mexico',
                        image: '/img/delhi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '20,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '91',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Bogota',
                        country: 'Colombia',
                        image: '/img/abudhabi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '20,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '75',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                },
                {
                    one: {
                        city: 'Rio De Janeiro',
                        country: 'Brazil',
                        image: '/img/rio.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '57',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Lima',
                        country: 'Peru',
                        image: '/img/lima.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '25,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '67',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Quito',
                        country: 'Ecuador',
                        image: '/img/quito.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '20,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '96',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                }          
            ],
            oceaniaDesktop: [
                {
                    one: {
                        city: 'Sydney',
                        country: 'Australia',
                        image: '/img/sydney.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '142',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Wellington',
                        country: 'New Zealand',
                        image: '/img/wellington.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '80,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '113',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Melbourne',
                        country: 'Australia',
                        image: '/img/melbourne.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '75,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '138',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                }
            ],
            africaDesktop: [
                {
                    one: {
                        city: 'Marrakech',
                        country: 'Morocco',
                        image: '/img/marrakech.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '105',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    two: {
                        city: 'Cape Town',
                        country: 'South Africa',
                        image: '/img/capetown.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '80,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '103',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    },
                    three: {
                        city: 'Fes',
                        country: 'Morocco',
                        image: '/img/fes.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '105',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                    }
                }
            ],
            cashBackLandingPageDesktop: [
                {
                    one: {
                        city: '$400 In Cash',
                        country: '',
                        image: '/img/wallet.png',
                        timeframeCopy: 'achieve this goal in',
                        timeframe: '3 month',
                        points: '40,000',
                        pointsUnit: 'points needed',
                        value: '400',
                        valueUnits: 'estimated value',
                        callToAction: 'select goal'
                    },
                    two: {
                        city: 'Hotel Night Worth $150',
                        country: '',
                        image: '/img/hotel.png',
                        timeframeCopy: 'achieve this goal in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'points needed',
                        value: '150',
                        valueUnits: 'estimated value',
                        callToAction: 'select goal'
                    },
                    three: {
                        city: '$100 of Holiday Gifts',
                        country: '',
                        image: '/img/gifts.png',
                        timeframeCopy: 'achieve this goal in',
                        timeframe: '1 month',
                        points: '10,000',
                        pointsUnit: 'points needed',
                        value: '100',
                        valueUnits: 'estimated value',
                        callToAction: 'select goal'
                    }
                }
            ]
        },
        selectionMobile: null,
        optionsMobile: {
            europeMobile: [
                {
                        city: 'Paris',
                        country: 'France',
                        image: '/img/paris.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '34,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '81',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'London',
                        country: 'United Kingdom',
                        image: '/img/london.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '34,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '163',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Rome',
                        country: 'Italy',
                        image: '/img/rome.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '77',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Prague',
                        country: 'Czechia',
                        image: '/img/prague.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '49,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '45',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Reykjavik',
                        country: 'Iceland',
                        image: '/img/reykjavik.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '60',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Athens',
                        country: 'Greece',
                        image: '/img/athens.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '67',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Madrid',
                        country: 'Spain',
                        image: '/img/madrid.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '49',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Vienna',
                        country: 'Austria',
                        image: '/img/vienna.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '115',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Amsterdam',
                        country: 'The Netherlands',
                        image: '/img/amsterdam.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '34,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '45',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }
            ],
            asiaMobile: [
                {
                        city: 'Tokyo',
                        country: 'Japan',
                        image: '/img/tokyo.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '40,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '84',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Bangkok',
                        country: 'Thailand',
                        image: '/img/bangkok.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '101',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Beijing',
                        country: 'China',
                        image: '/img/beijing.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '71',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Seoul',
                        country: 'South Korea',
                        image: '/img/seoul.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '78',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'New Delhi',
                        country: 'India',
                        image: '/img/delhi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '55,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '123',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Abu Dhabi',
                        country: 'United Arab Emirates',
                        image: '/img/abudhabi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '65,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '94',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Hanoi',
                        country: 'Vietnam',
                        image: '/img/hanoi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '80,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '105',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Singapore',
                        country: 'Singapore',
                        image: '/img/singapore.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '75,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '103',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Kuala Lumpur',
                        country: 'Malaysia',
                        image: '/img/kaulalumpur.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '75,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '96',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }
            ],
            unitedStatesMobile: [
                {
                        city: 'New York City',
                        country: 'United States of America',
                        image: '/img/NYC.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '11',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Los Angeles',
                        country: 'United States of America',
                        image: '/img/LosAngeles.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '11',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Washington DC',
                        country: 'United States of America',
                        image: '/img/washingtondc.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '11',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Montreal',
                        country: 'Canada',
                        image: '/img/Montreal.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '12,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '57',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Vancouver',
                        country: 'Canada',
                        image: '/img/Vancouver.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '46',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Toronto',
                        country: 'Canada',
                        image: '/img/Toronto.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '12,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '52',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                 }
            ],
            latinAmericaMobile: [
                {
                        city: 'Nassau',
                        country: 'The Bahamas',
                        image: '/img/nassau.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '11,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '101',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Santo Domingo',
                        country: 'Dominican Republic',
                        image: '/img/santodomingo.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '104',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Kingston',
                        country: 'Jamaica',
                        image: '/img/kingston.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '143',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'San Jose',
                        country: 'Costa Rica',
                        image: '/img/sanjose.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '74',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Mexico City',
                        country: 'Mexico',
                        image: '/img/delhi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '20,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '91',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Bogota',
                        country: 'Colombia',
                        image: '/img/abudhabi.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '20,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '75',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Rio De Janeiro',
                        country: 'Brazil',
                        image: '/img/rio.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '57',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Lima',
                        country: 'Peru',
                        image: '/img/lima.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '2 months',
                        points: '25,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '67',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Quito',
                        country: 'Ecuador',
                        image: '/img/quito.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '1 month',
                        points: '20,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '96',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }
            ],
            oceaniaMobile: [
                {
                        city: 'Sydney',
                        country: 'Australia',
                        image: '/img/sydney.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '60,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '142',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Wellington',
                        country: 'New Zealand',
                        image: '/img/wellington.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '80,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '113',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Melbourne',
                        country: 'Australia',
                        image: '/img/melbourne.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '75,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '138',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }
            ],
            africaMobile: [
                {
                        city: 'Marrakech',
                        country: 'Morocco',
                        image: '/img/marrakech.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '105',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Cape Town',
                        country: 'South Africa',
                        image: '/img/capetown.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '4 months',
                        points: '80,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '103',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }, 
                {
                        city: 'Fes',
                        country: 'Morocco',
                        image: '/img/fes.png',
                        timeframeCopy: 'earn an award ticket in',
                        timeframe: '3 months',
                        points: '50,000',
                        pointsUnit: 'miles needed for ticket',
                        value: '105',
                        valueUnits: 'estimated airport taxes',
                        callToAction: 'select destination'
                }
            ],
            cashBackLandingPageMobile: [
                {
                        city: '$400 In Cash',
                        country: '',
                        image: '/img/wallet.png',
                        timeframeCopy: 'achieve this goal in',
                        timeframe: '3 month',
                        points: '40,000',
                        pointsUnit: 'points needed',
                        value: '400',
                        valueUnits: 'estimated value',
                        callToAction: 'select goal'
                }, 
                {
                        city: 'Hotel Night Worth $150',
                        country: '',
                        image: '/img/hotel.png',
                        timeframeCopy: 'achieve this goal in',
                        timeframe: '1 month',
                        points: '15,000',
                        pointsUnit: 'points needed',
                        value: '150',
                        valueUnits: 'estimated value',
                        callToAction: 'select goal'
                }, 
                {
                        city: '$100 of Holiday Gifts',
                        country: '',
                        image: '/img/gifts.png',
                        timeframeCopy: 'achieve this goal in',
                        timeframe: '1 month',
                        points: '10,000',
                        pointsUnit: 'points needed',
                        value: '100',
                        valueUnits: 'estimated value',
                        callToAction: 'select goal'
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
                cardName: 'The Blue for Business® Credit Card from American Express',
                annualFee: 0,
                everywhere: 2.6
            },
            {
                cardName: 'American Express Charles Schwabb Investor Card',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'The Platinum® Card From American Express',
                annualFee: 550,
                everywhere: 2,
                airfare: 10,
                uber: 4,
                amexTravel: 4
            },
            {
                cardName: 'The Business Platinum® Card From American Express OPEN®',
                annualFee: 450,
                everywhere: 2,
                airfare: 10,
                uber: 4,
                amexTravel: 4
            },
            {
                cardName: 'The Amex Everyday® Credit Card from American Express',
                annualFee: 0,
                everywhere: 2.4,
                groceries: 4.8,
                uber: 4.4,
                amexTravel: 4.4
            },
            {
                cardName: 'The Amex Everyday® Preferred Credit Card from American Express',
                annualFee: 95,
                everywhere: 3,
                gas: 6,
                groceries: 9,
                uber: 5,
                amexTravel: 5 
            },
            {
                cardName: 'SimplyCash® Plus Business Credit Card from American Express',
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
                cardName: 'The Business Gold Rewards Card From American Express OPEN®',
                annualFee: 175,
                everywhere: 2,
                gas: 4,
                airfare: 6,
                uber: 4,
                amexTravel: 4,
                socialMediaAdvertising: 4,
                shipping: 4
            },
            {
                cardName: 'Premier Rewards Gold Card From American Express®',
                annualFee: 195,
                everywhere: 2,
                gas: 4,
                groceries: 4,
                diningOut: 4,
                airfare: 6,
                uber: 4,
                amexTravel: 4
            },
            {
                cardName: 'American Express Corporate Gold',
                annualFee: 0,
                everywhere: 2,
                uber: 4
            },
            {
                cardName: 'American Express Gold',
                annualFee: 160,
                everywhere: 2,
                diningOut: 4,
                airfare: 4,
                uber: 4
            },
            {
                cardName: 'American Express Corporate Platinum',
                annualFee: 0,
                everywhere: 2,
                uber: 4
            },
            {
                cardName: 'American Express Centurion',
                annualFee: 2500,
                everywhere: 2
            },
            {
                cardName: 'American Express Green',
                annualFee: 95,
                everywhere: 2,
                uber: 4,
                amexTravel: 4
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
                cardName: 'Starwood Preferred Guest® Credit Card from American Express',
                annualFee: 95,
                everywhere: 2,
                starwoodAndMarriottHotels: 4
            },
            {
                cardName: 'Starwood Preferred Guest® Business Credit Card from American Express',
                annualFee: 95,
                everywhere: 2,
                starwoodAndMarriottHotels: 4
            },
            {
                cardName: 'Gold Delta SkyMiles® Credit Card from American Express',
                annualFee: 95,
                everywhere: 1.6,
                deltaFlights: 3.2
            },
            {
                cardName: 'Gold Delta SkyMiles® Business Credit Card from American Express',
                annualFee: 95,
                everywhere: 1.6,
                deltaFlights: 3.2
            },
            {
                cardName: 'Platinum Delta SkyMiles® Credit Card from American Express',
                annualFee: 195,
                everywhere: 1.6,
                deltaFlights: 3.2
            },
            {
                cardName: 'Platinum Delta SkyMiles® Business Credit Card from American Express',
                annualFee: 195,
                everywhere: 1.6,
                deltaFlights: 3.2
            },
            {
                cardName: 'Delta Reserve Credit Card from American Express®',
                annualFee: 450,
                everywhere: 1.6,
                deltaFlights: 3.2 
            },
            {
                cardName: 'Delta Reserve for Business Credit Card from American Express®',
                annualFee: 450,
                everywhere: 1.6,
                deltaFlights: 3.2 
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
                cardName: 'Bank of America® BankAmericard Travel Rewards® Credit Card',
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
                cardName: 'Bank of America® Alaska Airlines Visa Signature® Credit Card',
                annualFee: 75,
                everywhere: 1.7,
                alaskaAirlinesFlights: 5.1
            },
            {
                cardName: 'Bank of America Alaska Airlines Platinum Plus Visa',
                annualFee: 50,
                everywhere: 1.7,
                alaskaAirlinesFlights: 5.1
            },
            {
                cardName: 'Bank of America Alaska Airlines Business Visa',
                annualFee: 75,
                everywhere: 1.7,
                alaskaAirlinesFlights: 5.1
            },
            {
                cardName: 'Bank of America Virgin Atlantic World Elite MasterCard',
                annualFee: 90,
                everywhere: 2.25,
                virginAtlanticFlights: 4.5
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
                everywhere: 1.2,
                hawaiianAirlinesFlights: 2.4
            },
            {
                cardName: 'Barclaycard Arrival Plus™ World Elite MasterCard®',
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
                groceries: 2,
                utilities: 2
            },
            {
                cardName: 'Barclaycard Hawaiian Airlines Business MasterCard',
                annualFee: 89,
                everywhere: 1.2,
                hawaiianAirlinesFlights: 2.4
            },
            {
                cardName: 'Barclaycard JetBlue Plus MasterCard',
                annualFee: 99,
                everywhere: 1.2,
                gas: null,
                groceries: 2.4,
                diningOut: 2.4,
                jetblueFlights: 7.2
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
                everywhere: 1.2,
                groceries: 2.4,
                diningOut: 2.4,
                jetblueFlights: 3.6
            },
            {
                cardName: 'Barclaycard JetBlue Business MasterCard',
                annualFee: 99,
                everywhere: 1.2,
                diningOut: 2.4,
                officeSupplyStores: 2.4,
                jetblueFlights: 7.2
            },
            {
                cardName: 'Barclaycard Frontier Airlines World MasterCard',
                annualFee: 69,
                everywhere: 1,
                frontierAirlinesFlights: 2
            },
            {
                cardName: 'Capital One® Quicksilver® Cash Rewards Credit Card',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One® QuicksilverOne® Cash Rewards Credit Card',
                annualFee: 39,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One® Venture® Rewards Credit Card',
                annualFee: 59,
                everywhere: 2
            },
            {
                cardName: 'Capital One Venture One Rewards Visa',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'Capital One® Platinum Credit Card',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Capital One® Secured MasterCard®',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Journey® Student Rewards from Capital One®',
                annualFee: 0,
                everywhere: 1.25
            },
            {
                cardName: 'Capital One Buy Power MasterCard',
                annualFee: 0,
                everywhere: 2
            },
            {
                cardName: 'Capital One® Spark® Cash Select for Business',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One Spark Miles Select For Business Visa',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Capital One® Spark® Cash for Business',
                annualFee: 59,
                everywhere: 2
            },
            {
                cardName: 'Capital One Spark Miles For Business Visa',
                annualFee: 59,
                everywhere: 2
            },
            {
                cardName: 'Capital One® Spark® Classic for Business',
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
                cardName: 'Chase Freedom Unlimited℠',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Chase Freedom®',
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
                cardName: 'Chase Sapphire Preferred® Card',
                annualFee: 95,
                everywhere: 2,
                diningOut: 4,
                travel: 4
            },
            {
                cardName: 'Chase Sapphire Reserve℠',
                annualFee: 150,
                everywhere: 2,
                diningOut: 6,
                travel: 6
            },
            {
                cardName: 'Chase Ink Plus or Bold Business Visa or MasterCard',
                annualFee: 95,
                everywhere: 2,
                gas: 4,
                hotels: 4,
                telecommunications: 10,
                officeSupplyStores: 10
            },
            {
                cardName: 'Chase® Ink Business Cash℠ Credit Card',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                telecommunications: 5,
                officeSupplyStores: 5
            },
            {
                cardName: 'Chase® Ink Business Preferred℠ Credit Card',
                annualFee: 95,
                everywhere: 2,
                diningOut: 6,
                travel: 6,
                telecommunications: 6,
                socialMediaAdvertising: 6,
                shipping: 6
            },
            {
                cardName: 'Chase Slate Visa',
                annualFee: 0,
                everywhere: 0
            },
            {
                cardName: 'Chase Marriott Rewards Premier Visa',
                annualFee: 85,
                everywhere: .5,
                diningOut: 1,
                airfare: 1,
                carRentals: 1,
                marriottAndStarwoodHotels: 2.5
            },
            {
                cardName: 'Chase Marriott Rewards Premier Business Visa',
                annualFee: 99,
                everywhere: .5,
                diningOut: 1,
                airfare: 1,
                carRentals: 1,
                telecommunications: 1,
                officeSupplyStores: 1,
                marriottAndStarwoodHotels: 2.5
            },
            {
                cardName: 'Chase® United MileagePlus® Explorer Card',
                annualFee: 95,
                everywhere: 1.7,
                unitedFlights: 3.4
            },
            {
                cardName: 'Chase United MileagePlus Club Visa',
                annualFee: 450,
                everywhere: 2.55,
                unitedFlights: 3.4
            },
            {
                cardName: 'Chase United MileagePlus Explorer Business Visa',
                annualFee: 95,
                everywhere: 1.7,
                gas: 3.4,
                diningOut: 3.4,
                officeSupplyStores: 3.4,
                unitedFlights: 3.4
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
                everywhere: 1.4,
                southwestFlights: 2.8
            },
            {
                cardName: 'Chase Southwest Airlines Rapid Rewards Premier Business Visa',
                annualFee: 99,
                everywhere: 1.4,
                southwestFlights: 2.8
            },
            {
                cardName: 'Chase Southwest Airlines Rapid Rewards Premier Visa',
                annualFee: 99,
                everywhere: 1.4,
                southwestFlights: 2.8
            },
            {
                cardName: 'Chase Southwest Airlines Rapid Rewards Plus Visa',
                annualFee: 69,
                everywhere: 1.4,
                southwestFlights: 2.8
            },
            {
                cardName: 'Chase Hyatt Visa',
                annualFee: 75,
                everywhere: 1.5,
                diningOut: 3,
                airfare: 3,
                carRentals: 2,
                hyattHotels: 4.5
            },
            {
                cardName: 'Chase IHG Rewards Club Select MasterCard',
                annualFee: 49,
                everywhere: .5,
                gas: 1,
                groceries: 1,
                diningOut: 1,
                ihgHotels: 2.5
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
                everywhere: .5,
                diningOut: 1,
                airfare: 1,
                carRentals: 1,
                ritzCarltonMarriottAndStarwoodHotels: 2.5
            },
            {
                cardName: 'Chase Marriott Rewards Premier Business Visa Signature',
                annualFee: 99,
                everywhere: .5,
                diningOut: 1,
                airfare: 1,
                carRentals: 1,
                telecommunications: 1,
                officeSupplyStores: 1,
                marriottAndStarwoodHotels: 2.5
            },
            {
                cardName: 'American Express Mercedes Benz',
                annualFee: 95,
                everywhere: 2,
                gas: 6,
                diningOut: 4,
                selectMercedesPurchases: 10
            },
            {
                cardName: 'American Express Mercedes Benz Platinum',
                annualFee: 475,
                everywhere: 2,
                airfare: 10,
                selectMercedesPurchases: 10
            },
            {
                cardName: 'Citi® Double Cash Card',
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
                cardName: 'Citi Prestige® Card',
                annualFee: 250,
                everywhere: 1.5,
                diningOut: 3,
                airfare: 4.5,
                hotels: 4.5,
                entertainment:3
            },
            {
                cardName: 'Citi ThankYou® Premier Card',
                annualFee: 95,
                everywhere: 1.5,
                gas: 4.5,
                diningOut: 3,
                travel: 4.5,
                entertainment:3
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
                cardName: 'Citi ThankYou® Preferred Card for College Students',
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
                everywhere: 1.6,
                americanAirlinesFlights: 3.2
            },
            {
                cardName: 'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                annualFee: 95,
                everywhere: 1.6,
                americanAirlinesFlights: 3.2
            },
            {
                cardName: 'CitiBusiness®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                annualFee: 95,
                everywhere: 1.6,
                gas: 3.2,
                carRentals: 3.2,
                telecommunications: 3.2,
                americanAirlinesFlights: 3.2
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Red World Elite MasterCard',
                annualFee: 95,
                everywhere: 1.6,  
                americanAirlinesFlights: 3.2
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Silver World Elite MasterCard',
                annualFee: 195,
                everywhere: 1.6,
                hotels: 3.2,
                carRentals: 3.2,
                americanAirlinesFlights: 4.8
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Mastercard',
                annualFee: 0,
                everywhere: 1.6
            },
            {
                cardName: 'Barclaycard American Airlines AAdvantage Aviator Blue Mastercard',
                annualFee: 49,
                everywhere: 1.6,
                americanAirlinesFlights: 3.2
            },
            {
                cardName: 'Discover it®',
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
                cardName: 'Discover it® for Students',
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
                cardName: 'Discover it® Miles',
                annualFee: 0,
                everywhere: 1.5
            },
            {
                cardName: 'Discover it® Secured Credit Card',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2
            },
            {
                cardName: 'Discover it Chrome',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2
            },
            {
                cardName: 'Discover it® chrome for Students',
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
                cardName: 'Wells Fargo Business Visa',
                annualFee: 0,
                everywhere: 1
            },
            {
                cardName: 'Citi Hilton HHonors Visa Signature',
                annualFee: 0,
                everywhere: 1,
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
                cardName: 'Choice Privileges Visa Signature',
                annualFee: 0,
                everywhere: 1,
                choiceHotels: 2.5
            },
            {
                cardName: 'JP Morgan Chase Palladium Visa Signature',
                annualFee: 595,
                everywhere: 2,
                travel: 4
            },
            {
                cardName: 'Chase British Airways Avios Visa Signature',
                annualFee: 95,
                everywhere: 1.4,
                britishAirwaysFlights: 4.2
            },
            {
                cardName: 'Bank of America Allegiant Airlines World MasterCard',
                annualFee: 59,
                everywhere: .4,
                diningOut: .8,
                allegiantAirlinesFlights: 2.4
            },
            {
                cardName: 'Bank of America Spirit Airlines World MasterCard',
                annualFee: 59,
                everywhere: .4
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
            'singleAirline',
            'diningOutYearOne'
        ],
        justCardNames: [
            'No Credit Card',
            'American Express Blue Cash Everyday',
            'American Express Blue Cash Preferred',
            'American Express Blue Sky',
            'The Blue for Business® Credit Card from American Express',
            'American Express Charles Schwabb Investor Card',
            'The Platinum® Card From American Express',
            'The Business Platinum® Card From American Express OPEN®',
            'The Amex Everyday® Credit Card from American Express',
            'The Amex Everyday® Preferred Credit Card from American Express',
            'SimplyCash® Plus Business Credit Card from American Express',
            'The Business Gold Rewards Card From American Express OPEN®',
            'Premier Rewards Gold Card From American Express®',
            'American Express Corporate Gold',
            'American Express Gold',
            'American Express Corporate Platinum',
            'American Express Centurion',
            'American Express Green',
            'American Express Plum',
            'American Express Hilton HHonors',
            'American Express Hilton HHonors Surpass',
            'Starwood Preferred Guest® Credit Card from American Express',
            'Starwood Preferred Guest® Business Credit Card from American Express',
            'Gold Delta SkyMiles® Credit Card from American Express',
            'Gold Delta SkyMiles® Business Credit Card from American Express',
            'Platinum Delta SkyMiles® Credit Card from American Express',
            'Platinum Delta SkyMiles® Business Credit Card from American Express',
            'Delta Reserve Credit Card from American Express®',
            'Delta Reserve for Business Credit Card from American Express®',
            'Bank of America BankAmericard Cash Rewards Visa (All Versions)',
            'Bank of America® BankAmericard Travel Rewards® Credit Card',
            'Bank of America BankAmericard MasterCard',
            'Bank of America BankAmericard Rewards Visa',
            'Bank of America WorldPoints Visa or MasterCard',
            'Bank of America® Alaska Airlines Visa Signature® Credit Card',
            'Bank of America Alaska Airlines Platinum Plus Visa',
            'Bank of America Alaska Airlines Business Visa',
            'Bank of America Virgin Atlantic World Elite MasterCard',
            'Bank of America Cash Rewards For Business MasterCard',
            'Bank of America Travel Rewards World MasterCard For Business',
            'Bank of America Hawaiian Airlines World Elite MasterCard',
            'Barclaycard Arrival Plus™ World Elite MasterCard®',
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
            'Capital One® Quicksilver® Cash Rewards Credit Card',
            'Capital One® QuicksilverOne® Cash Rewards Credit Card',
            'Capital One® Venture® Rewards Credit Card',
            'Capital One Venture One Rewards Visa',
            'Capital One® Platinum Credit Card',
            'Capital One® Secured MasterCard®',
            'Journey® Student Rewards from Capital One®',
            'Capital One Buy Power MasterCard',
            'Capital One® Spark® Cash Select for Business',
            'Capital One Spark Miles Select For Business Visa',
            'Capital One® Spark® Cash for Business',
            'Capital One Spark Miles For Business Visa',
            'Capital One® Spark® Classic for Business',
            'Capital One BuyPower For Business MasterCard',
            'Capital One Cash Rewards Visa or MasterCard',
            'Capital One Platinum Prestige Visa or MasterCard',
            'Capital One Spark Select For Business Visa',
            'Chase Freedom Unlimited℠',
            'Chase Freedom®',
            'Chase Sapphire Preferred® Card',
            'Chase Sapphire Reserve℠',
            'Chase Ink Plus or Bold Business Visa or MasterCard',
            'Chase® Ink Business Cash℠ Credit Card',
            'Chase® Ink Business Preferred℠ Credit Card',
            'Chase Slate Visa',
            'Chase Marriott Rewards Premier Visa',
            'Chase Marriott Rewards Premier Business Visa',
            'Chase® United MileagePlus® Explorer Card',
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
            'Citi® Double Cash Card',
            'Citi Simplicity MasterCard',
            'Citi Diamond Preferred MasterCard',
            'Citi Costco Anywhere Visa',
            'Citi Costco Anywhere Business Visa',
            'Citi Prestige® Card',
            'Citi ThankYou® Premier Card',
            'Citi Secured MasterCard',
            'Citi ThankYou® Preferred Card for College Students',
            'Citi Thank You Preferred MasterCard',
            'Citi Forward MasterCard or Visa',
            'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
            'Citi American Airlines AAdvantage Executive World Elite MasterCard',
            'CitiBusiness®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
            'Barclaycard American Airlines AAdvantage Aviator Red World Elite    MasterCard',
            'Barclaycard American Airlines AAdvantage Aviator Silver World Elite MasterCard',
            'Barclaycard American Airlines AAdvantage Aviator Mastercard',
            'Barclaycard American Airlines AAdvantage Aviator Blue Mastercard',
            'Discover it®',
            'Discover it® for Students',
            'Discover it® chrome for Students',
            'Discover it® Miles',
            'Discover it® Secured Credit Card',
            'Discover it Chrome',
            'Discover More',
            'Discover Business Card',
            'Wells Fargo Cash Wise Visa',
            'Wells Fargo Propel 365 By American Express',
            'Wells Fargo Platinum Visa',
            'Wells Fargo Rewards Visa',
            'Wells Fargo Propel By American Express',
            'Wells Fargo Secured Visa',
            'Wells Fargo Business Visa',
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
            'Choice Privileges Visa Signature',
            'JP Morgan Chase Palladium Visa Signature',
            'Chase British Airways Avios Visa Signature',
            'Bank of America Allegiant Airlines World MasterCard',
            'Bank of America Spirit Airlines World MasterCard',
            'Comenity Bank Virgin America Visa Signature',
            'Comenity Bank Virgin America Premium Visa Signature'
        ],
        userSelections: [],
        currentStatusBasedOnSelections: {
            ownBusiness: null,
            creditScore: null,
            rewardsGoal: null,
            monthlySpend: null,
            totalAnnualFee: null,
            everywhere: 0        
        },
        currentCategoriesArray: {
        },
        comparisonData: [
        ],
        possiblePersRecs: [
            {
                cardName: 'Discover it®',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 5,
                    diningOut: 5,
                    localTransportation: 5,
                    departmentStores: 5,
                    amazon: 5,
                    wholesaleClubs: 5,
                    gasYearOne: 10,
                    diningOutYearOne: 10,
                    localTransportationYearOne: 10,
                    departmentStoresYearOne: 10,
                    amazonYearOne: 10,
                    wholesaleClubsYearOne: 10
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '5% (10% in year 1) on quarterly rotating categories up to $1,500 spent per quarter.'
                        },
                        {
                            icon: 'stop',
                            detail: '1% (2% in year 1) everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Typical Categories: gas, local transportation, Uber & Lyft in Q1, diningOut, movies & wholesale clubs in Q2, Amazon & home improvement stores in Q3 then department stores & Amazon in Q4.'
                        },
                        {
                            icon: 'stop',
                            detail: 'All cash back doubled at the end of year 1 (including Discover Deals® which makes the card a 2% and 10% card in the first year.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although Discover® cards not widely accepted abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Discover Deals® online shopping portal for an extra 5%-35% cash back with participating merchants.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Large and useful 5% cash back bonus categories (doubled to 10% in year one).'
                        },
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: 'All cash back doubled at the end of year one.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19315&c=246411332&aid=6478b8ee&sid=38190&last_updated=1464099359'
                }
            },
            {
                cardName: 'Discover it® for Students',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 5,
                    diningOut: 5,
                    localTransportation: 5,
                    departmentStores: 5,
                    amazon: 5,
                    wholesaleClubs: 5,
                    gasYearOne: 10,
                    diningOutYearOne: 10,
                    localTransportationYearOne: 10,
                    departmentStoresYearOne: 10,
                    amazonYearOne: 10,
                    wholesaleClubsYearOne: 10
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '$20 bonus (doubled to $40 in year one) each year you earn a 3.0 up to five years in college.'
                        },
                        {
                            icon: 'stop',
                            detail: '5% (10% in year 1) on quarterly rotating categories up to $1,500 spent per quarter.'
                        },
                        {
                            icon: 'stop',
                            detail: '1% (2% in year 1) everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Typical Categories: gas, local transportation, Uber & Lyft in Q1, diningOut, movies & wholesale clubs in Q2, Amazon & home improvement stores in Q3 then department stores & Amazon in Q4.'
                        },
                        {
                            icon: 'stop',
                            detail: 'All cash back doubled at the end of year 1 (including Discover Deals® which makes the card a 2% and 10% card in the first year.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although Discover® cards not widely accepted abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Discover Deals® online shopping portal for an extra 5%-35% cash back with participating merchants.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Large and useful 5% cash back bonus categories (doubled to 10% in year one).'
                        },
                        {
                            icon: 'stop',
                            detail: 'Low income requirement=easy approval.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 40,
                        bonusCopy: 'All cash back doubled at the end of year one.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19862&c=246411851&aid=6478b8ee&sid=38190&last_updated=1474585637'
                }
            },
            {
                cardName: 'Discover it® chrome for Students',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    gas: 2,
                    diningOut: 2,
                    gasYearOne: 4,
                    diningOutYearOne: 4
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '$20 bonus (doubled to $40 in year one) each year you earn a 3.0 up to five years in college.'
                        },
                        {
                            icon: 'stop',
                            detail: '2% (4% in year 1) on diningOut and gas in combined purchases up to $1,000 spent per quarter.'
                        },
                        {
                            icon: 'stop',
                            detail: '1% (2% in year 1) everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: 'All cash back doubled at the end of year 1 (including Discover Deals® which makes the card a 2% and 10% card in the first year.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although Discover® cards not widely accepted abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Discover Deals® online shopping portal for an extra 5%-35% cash back with participating merchants.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Useful 2% categories (doubled to 4% in year one).'
                        },
                        {
                            icon: 'stop',
                            detail: 'The regular Discover it® 5% categories may be more rewarding.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Low income requirement=easy approval.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 40,
                        bonusCopy: 'All cash back doubled at the end of year one.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19862&c=246411851&aid=6478b8ee&sid=38190&last_updated=1474585637'
                }
            },
            {
                cardName: 'Discover it® Miles',
                annualFee: 0,
                categories: {
                    everywhere: 1.5,
                    everywhereYearOne: 3
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '1.5% cash back on all purchases.'
                        },
                        {
                            icon: 'stop',
                            detail: 'All cash back doubled at the end of year 1 (including Discover Deals®) which makes the card earn 3% everywhere in the first year.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although Discover® cards not widely accepted abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Discover Deals® online shopping portal for an extra 5%-35% cash back with participating merchants.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Annual $30 fee credit for in-flight WiFi.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Massive 3% everywhere in year one is unparalleled.'
                        },
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: 'All cash back doubled at the end of year one.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19851&c=246411847&aid=6478b8ee&sid=38190&last_updated=1474585079'
                }
            },
            {
                cardName: 'Discover it® Secured Credit Card',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    everywhereYearOne: 2,
                    diningOut: 2,
                    gas: 2,
                    diningOutYearOne: 4,
                    gasYearOne: 4
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '1% (2% in year one) cash back on all purchases.'
                        },
                        {
                            icon: 'stop',
                            detail: '2% (4% in year one) cash back on gas and diningOut up to $1,000 combined spending per quarter.'
                        },
                        {
                            icon: 'stop',
                            detail: 'All cash back doubled at the end of year 1 (including Discover Deals®) which makes the card earn 3% everywhere in the first year.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although Discover® cards not widely accepted abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Discover Deals® online shopping portal for an extra 5%-35% cash back with participating merchants.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Security deposit of $200 establishes your credit line then authomatic monthly reviews after seven months to transition to a regular, unsecured credit card and refund the deposit.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Highest earning secured credit card on the market.'
                        },
                        {
                            icon: 'stop',
                            detail: 'One of the few secured credit cards without an annual fee.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Fast transition to a regular, unsecured credit card.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: 'All cash back doubled at the end of year one.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19875&c=246411855&aid=6478b8ee&sid=38190&last_updated=1474585831'
                }
            },
            {
                cardName: 'Bank of America® BankAmericard Travel Rewards® Credit Card',
                annualFee: 0,
                categories: {
                    everywhere: 1.5                
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '$200 bonus after spending $1,000 in the first 90 days.'
                        },
                        {
                            icon: 'stop',
                            detail: '1.5% everywhere with your Visa.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points that must be used to erase travel purchases charged to the card.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'You may earn more with a 2% everywhere or 5% rotating categories card but those cards typically do not have sign up bonuses and charge foreign transaction fees, unlike this card.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 200,
                        bonusCopy: 'Spend requirement: $1,000 in the first 90 days.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19870&c=246411853&aid=6478b8ee&sid=38190&last_updated=1474585739"'
                }
            },
            {
                cardName: 'Bank of America® Alaska Airlines Visa Signature® Credit Card',
                annualFee: 75,
                categories: {
                    everywhere: 1.7,
                    alaskaAirlinesFlights: 5.1
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '30,000 bonus miles and annual companion ticket (starting at $121) after spending $1,000 in the first 90 days.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 Alaska Airlines mile everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: '3 Alaska Airlines miles on Alaska Airlines ticket purchases.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$75'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad'
                        },
                        {
                            icon: 'stop',
                            detail: 'Free checked bags for you and up to six companions on the same reservation.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Annual companion fare on Alaska Airlines starting from $121 in fees + airport taxes.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Alaska Airlines miles can be redeemed for flights on Alaska Airlines, AeroMexico, Air France, American Airlines, British Airways, Cathay Pacific, Emirates, Fiji Airways, Hainan Airlines, Japan Airlines, Iceland Air, KLM, Korean Air, LATAM Airlines, Pen Air, Qantas, and Ravn Alaska.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The large bonus is certainly valuable.'
                        },
                        {
                            icon: 'stop',
                            detail: 'For day to day use we recommend a different card that earns points transferable to multiple arilines and more points per dollar spent.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 510,
                        bonusCopy: 'Spend requirement: $1,000 in the first 90 days.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19846&c=246411845&aid=6478b8ee&sid=38190&last_updated=1474583722'
                }
            },
            {
                cardName: 'Capital One® Venture® Rewards Credit Card',
                annualFee: 59,
                categories: {
                    everywhere: 2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '$400 bonus after spending $4,000 in the first three months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2% cash back everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $59 after that.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Cash back points must be used to erase travel purchases charged to the card.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Large bonus for a cash back card.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Another card earns 2% without an annual fee but it does not come with a sign up bonus and has foreign transaction fees.'
                        },
                        {
                            icon: 'stop',
                            detail: 'This card earns the same as its competitor and has a fee but comes with a large bonus and waived foreign transaction fees.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 400,
                        bonusCopy: 'Spend requirement: $3,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19870&c=246411853&aid=6478b8ee&sid=38190&last_updated=1474585739"'
                }
            },
            {
                cardName: 'Capital One® QuicksilverOne® Cash Rewards Credit Card',
                annualFee: 39,
                categories: {
                    everywhere: 1.5
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '1.5% cash back everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$39'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to a higher credit line afer making your first five monthly payments on time.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The Citi® Double Cash Card earns 2% as well but with foreign transaction fees and without a bonus.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Despite the fee, the Capital One® Venture® Rewards Credit Card may be better for you as it has a large $400 bonus and does not charge 3% foreign transaction fees.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: ''
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19855&c=246411848&aid=6478b8ee&sid=38190&last_updated=1474585182'
                }
            },
            {
                cardName: 'Capital One® Platinum Credit Card',
                annualFee: 0,
                categories: {
                    everywhere: 0
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No rewards.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to a higher credit line afer making your first five monthly payments on time.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'None'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'We prefer the Discover it® Secured Credit Card to build credit as it earns more cash back.'
                        },
                        {
                            icon: 'stop',
                            detail: 'This Capital One® card is better for you if you do not want to place an initial deposit and need a card without foreign transaction fees that is widely accepted abroad..'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: ''
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19873&c=246411854&aid=6478b8ee&sid=38190&last_updated=1474585781'
                }
            },
            {
                cardName: 'Capital One® Secured MasterCard®',
                annualFee: 0,
                categories: {
                    everywhere: 0
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No rewards.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to a higher credit line afer making your first five monthly payments on time.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Receive an initial $200 credit line after making a security deposit of $49, $99 or $200 dpending on your creditworthiness.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'None'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'We prefer the Discover it® Secured Credit Card to build credit as it earns more cash back.'
                        },
                        {
                            icon: 'stop',
                            detail: 'This Capital One® card is better for you if you do not want to place an initial deposit and need a card without foreign transaction fees that is widely accepted abroad..'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: ''
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19875&c=246411855&aid=6478b8ee&sid=38190&last_updated=1474585831'
                }
            },
            {
                cardName: 'Journey® Student Rewards from Capital One®',
                annualFee: 0,
                categories: {
                    everywhere: 1.25
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Earn 1.25% cash back everywhere when you pay on time each month.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to a higher credit line afer making your first five monthly payments on time.'
                        },
                        {
                            icon: 'stop',
                            detail: 'You do not have to be a student to apply.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'You should earn more cash back with the Discover it® Student Card.'
                        },
                        {
                            icon: 'stop',
                            detail: 'This Capital One® card is better for you if you need a card without foreign transaction fees widely this is accepted abroad..'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: ''
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19863&c=246411851&aid=6478b8ee&sid=38190&last_updated=1474585638'
                }
            },
            {
                cardName: 'Citi® Double Cash Card',
                annualFee: 0,
                categories: {
                    everywhere: 2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Earn 2% cash back everywhere with your MasterCard® when you pay on time each month.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Equifax® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Citi® Price Rewind. Register your purchases for automatic price drop refunds for 60 days from purchase.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: '2% everywhere without an annual fee is extremely rewarding and makes it one of the highest-earning cash back cards.'
                        },
                        {
                            icon: 'stop',
                            detail: 'The foreign transaction fees and lack of a sign up bonus may make otehr options more attractive.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: ''
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=20242&c=246411978&aid=6478b8ee&sid=38190&last_updated=1479505544'
                }
            },
            {
                cardName: 'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                annualFee: 95,
                categories: {
                everywhere: 1.6,
                    americanAirlinesFlights: 3.2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '30,000 American Airlines miles after spending $1,000 in the first three months.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 American Airlines mile everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: '2 American Airlines miles on American Airlines ticket purchases.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $95 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: '10% of redeemed American Airlines miles back up to 10,000 miles per year.'

                        },
                        {
                            icon: 'stop',
                            detail: 'Free Equifax® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'

                        },
                        {
                            icon: 'stop',
                            detail: 'First checked bags free on domestic flights for you and up to four companions on the same reservation.'

                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Citi® Price Rewind. Register your purchases for automatic price drop refunds for 60 days from purchase.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Preferred boarding and 25% off in-flight food and benerages on American Airlines flights.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'American Airlines miles can be redeemed for flights on American Airlines, OneWorld® alliance partner airlines and other partners.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The large bonus is certainly valuable.'
                        },
                        {
                            icon: 'stop',
                            detail: 'For day to day use we recommend a different card that earns points transferable to multiple arilines and more points per dollar spent.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 480,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19851&c=246411847&aid=6478b8ee&sid=38190&last_updated=1474585079'
              }
            },
            {
                cardName: 'Citi ThankYou® Preferred Card for College Students',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    entertainment: 2,
                    diningOut: 2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '$25 bonus after spending $500 in the first three months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2% on dining and entertainment.'
                        },
                        {
                            icon: 'stop',
                            detail: '1% everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Equifax® FICO® score updated monthly.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'A great card to build credit with good rewards.'
                        },
                        {
                            icon: 'stop',
                            detail: 'You may earn much higher rewards with the Discover it® Chrome for College Students or Discover It® for College Students.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 25,
                        bonusCopy: 'Spend Requirement: $500 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19862&c=246411851&aid=6478b8ee&sid=38190&last_updated=1474585637'
                }
            },
            {
                cardName: 'Citi ThankYou® Premier Card',
                annualFee: 95,
                categories: {
                    everywhere: 1.5,
                    diningOut: 3,
                    entertainment: 3,
                    gas: 4.5,
                    travel: 4.5
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '30,000 bonus ThankYou® points after spending $3,000 in the first three months.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 ThankYou® point everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: '2x ThankYou® points on dining and entertainment.'
                        },
                        {
                            icon: 'stop',
                            detail: '3x ThankYou® points on travel and gas.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $95 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Equifax® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Citi® Price Rewind. Register your purchases for automatic price drop refunds for 60 days from purchase.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'ThankYou® points can be transferred to many frequent flyer programs to fly with that airline or their partners.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Most useful partenrs typically include Air France/KLM Flying Blue, Virgin Atlantic, Singapore Airlines, and Etihad.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The bonus is valuable while the 3x and 2x bonus categories are very useful.'
                        },
                        {
                            icon: 'stop',
                            detail: 'The airline and hotel transfer partners of the Chase Sapphire Preferred®, Reserve℠ and Ink Business Preferred® cards make those points more valuable compared to Citi ThankYou® points.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 450,
                        bonusCopy: 'Spend requirement: $3,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19851&c=246411847&aid=6478b8ee&sid=38190&last_updated=1474585079'
               }
            },
            {
                cardName: 'Citi Prestige® Card',
                annualFee: 250,
                categories: {
                    everywhere: 1.5,
                    diningOut: 3,
                    entertainment: 3,
                    hotels: 4.5,
                    flights: 4.5
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '40,000 bonus ThankYou® points after spending $4,000 in the first three months.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 ThankYou® point everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: '2x ThankYou® points on dining and entertainment.'
                        },
                        {
                            icon: 'stop',
                            detail: '3x ThankYou® points on flights and hotels.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$450 annually minus an annual $250 credit for flights charged to the card. '
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Equifax® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Citi® Price Rewind. Register your purchases for automatic price drop refunds for 60 days from purchase.'
                        },
                        {
                            icon: 'stop',
                            detail: '$250 credit for flights charged to the card.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access for you and immediate family or two guest to 1,000+ airport lounges worldwide with Priority Pass Select® membership.'
                        },
                        {
                            icon: 'stop',
                            detail: '4th night free (based on average price of stay) for hotels booked through Citi Prestige® Concierge.'
                        },
                        {
                            icon: 'stop',
                            detail: '$100 Global Entry or TSA Pre √® application fee credit every five years.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'ThankYou® points can be transferred to many frequent flyer programs to fly with that airline or their partners.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Most useful partenrs typically include Air France/KLM Flying Blue, Virgin Atlantic, Singapore Airlines, and Etihad.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The bonus is valuable, the categories useful and the fourth hotel night free very lucrative.'
                        },
                        {
                            icon: 'stop',
                            detail: 'The Chase Sapphire Reserve℠ has a lower net fee, higher earning rates, and more valuable bonus and points.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 600,
                        bonusCopy: 'Spend requirement: $4,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=20242&c=246411978&aid=6478b8ee&sid=38190&last_updated=1479505544'
                }
            },
            {
                cardName: 'Barclaycard Arrival Plus™ World Elite MasterCard®',
                annualFee: 89,
                categories: {
                    everywhere: 2.1                
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '$525 bonus after spending $4,000 in the first 90 days.'
                        },
                        {
                            icon: 'stop',
                            detail: '2% everywhere + 5% rebate each time you redeem = 2.1% everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $89 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free TransUnion® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Chip and pin enabled.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Rewards earned are cash back points that must be used to erase travel purchases charged to the card.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: '2.1% is very useful for large spenders and beats out 2% cards, especially those with foreign transaction fees. '
                        },
                        {
                            icon: 'stop',
                            detail: 'The large bonus is certainly valuable.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 525,
                        bonusCopy: 'Spend requirement: $4,000 in the first 90 days.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19851&c=246411847&aid=6478b8ee&sid=38190&last_updated=1474585079'
                }
            },
            {
                cardName: 'Chase Freedom Unlimited℠',
                annualFee: 0,
                categories: {
                    everywhere: 3                
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '15,000 bonus Chase® Ultimate Rewards® points after spending $500 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '1.5 Chase® Ultimate Rewards® everywhere with your Visa®.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Access to Shop through Chase® online shopping portal.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Chase® Ultimate Rewards® transferable to frequent flyer and hotel programs if the same cardholder has either the Sapphire Preferred®, Sapphire Reserve℠, Ink Bold® Business, Ink Plus® Business, or Ink Businesss Preferred℠.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Chase® Ultimate Rewards® points transfer to United, Air France/KLM, British Airways, British Airways, Korean Air, Singapore Airlines, Southwest, Hyatt, IHG, Ritz-Carlton, and Marriott.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: '1.5x on all purchases is by far one of the highest flat rates for transferable points.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 225,
                        bonusCopy: 'Spend requirement: $500 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19851&c=246411847&aid=6478b8ee&sid=38190&last_updated=1474585079'
                }
            },
            {
                cardName: 'Chase Freedom®',
                annualFee: 0,
                categories: {
                    everywhere: 2,
                    gas: 10,
                    groceries: 10,
                    diningOut: 10,
                    uber: 10,
                    localTransportation: 10,
                    drugstores: 10,
                    departmentStores: 10
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '15,000 bonus Chase® Ultimate Rewards® points after spending $500 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '5 Chase® Ultimate Rewards® per dollar on quarterly rotating categories up to $1,500 spent per quarter.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Typical Categories: gas, commuter passes, Uber & Lyft in Q1, grocery stores and drugstores in Q2, diningOut in Q3 then department stores & drugstores in Q4.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 Chase® Ultimate Rewards® point per dollar spent everywhere with your Visa®.'
                        },
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Access to Shop through Chase® online shopping portal.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Chase® Ultimate Rewards® transferable to frequent flyer and hotel programs if the same cardholder has either the Sapphire Preferred®, Sapphire Reserve℠, Ink Bold® Business, Ink Plus® Business, or Ink Businesss Preferred℠.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Chase® Ultimate Rewards® points transfer to United, Air France/KLM, British Airways, British Airways, Korean Air, Singapore Airlines, Southwest, Hyatt, IHG, Ritz-Carlton, and Marriott.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Useful 5x categories add up quickly and are twice as valuable if you have a Chase® card that is transferable to airlines and hotels.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 225,
                        bonusCopy: 'Spend requirement: $500 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19315&c=246411332&aid=6478b8ee&sid=38190&last_updated=1464099359'
                }
            },
            {
                cardName: 'Chase Sapphire Preferred® Card',
                annualFee: 95,
                categories: {
                    everywhere: 2,
                    travel: 4,
                    dining: 4
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '50,000 bonus Chase® Ultimate Rewards® points after spending $4,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2x Chase® Ultimate Rewards® on travel and dining.'
                        },
                        {
                            icon: 'stop',
                            detail: '1x Chase® Ultimate Rewards® everywhere with you Visa®.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in your first year then $95 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance abroad with your Visa®.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Shop through Chase® online shopping portal.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Chase® Ultimate Rewards® points transfer to United, Air France/KLM, British Airways, British Airways, Korean Air, Singapore Airlines, Southwest, Hyatt, IHG, Ritz-Carlton, and Marriott.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Massive bonus, useful 2x categories and no foreign transaction fees.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Combining this card with no annual fee Chase® cards will increase your earning rate even further.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 1000,
                        bonusCopy: 'Spend requirement: $4,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19851&c=246411847&aid=6478b8ee&sid=38190&last_updated=1474585079'
                }
            },
            {
                cardName: 'Chase Sapphire Reserve℠',
                annualFee: 150,
                categories: {
                    everywhere: 2,
                    travel: 6,
                    dining: 6
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '50,000 bonus Chase® Ultimate Rewards® points after spending $4,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '3x Chase® Ultimate Rewards® on travel and dining.'
                        },
                        {
                            icon: 'stop',
                            detail: '1x Chase® Ultimate Rewards® everywhere with you Visa®.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$450 minus an automatic $300 credit each year for any travel purchases charged to the card.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance abroad with your Visa®.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Shop through Chase® online shopping portal.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access for you and unlimited guests to 1,000+ airport lounges worldwide with Priority Pass Select® membership.'
                        },
                        {
                            icon: 'stop',
                            detail: '$100 Global Entry or Tsa Pre √® application fee credit every four years.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Chase® Ultimate Rewards® points transfer to United, Air France/KLM, British Airways, British Airways, Korean Air, Singapore Airlines, Southwest, Hyatt, IHG, Ritz-Carlton, and Marriott.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'Massive bonus, low net fee, valuable 3x categories, and airport lounge access make this an unparallelled card.'
                        },
                        {       
                            icon: 'stop',
                            detail: 'The ability to combine this card with no annual fee Chase® cards greatly increases your rewards earning rate.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 1000,
                        bonusCopy: 'Spend requirement: $4,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: ''
                    }
            },
            {
                cardName: 'Chase® United MileagePlus® Explorer Card',
                annualFee: 95,
                categories: {
                    everywhere: 1.7,
                    unitedFlights: 3.4
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '50,000 bonus United miles after spending $3,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2x United miles on United flight purchases.'
                        },
                        {
                            icon: 'stop',
                            detail: '1x United miles everywhere with your Visa®.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$95'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees and wide acceptance abroad with your Visa®.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Free checked bag for you when you pay for your flight with this card.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Two United Club℠ airport lounge access passes each year.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Redeem United miles for United flights, Star Alliance airlines and more partners.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The large bonus is certainly valuable.'
                        },
                        {
                            icon: 'stop',
                            detail: 'For day to day use we recommend a different card that earns points transferable to multiple arilines and more points per dollar spent.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 850,
                        bonusCopy: 'Spend requirement: $3,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: ''
                }
            },
            {
                cardName: 'The Amex Everyday® Credit Card from American Express',
                annualFee: 0,
                categories: {
                    everywhere: 2.4,
                    uber: 4.4,
                    amexTravel: 4.4,
                    groceries: 4.8
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '10,000 bonus Membership Rewards® points after spending $1,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2 (2.4 with bonus) Membership Rewards® points per dollar on groceries (up to $6,000 spent per year).'
                        },
                        {
                            icon: 'stop',
                            detail: '2 (2.2 with bonus) Membership Rewards® points per dollar on Uber and Amex Travel.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 (1.2 with bonus) Membership Rewards® points per dollar everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: 'If you make 20 transactions a month, you receive a 20% bonus on points earned that month.'
                        } 
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: 'None!'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Experian® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'This is the only no annual fee card that earns points directly transferable to frequent flyer programs and earns more points than most airline credit cards.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 200,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19858&c=246411849&aid=6478b8ee&sid=38190&last_updated=1474585550'
                }
            },
            {
                cardName: 'The Amex Everyday® Preferred Credit Card from American Express',
                annualFee: 0,
                categories: {
                    everywhere: 3,
                    uber: 5,
                    amexTravel: 5,
                    gas: 6,
                    groceries: 9
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '15,000 bonus Membership Rewards® points after spending $1,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '3 (4.5 with bonus) Membership Rewards® points per dollar on groceries (up to $6,000 spent per year).'
                        },
                        {
                            icon: 'stop',
                            detail: '2 (3 with bonus) Membership Rewards® points per dollar on gas.'
                        },
                        {
                            icon: 'stop',
                            detail: '2 (2.5 with bonus) Membership Rewards® points per dollar on Uber and Amex Travel.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 (1.5 with bonus) Membership Rewards® points per dollar everywhere.'
                        },
                        {
                            icon: 'stop',
                            detail: 'If you make 30 transactions a month, you receive a 50% bonus on points earned that month.'
                        } 
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$95'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Experian® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: '1.5x on all purchases is by far one of the highest flat rates for transferable points. The 2.2x-4.5x categories make this one of the highest earning transferable points cards.'
                        },
                        {
                            icon: 'stop',
                            detail: 'If you are not a high spender, the no annual fee version of this card may work better for you.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 300,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19310&c=246411331&aid=6478b8ee&sid=38190&last_updated=1464099303'
                }
            },
            {
                cardName: 'Premier Rewards Gold Card From American Express®',
                annualFee: 195,
                categories: {
                    everywhere: 2,
                    groceries: 4,
                    gas: 4,
                    diningOut: 4,
                    flights: 6
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '25,000 bonus Membership Rewards® points after spending $2,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '3 Membership Rewards® points per dollar on airfare.'
                        },
                        {
                            icon: 'stop',
                            detail: '2 Membership Rewards® on gas, groceries, and diningOut.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 Membership Rewards® points everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $195 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: '$100 annual airline incidential fee credit for one US airline.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Free Experian® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees but American Express® cards are not widely accepted abroad.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The sign up bonus and 2x as well as 3x categories are great.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Low and no fee Amex cards like the Everyday® and Everyday® Preferred or Chase® Ultimate Rewards® cards should earn more points than this card.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 300,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19870&c=246411853&aid=6478b8ee&sid=38190&last_updated=1474585739'
                }
            },
            {
                cardName: 'Gold Delta SkyMiles® Credit Card from American Express',
                annualFee: 95,
                categories: {
                    everywhere: 1.6,
                    deltaFlights: 3.2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '30,000 bonus Delta miles after spending $1,000 in the first 3 months and $50 statement credit after making a Delta purchase in the first three months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2x Delta miles on Delta flight purchases.'
                        },
                        {
                            icon: 'stop',
                            detail: '1x Delta mile everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $95 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees but American Express® cards are not widely accepted abroad.'
                        },
                        {
                            icon: 'stop',
                            detail: 'First checked bag free for you and up to 9 companions on the same reservation.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Pririty boarding.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Free Experian® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Redeem Delta miles for Delta flights, SkyTeam alliance airlines and more partners.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The large bonus is certainly valuable.'
                        },
                        {
                            icon: 'stop',
                            detail: 'For day to day use we recommend a different card that earns points transferable to multiple arilines and more points per dollar spent.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 510,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19846&c=246411845&aid=6478b8ee&sid=38190&last_updated=1474583722'
                }
            },
            {
                cardName: 'The Platinum® Card From American Express',
                annualFee: 550,
                categories: {
                    everywhere: 2,
                    airfare: 10
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '40,000 bonus Membership Rewards® points after spending $3,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: 'An additional 25,000 bonus Membership Rewards® points after spending an additional $10,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '5 Membership Rewards® points on airfare.'
                        },
                        {
                            icon: 'stop',
                            detail: '1.5 Membership Rewards® points on large purchases over $5,000.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 Membership Rewards® points per dollar everywhere.'
                        }
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$550'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: '$200 annual airline incidental fee reimbursement for one US airline.'

                        },
                        {
                            icon: 'stop',
                            detail: '$200 annual Uber credits portioned out monthly.'

                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'

                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although American Express® cards are not sidely accepted abroad.'

                        },
                        {
                            icon: 'stop',
                            detail: '$100 Global Entry or TSA Pre √® application fee credit every five years.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Free Experian® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access for you and two guests to 1,000+ airport lounges worldwide with Priority Pass Select® membership.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Delta SkyClub access when flying Delta.'
                        },
                        {
                            icon: 'stop',
                            detail: 'SPG® gold status.'
                        },
                        {
                            icon: 'stop',
                            detail: '10 free GoGo airplane WiFi passes annually and unlimited Boingo internet access.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                        }

                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The massive bonus requires a lot of spending but is very valuable and the 5x on airfare is unparallelled..'
                        },
                        {
                            icon: 'stop',
                            detail: 'We favor the Chase Sapphire Reserve℠ for its much lower net fee and ability to combine with other Chase® cards to earn many more points.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 800,
                        bonusCopy: 'Spend Requirement: $3,000-$13,000 in the first 3 months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: ''
                }
            },
            {
                cardName: 'Starwood Preferred Guest® Credit Card from American Express',
                annualFee: 95,
                categories: {
                    everywhere: 2,
                    starwoodAndMarriottHotels: 4
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                        {
                            icon: 'stop',
                            detail: '25,000 bonus Starpoints® after spending $3,000 in the first 3 months.'
                        },
                        {
                            icon: 'stop',
                            detail: '2 Starpoints® at SPG® and Marriott Rewards® hotels.'
                        },
                        {
                            icon: 'stop',
                            detail: '1 Starpoint® everywhere.'
                        } 
                    ],
                    annualFeeDetails: [
                        {
                            icon: 'stop',
                            detail: '$0 in the first year then $95 annually.'
                        }
                    ],
                    extraBenefitsDetails: [
                        {
                            icon: 'stop',
                            detail: 'Free Experian® FICO® score updated monthly.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                        },
                        {
                            icon: 'stop',
                            detail: 'No foreign transaction fees although American Express® cards are not widely accepted abroad.'
                        }
                    ],
                    redemptionDetails: [
                        {
                            icon: 'stop',
                            detail: 'Starpoints® can be used for SPG® and Marriott Rewards® hotel stays.'
                        },
                        {
                            icon: 'stop',
                            detail: 'Starpoints® transfer to over 30 frequent flyer programs and with a 5,000 miles bonus for every 20,000 point transfered.'
                        }
                    ],
                    analysisDetails: [
                        {
                            icon: 'stop',
                            detail: 'The large bonus is certainly valuable.'
                        },
                        {
                            icon: 'stop',
                            detail: 'For day to day use we recommend a different card that earns more points per dollar spent.'
                        }
                    ],
                    signupBonus: {
                        bonusValue: 500,
                        bonusCopy: 'Spend requirement: $3,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19848&c=246411846&aid=6478b8ee&sid=38190&last_updated=1474583781'
                }
            }
        ],
        possibleBizRecs: [ 
            {
                cardName: 'Capital One® Spark® Cash Select for Business',
                annualFee: 0,
                categories: {
                    everywhere: 1.5
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [  
                    {
                        icon: 'stop',
                        detail: '$200 after spending $3,000 in the first three months.'
                    },
                    {
                        icon: 'stop',
                        detail: '1.5% cash back everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: 'None!'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Rewards earned are cash back.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The flat 1.5% cash back rate is very rewarding and so is the large $200 bonus.'
                    },
                    {
                        icon: 'stop',
                        detail: 'We recommend comparing this earning rate to the 5% and 2% bonus categories that add up quickly with the Chase® Ink Business Cash℠ Credit Card, especially as it does not have an annual fee.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 200,
                        bonusCopy: 'Spend Requirement: $3,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Capital One® Spark® Cash for Business',
                annualFee: 59,
                categories: {
                    everywhere: 2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '$500 after spending $4,500 in the first three months.'
                    },
                    {
                        icon: 'stop',
                        detail: '2% cash back everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$0 in the first year then $59 annually.'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Rewards earned are cash back.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The flat 2% cash back rate is very rewarding and so is the large $500 bonus.'
                    },
                    {
                        icon: 'stop',
                        detail: 'We recommend comparing this earning rate to the 5% and 2% bonus categories that add up quickly with the Chase® Ink Business Cash℠ Credit Card, especially as it does not have an annual fee.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 500,
                        bonusCopy: 'Spend Requirement: $4,500 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Capital One® Spark® Classic for Business',
                annualFee: 0,
                categories: {
                    everywhere: 1
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '1% cash back everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: 'None!'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees and wide acceptance of Visa® cards abroad'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Rewards earned are cash back.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'A good option for a business credit card without a fee while you build your credit score.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 0,
                        bonusCopy: ''
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Chase® Ink Cash℠ Business Visa',
                annualFee: 0,
                categories: {
                    everywhere: 2,
                    diningOut: 4,
                    gas: 4,
                    telecommunications: 10,
                    officeSupplyStores: 10
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '30,000 bonus Chase® Ultimate Rewards® after spending $3,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '5x Chase® Ultimate Rewards® on internet, TV and phone services, office supply stores, Netflix, Hulu, and Spotify. (Up to $25,000 in combined purchases per year.)'
                    },
                    {
                        icon: 'stop',
                        detail: '2x Chase® Ultimate Rewards® on diningOut and gas. (Up to $25,000 in combined purchases per year.)'
                    },
                    {
                        icon: 'stop',
                        detail: '1x Chase® Ultimate Rewards® everywhere with your Visa®.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: 'None!'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'Access to Shop through Chase® online shopping portal.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Rewards are cash back but can become Chase® Ultimate Rewards® transferable to frequent flyer and hotel programs if the same cardholder has either the Sapphire Preferred®, Sapphire Reserve℠, Ink Bold® Business, Ink Plus® Business, or Ink Businesss Preferred℠.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Chase® Ultimate Rewards® points transfer to United, Air France/KLM, British Airways, British Airways, Korean Air, Singapore Airlines, Southwest, Hyatt, IHG, Ritz-Carlton, and Marriott.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'By far the best no annual fee business cash back card with useful 5% categories.'
                    },
                    {
                        icon: 'stop',
                        detail: 'The ability to combine with other Chase® cards that transfer to airlines and hotels is unparallelled.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 300,
                        bonusCopy: 'Spend requirement: $4,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Chase® Ink Business Preferred℠ Visa',
                annualFee: 95,
                categories: {
                    everywhere: 2,
                    travel: 6,
                    socialMediaAdvertising: 6,
                    telecommunications: 6,
                    shipping: 6
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '80,000 bonus Chase® Ultimate Rewards® after spending $5,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '3x Chase® Ultimate Rewards® on internet, TV and phone services, office supply stores, Netflix, Hulu, and Spotify. (Up to $150,000 in combined purchases per year.)'
                    },
                    {
                        icon: 'stop',
                        detail: '1x Chase® Ultimate Rewards® everywhere with your Visa®.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$95'
                    }
                    ],
                    extraBenefitsDetails: [
                    { 
                        icon: 'stop',
                        detail: 'No foreign transaction fees and wide acceptance abroad with your Visa®.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Access to Shop through Chase® online shopping portal.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Chase® Ultimate Rewards® points transfer to United, Air France/KLM, British Airways, British Airways, Korean Air, Singapore Airlines, Southwest, Hyatt, IHG, Ritz-Carlton, and Marriott.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The most valuable sign up bonus and very rewarding/useful 3x categories.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Combining this card with no annual fee Chase® cards allows you to greatly increase your rewards rate even further.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 1600,
                        bonusCopy: 'Spend requirement: $5,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=20242&c=246411978&aid=6478b8ee&sid=38190&last_updated=1479505544'
                }
            },
            {
                cardName: 'SimplyCash® Plus Business Credit Card from American Express',
                annualFee: 0,
                categories: {
                    everywhere: 1,
                    diningOut: 3, 
                    cellPhoneServices: 5,
                    officeSupplyStores: 5
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '$200 bonus after spending $5,000 in the first 6 months.'
                    },
                    {
                        icon: 'stop',
                        detail: 'An additional $200 bonus after spending an additional $10,000 in the first year.'
                    },
                    {
                        icon: 'stop',
                        detail: '5% on cell phone services and office supply stores.($50,000 combined spending limit for all 5% and 3% categories per year.)'
                    },
                    {
                        icon: 'stop',
                        detail: '3% on your choice of one of 8 categories such as gas, diningOut, hotels or airfare. ($50,000 combined spending limit for all 5% and 3% categories per year.)'
                    },
                    {
                        icon: 'stop',
                        detail: '1% everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: 'None!'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Rewards are cash back automatically credited to each statement.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'Valuable signup bonus and 5% categories, all without an annual fee.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Compare this to the Chase® Ink Business Cash℠ Credit Card and its more comprehensive 5x categories as well as the ability to combine with cards that transfer to arilines and hotels. '
                    }
                    ],
                    signupBonus: {
                        bonusValue: 400,
                        bonusCopy: 'Spend requirement: $5,000 in the first 6 months & an additional $10,000 in the first year.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'The Blue for Business® Credit Card from American Express',
                annualFee: 0,
                categories: {
                    everywhere: 2.6
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '10,000 bonus Membership Rewards® points after making your first purchase in the first three months. $1,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '15,000 bonus Membership Rewards® points after spending $5,000 in the first 6 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '1 (1.3 with bonus) Membership Rewards® points per dollar everywhere.'
                    },
                    {
                        icon: 'stop',
                        detail: '30% annual bonus on points earned.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: 'None!'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Rewards are only Membership Rewards® points transferable to airlines if the same cardholder also has a card transerable to airlines such as the Amex Everyday®, Gold®, or Platinum® cards.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                    }

                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'When combined with another card that earns American Express® points transferable to airlines, the 1.3x on all purchases and valuable sign up bonus make this a rewarding card without a fee.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 500,
                        bonusCopy: 'Spend Requirement: First purchase and $5,000 in the first 6 months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'The Business Gold Rewards Card From American Express OPEN®',
                annualFee: 175,
                categories: {
                    everywhere: 2,
                    gas: 4,
                    shipping: 4,
                    socialMediaAdvertising: 4,
                    airfare: 6
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '50,000 bonus Membership Rewards® points after spending $5,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '3 Membership Rewards® points on your choice of either airfare, gas, shipping, social media and searh engine advertising, and select computer equiptment (up to $100,000 spent per year).'
                    },
                    {
                        icon: 'stop',
                        detail: '2 Membership Rewards® points in the remaining categories you did not pick up to $100,000 spent per year.'
                    },
                    {
                        icon: 'stop',
                        detail: '1 Membership Rewards® points per dollar everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$0 in the first year then $175 annually.'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                    },
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees although American Express® cards are not sidely accepted abroad.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                    }

                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'We prefer the Chase® Ink Business Preferred℠ Credit Card for the larger sign up bonus, lower fee and ability to earn more points with other Chase® cards that do not have annual fees.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 1000,
                        bonusCopy: 'Spend Requirement: $5,000 in the first 3 months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'The Business Platinum® Card From American Express OPEN®',
                annualFee: 450,
                categories: {
                    everywhere: 2,
                    airfare: 10
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '50,000 bonus Membership Rewards® points after spending $10,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: 'An additional 25,000 bonus Membership Rewards® points after spending an additional $10,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '5 Membership Rewards® points on airfare.'
                    },
                    {
                        icon: 'stop',
                        detail: '1.5 Membership Rewards® points on large purchases over $5,000.'
                    },
                    {
                        icon: 'stop',
                        detail: '1 Membership Rewards® points per dollar everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$450'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                    },
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees although American Express® cards are not sidely accepted abroad.'
                    },
                    {
                        icon: 'stop',
                        detail: '$200 annual airline incidental fee reimbursement for one US airline.'
                    },
                    {
                        icon: 'stop',
                        detail: '$100 Global Entry or TSA Pre √® application fee credit every five years.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Access for you and two guests to 1,000+ airport lounges worldwide with Priority Pass Select® membership.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Delta SkyClub access when flying Delta.'
                    },
                    {
                        icon: 'stop',
                        detail: 'SPG® gold status.'
                    },
                    {
                        icon: 'stop',
                        detail: '10 free GoGo airplane WiFi passes annually and unlimited Boingo internet access.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Membership Rewards® points transfer to Air Canada, Delta, British Airways, Air France/KLM, Virgin Atlantic, Iberia, All Nippon Airways, Singapore Airlines, Emirates, Hawaiian Airlines, Cathay Pacific Asia Miles, and Etihad.'
                    }

                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The massive bonus requires a lot of spending but is very valuable and the 5x on airfare is unparallelled..'
                    },
                    {
                        icon: 'stop',
                        detail: 'We favor the Chase Sapphire Reserve℠ or the Ink Business Preferred℠ for its much lower net fee and ability to combine with other Chase® cards to earn many more points.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 1500,
                        bonusCopy: 'Spend Requirement: $10,000-$20,000 in the first 3 months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Starwood Preferred Guest® Business Credit Card from American Express',
                annualFee: 95,
                categories: {
                    everywhere: 2,
                    starwoodAndMarriottHotels: 4
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '25,000 bonus Starpoints® after spending $5,000 in the first 3 months.'
                    },
                    {
                        icon: 'stop',
                        detail: '2 Starpoints® at SPG® and Marriott Rewards® hotels.'
                    },
                    {
                        icon: 'stop',
                        detail: '1 Starpoint® everywhere.'
                    } 
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$0 in the first year then $95 annually.'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                    },
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees although American Express® cards are not widely accepted abroad.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Starpoints® can be used for SPG® and Marriott Rewards® hotel stays.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Starpoints® transfer to over 30 frequent flyer programs and with a 5,000 miles bonus for every 20,000 point transfered.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The large bonus is certainly valuable.'
                    },
                    {
                        icon: 'stop',
                        detail: 'For day to day use we recommend a different card that earns more points per dollar spent.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 500,
                        bonusCopy: 'Spend requirement: $5,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Gold Delta SkyMiles® Business Credit Card from American Express',
                annualFee: 95,
                categories: {
                    everywhere: 1.6,
                    deltaFlights: 3.2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '30,000 bonus Delta miles after spending $1,000 in the first 3 months and $50 statement credit after making a Delta purchase in the first three months.'
                    },
                    {
                        icon: 'stop',
                        detail: '2x Delta miles on Delta flight purchases.'
                    },
                    {
                        icon: 'stop',
                        detail: '1x Delta mile everywhere.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$0 in the first year then $95 annually.'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees but American Express® cards are not widely accepted abroad.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Pririty boarding and 20% off in-flight food and drink.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Access to Amex Offers. Save offers from participating merchants and automatically receive discounts or bonus points when you use your Amex.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'Redeem Delta miles for Delta flights, SkyTeam alliance airlines and more partners.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The large bonus is certainly valuable.'
                    },
                    {
                        icon: 'stop',
                        detail: 'For day to day use we recommend a different card that earns points transferable to multiple arilines and more points per dollar spent.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 510,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
            },
            {
                cardName: 'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                annualFee: 95,
                categories: {
                    everywhere: 1.6,
                    americanAirlinesFlights: 3.2,
                    telecommunications: 3.2,
                    carRentals: 3.2,
                    gas: 3.2
                },
                cardDetails: {
                    cardImage: 'stop',
                    bonusAndEarningsDetails: [
                    {
                        icon: 'stop',
                        detail: '30,000 American Airlines miles after spending $1,000 in the first three months.'
                    },
                    {
                        icon: 'stop',
                        detail: '1 American Airlines mile everywhere.'
                    },
                    {
                        icon: 'stop',
                        detail: '2 American Airlines miles on American Airlines ticket purchases, telecommunications, gas and rental cars.'
                    }
                    ],
                    annualFeeDetails: [
                    {
                        icon: 'stop',
                        detail: '$0 in the first year then $95 annually.'
                    }
                    ],
                    extraBenefitsDetails: [
                    {
                        icon: 'stop',
                        detail: 'First checked bags free on domestic flights for you and up to four companions on the same reservation.'
                    },
                    {
                        icon: 'stop',
                        detail: 'No foreign transaction fees and wide acceptance of MasterCard® cards abroad.'
                    },
                    {
                        icon: 'stop',
                        detail: 'Preferred boarding on domestic flights and 25% discount on in-flight purchases on American Airlines flights.'
                    }
                    ],
                    redemptionDetails: [
                    {
                        icon: 'stop',
                        detail: 'American Airlines miles can be redeemed for flights on American Airlines, OneWorld® alliance partner airlines and other partners.'
                    }
                    ],
                    analysisDetails: [
                    {
                        icon: 'stop',
                        detail: 'The large bonus is certainly valuable.'
                    },
                    {
                        icon: 'stop',
                        detail: 'For day to day use we recommend a different card that earns points transferable to multiple arilines and more points per dollar spent.'
                    }
                    ],
                    signupBonus: {
                        bonusValue: 480,
                        bonusCopy: 'Spend requirement: $1,000 in the first three months.'
                    },
                    earningRateIncrease: 25,
                    affiliateLink: 'http://oc.cardsynergy.com/t/?cr=19806&c=246411852&aid=6478b8ee&sid=38190&last_updated=1474576399'
                }
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
            model.destinations.selectionDesktop = model.destinations.optionsDesktop.unitedStatesDesktop;
            model.destinations.selectionMobile = model.destinations.optionsMobile.unitedStatesMobile;
            
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
                } else if ($(this).val().includes('ocea')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.oceaniaDesktop;
                } else if ($(this).val().includes('asia')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.asiaDesktop;
                } else if ($(this).val().includes('latin')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.latinAmericaDesktop;
                } else if ($(this).val().includes('africa')) {
                    model.destinations.selectionDesktop = 
                        model.destinations.optionsDesktop.africaDesktop;
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
                } else if ($(this).val().includes('ocea')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.oceaniaMobile;
                } else if ($(this).val().includes('asia')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.asiaMobile;
                } else if ($(this).val().includes('latin')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.latinAmericaMobile;
                } else if ($(this).val().includes('africa')) {
                    model.destinations.selectionMobile = 
                        model.destinations.optionsMobile.africaMobile;
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
        closeForgotPasswordModal: () => {
            event.preventDefault();
            $('#forgotPasswordModal').modal('close');
        },
        showRegister: () => {
            document.getElementById('privacyPolicy').style.display = 'none';
            document.getElementById('termsOfService').style.display = 'none';

            model.appState.registerBeforeRecs = true;
            if (document.getElementById('landingPage').style.display === 'inline') {
                model.appState.landingPage = false;
                document.getElementById('landingPage').style.display = 'none';
            } else if (document.getElementById('pointsCalculator').style.display === 'inline') {
                model.appState.calculator = false;
                document.getElementById('pointsCalculator').style.display = 'none';
            } else if (document.getElementById('signIn').style.display === 'inline') {
                model.appState.signInBeforeRecs = false;
                document.getElementById('signIn').style.display = 'none';
            }

            document.getElementById('register').style.display = 'inline';
        },
        showLogin: () => {
            document.getElementById('privacyPolicy').style.display = 'none';
            document.getElementById('termsOfService').style.display = 'none';

            model.appState.signInBeforeRecs = true;
            if (document.getElementById('landingPage').style.display === 'inline') {
                model.appState.landingPage = false;
                document.getElementById('landingPage').style.display = 'none';
            } else if (document.getElementById('pointsCalculator').style.display === 'inline') {
                model.appState.calculator = false;
                document.getElementById('pointsCalculator').style.display = 'none';
            } else if (document.getElementById('register').style.display === 'inline') {
                model.appState.registerBeforeRecs = false;
                document.getElementById('register').style.display = 'none';
            }
            
            document.getElementById('signIn').style.display = 'inline';
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

            var options = [
                {selector: '#addTouch', offset: 50, callback: function() {
                    $('#addTouch').playLiviconEvo();
                } },
                {selector: '#addBriefcase', offset: 340, callback: function() {
                    $('#addBriefcase').playLiviconEvo();
                } },
                {selector: '#addDashboard', offset: 350, callback: function() {
                    $('#addDashboard').playLiviconEvo();
                } },
                {selector: '#addCreditCardOut', offset: 360, callback: function() {
                    $('#addCreditCardOut').playLiviconEvo();
                } },
                {selector: '#addCreditCardIn', offset: 370, callback: function() {
                    $('#addCreditCardIn').playLiviconEvo();
                } }
            ];
            Materialize.scrollFire(options);
        },
        calculatorSetup: () => {
            
            // Scroll to Top
            window.scrollTo(0,0);

            // Change App State
            model.appState.landingPage = false;
            model.appState.calculator = true;

            // Hide Landing Page
            document.getElementById('signIn').style.display = "none";
            document.getElementById('register').style.display = "none";
            document.getElementById('preNav').style.display = 'none';
            document.getElementById('preFooterDesktop').style.display = 'none';
            document.getElementById('preFooterMobile').style.display = 'none';
            document.getElementById('landingPage').style.display = 'none';


            if (!model.appState.completedCalculator) {
                document.getElementById('cardRecs').style.display = 'none';
            }

            // Show Profile Page
            document.getElementById('profile').style.display = 'inline';

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
                    var ids = ['excellentCredit', 'goodCredit', 'fairCredit', 'limitedCredit', 'poorCredit'];
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
                        var ids = ['500', '1000', '1500', '2000', '3000', 'other'];
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
                        var ids = ['500', '1000', '1500', '2000', '3000', 'other'];
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
                                'fairCreditMobile', 'limitedCreditMobile', 'poorCreditMobile'];
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
                                    '2000Mobile', '3000Mobile', 'otherMobile'];
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
                                    '2000Mobile', '3000Mobile', 'otherMobile'];
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
            }

            // Manage CC Inputs Desktop
            function manageCreditCardInputsDesktop() {
                for (var i = 1; i < 10; i++) {
                    if (model.appState.addAnotherCardCount === i) {
                        var nextCard = 'card' + (i+1) + (i+1);
                        var nextX = 'x' + (i+1);
                        document.getElementById(nextCard).style.display = "inline";
                        document.getElementById(nextX).style.display = "inline";
                        model.appState.addAnotherCardCount += 1;
                        if (model.appState.addAnotherCardCount === 9) {
                            document.getElementById('addAnotherCard').classList.add('disabled');
                        }
                        break;
                    } 
                }
            }
            
            // Manage CC Inputs Mobile
            function manageCreditCardInputsMobile() {
                for (var i = 1; i < 10; i++) {
                    if (model.appState.addAnotherCardCount === i) {
                        var nextCard = 'card' + (i+1) + (i+1) + (i+1);
                        var nextX = 'x' + (i+1) + 'Mobile';
                        document.getElementById(nextCard).style.display = "inline";
                        document.getElementById(nextX).style.display = "inline";
                        model.appState.addAnotherCardCount += 1;
                        if (model.appState.addAnotherCardCount === 9) {
                            document.getElementById('addAnotherCardMobile').classList.add('disabled');
                        }
                        break;
                    } 
                }
            }

            // Hide x-ed-out Cards
            function hideCard() {
                var selection = this;
                var previous = $(this).prev("div");
                document.getElementById(previous[0].id).children[0].value = '';
                document.getElementById(selection.id).style.display = 'none';
                document.getElementById(previous[0].id).style.display = 'none';
                model.appState.addAnotherCardCount -= 1;
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

            // Set up Event Listeners for x-out buttons for Cards
            var collection = Array.from(document.getElementsByClassName('x-out'));
            for (var i = 0; i < collection.length; i++) {
                collection[i].addEventListener('click', hideCard);
                collection[i].style.cursor = 'pointer';
            }

            // Add Autocomplete Functionality for Add Cards Section
            $('input.autocomplete').autocomplete({
                data: {
                    'American Express Blue Cash Everyday':null,
                    'American Express Blue Cash Preferred':null,
                    'American Express Blue Sky':null,
                    'American Express Centurion':null,
                    'American Express Charles Schwabb Investor Card':null,
                    'American Express Corporate Gold':null,
                    'American Express Corporate Platinum':null,
                    'American Express Gold':null,
                    'American Express Green':null,
                    'American Express Hilton HHonors':null,
                    'American Express Hilton HHonors Surpass':null,
                    'American Express Mercedes Benz':null,
                    'American Express Mercedes Benz Platinum':null,
                    'American Express Plum':null,
                    'Banana Republic Credit Card':null,
                    'Bank of America Alaska Airlines Business Visa':null,
                    'Bank of America Alaska Airlines Platinum Plus Visa':null,
                    'Bank of America Allegiant Airlines World MasterCard':null,
                    'Bank of America BankAmericard Cash Rewards Visa (All Versions)':null,
                    'Bank of America BankAmericard MasterCard':null,
                    'Bank of America BankAmericard Rewards Visa':null,
                    'Bank of America Cash Rewards For Business MasterCard':null,
                    'Bank of America Hawaiian Airlines World Elite MasterCard':null,
                    'Bank of America Spirit Airlines World MasterCard':null,
                    'Bank of America Travel Rewards World MasterCard For Business':null,
                    'Bank of America Virgin Atlantic World Elite MasterCard':null,
                    'Bank of America WorldPoints Visa or MasterCard':null,
                    'Bank of America® Alaska Airlines Visa Signature® Credit Card':null,
                    'Bank of America® BankAmericard Travel Rewards® Credit Card':null,
                    'Barclaycard American Airlines AAdvantage Aviator Blue Mastercard':null,
                    'Barclaycard American Airlines AAdvantage Aviator Mastercard':null,
                    'Barclaycard American Airlines AAdvantage Aviator Red World Elite MasterCard':null,
                    'Barclaycard American Airlines AAdvantage Aviator Silver World Elite MasterCard':null,
                    'Barclaycard Arrival Plus™ World Elite MasterCard®':null,
                    'Barclaycard Cash Forward MasterCard':null,
                    'Barclaycard Frontier Airlines World MasterCard':null,
                    'Barclaycard Hawaiian Airlines Business MasterCard':null,
                    'Barclaycard JetBlue Business MasterCard':null,
                    'Barclaycard JetBlue MasterCard':null,
                    'Barclaycard JetBlue Plus MasterCard':null,
                    'Barclaycard Lufthansa Premier Miles and More MasterCard':null,
                    'Barclaycard Rewards MasterCard':null,
                    'Barclaycard Ring MasterCard':null,
                    'Barclaycard Upromise By Sallie Mae World MasterCard':null,
                    'Barclaycard Wyndham Rewards Visa Signature':null,
                    'Barclaycard Wyndham Rewards Visa Signature (Annual Fee Version)':null,
                    'Best Western Rewards Business MasterCard':null,
                    'Best Western Rewards MasterCard':null,
                    'Best Western Rewards Premier MasterCard':null,
                    'Best Western Rewards Secured MasterCard':null,
                    'Capital One Buy Power MasterCard':null,
                    'Capital One BuyPower For Business MasterCard':null,
                    'Capital One Cash Rewards Visa or MasterCard':null,
                    'Capital One Platinum Prestige Visa or MasterCard':null,
                    'Capital One Spark Miles For Business Visa':null,
                    'Capital One Spark Miles Select For Business Visa':null,
                    'Capital One Spark Select For Business Visa':null,
                    'Capital One Venture One Rewards Visa':null,
                    'Capital One® Platinum Credit Card':null,
                    'Capital One® QuicksilverOne® Cash Rewards Credit Card':null,
                    'Capital One® Quicksilver® Cash Rewards Credit Card':null,
                    'Capital One® Secured MasterCard®':null,
                    'Capital One® Spark® Cash Select for Business':null,
                    'Capital One® Spark® Cash for Business':null,
                    'Capital One® Spark® Classic for Business':null,
                    'Capital One® Venture® Rewards Credit Card':null,
                    'Chase Amazon Rewards Visa':null,
                    'Chase British Airways Avios Visa Signature':null,
                    'Chase Disney Premier Visa':null,
                    'Chase Disney Rewards Visa':null,
                    'Chase Freedom Unlimited℠':null,
                    'Chase Freedom®':null,
                    'Chase Hyatt Visa':null,
                    'Chase IHG Rewards Club Select MasterCard':null,
                    'Chase Ink Plus or Bold Business Visa or MasterCard':null,
                    'Chase Marriott Rewards Premier Business Visa':null,
                    'Chase Marriott Rewards Premier Business Visa Signature':null,
                    'Chase Marriott Rewards Premier Visa':null,
                    'Chase Ritz Carlton Rewards Visa':null,
                    'Chase Sapphire Preferred® Card':null,
                    'Chase Sapphire Reserve℠':null,
                    'Chase Slate Visa':null,
                    'Chase Southwest Airlines Rapid Rewards Plus Visa':null,
                    'Chase Southwest Airlines Rapid Rewards Premier Business Visa':null,
                    'Chase Southwest Airlines Rapid Rewards Premier Visa':null,
                    'Chase Southwest Rapid Rewards Plus Business Visa':null,
                    'Chase United MileagePlus Club Visa':null,
                    'Chase United MileagePlus Explorer Business Visa':null,
                    'Chase® Ink Business Cash℠ Credit Card':null,
                    'Chase® Ink Business Preferred℠ Credit Card':null,
                    'Chase® United MileagePlus® Explorer Card':null,
                    'Choice Privileges Visa Signature':null,
                    'Citi American Airlines AAdvantage Executive World Elite MasterCard':null,
                    'Citi Costco Anywhere Business Visa':null,
                    'Citi Costco Anywhere Visa':null,
                    'Citi Diamond Preferred MasterCard':null,
                    'Citi Forward MasterCard or Visa':null,
                    'Citi Hilton HHonors Reserve Visa':null,
                    'Citi Hilton HHonors Visa Signature':null,
                    'Citi Prestige® Card':null,
                    'Citi Secured MasterCard':null,
                    'Citi Simplicity MasterCard':null,
                    'Citi Thank You Preferred MasterCard':null,
                    'Citi ThankYou® Preferred Card for College Students':null,
                    'Citi ThankYou® Premier Card':null,
                    'CitiBusiness®/AAdvanage® Platinum Select® World Elite™ MasterCard®':null,
                    'Citi® Double Cash Card':null,
                    'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®':null,
                    'Comenity Bank Virgin America Premium Visa Signature':null,
                    'Comenity Bank Virgin America Visa Signature':null,
                    'Delta Reserve Credit Card from American Express®':null,
                    'Delta Reserve for Business Credit Card from American Express®':null,
                    'Discover Business Card':null,
                    'Discover It Chrome':null,
                    'Discover It® Miles':null,
                    'Discover It® Secured Credit Card':null,
                    'Discover More':null,
                    'Discover it®':null,
                    'Discover it® chrome for Students':null,
                    'Discover it® for Students':null,
                    'Gold Delta SkyMiles® Business Credit Card from American Express':null,
                    'Gold Delta SkyMiles® Credit Card from American Express':null,
                    'JP Morgan Chase Palladium Visa Signature':null,
                    'Journey® Student Rewards from Capital One®':null,
                    'Lowe’s Credit Card':null,
                    'M&T Business Bonus Rewards Plus Visa':null,
                    'M&T Business Bonus Rewards Visa':null,
                    'M&T Business Visa':null,
                    'M&T Rewards Visa':null,
                    'M&T Visa Signature':null,
                    'No Credit Card':null,
                    'Other Business Bank Credit Card':null,
                    'Other No Annual Fee Card':null,
                    'Other Personal Bank Credit Card':null,
                    'Other Store Card':null,
                    'PNC Business Cash Rewards Visa Signature':null,
                    'PNC Business Travel Rewards Visa':null,
                    'PNC Business Visa':null,
                    'PNC CashBuilder Visa':null,
                    'PNC Core Visa':null,
                    'PNC Points Business Visa':null,
                    'PNC Points Visa':null,
                    'PNC Premier Traveler Visa Signature':null,
                    'Platinum Delta SkyMiles® Business Credit Card from American Express':null,
                    'Platinum Delta SkyMiles® Credit Card from American Express':null,
                    'Premier Rewards Gold Card From American Express®':null,
                    'SimplyCash® Plus Business Credit Card from American Express':null,
                    'Starwood Preferred Guest® Business Credit Card from American Express':null,
                    'Starwood Preferred Guest® Credit Card from American Express':null,
                    'Suntrust Business Visa or MasterCard':null,
                    'Suntrust Cash Rewards MasterCard':null,
                    'Suntrust Prime Rewards MasterCard':null,
                    'Suntrust Travel Rewards MasterCard':null,
                    'Synchrony Bank Amazon Prime Rewards Store Card':null,
                    'TD Aeroplan Visa':null,
                    'TD Business Solutions Visa':null,
                    'TD Cash Rewards or Cash Rewards Platinum Visa':null,
                    'TD Cash Visa':null,
                    'TD Easy Rewards Visa':null,
                    'Target Credit Card':null,
                    'The Amex Everyday® Credit Card from American Express':null,
                    'The Amex Everyday® Preferred Credit Card from American Express':null,
                    'The Blue for Business® Credit Card from American Express':null,
                    'The Business Gold Rewards Card From American Express OPEN®':null,
                    'The Business Platinum® Card From American Express OPEN®':null,
                    'The Platinum® Card From American Express':null,
                    'US Bank Cash Plus Visa Signature':null,
                    'US Bank Cash Rewards Business Visa':null,
                    'US Bank Club Carlson Business Rewards Visa':null,
                    'US Bank Club Carlson Premier Rewards Visa Signature':null,
                    'US Bank Club Carlson Rewards Visa':null,
                    'US Bank Club Carlson Rewards Visa Signature':null,
                    'US Bank Flexperks Business Select Visa':null,
                    'US Bank Flexperks Business Travel Rewards Visa':null,
                    'US Bank Flexperks By American Express':null,
                    'US Bank Flexperks Travel Rewards Visa':null,
                    'USAA Active Military MasterCard':null,
                    'USAA Cash Rewards By American Express':null,
                    'USAA Cash Rewards World MasterCard':null,
                    'USAA Platinum Visa':null,
                    'USAA Preferred Cash Rewards World MasterCard':null,
                    'USAA Rate Advantage Platinum Visa':null,
                    'USAA Rewards By American Express':null,
                    'USAA Rewards Visa or World MasterCard':null,
                    'USAA Secured Card By American Express':null,
                    'Walmart Credit Card':null,
                    'Wells Fargo Business Visa':null,
                    'Wells Fargo Cash Wise Visa':null,
                    'Wells Fargo Platinum Visa':null,
                    'Wells Fargo Propel 365 By American Express':null,
                    'Wells Fargo Propel By American Express':null,
                    'Wells Fargo Rewards Visa':null,
                    'Wells Fargo Secured Visa':null
                },
                // renderItem: function (item, search){
                //     // escape special characters
                //     search = search.replace(/[-\/\\^$*+?.®()|[\]{}]/g, '\\$&');
                //     var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                //     return '<div class="autocomplete-suggestion" data-id="'+ item[0] +'" data-val="' + item[1] + '">' + item[1].replace(re, "<b>$1</b>") + '</div>';
                // },
            });

            // Add another card event listener desktop
            document.getElementById('addAnotherCard').addEventListener('click', manageCreditCardInputsDesktop, false);

            // Add another card event listener mobile
            document.getElementById('addAnotherCardMobile').addEventListener('click', manageCreditCardInputsMobile, false);

            // Submit Form Event Listeners
            document.getElementById('submitForm').addEventListener('click', model.controllers.vetPointCalcInputs);
            document.getElementById('submitFormMobile').addEventListener('click', model.controllers.vetPointCalcInputs); 
        },
        insertCalcInputs: () => {
            
            // Prep Calculator Section
            model.controllers.calculatorSetup();

            var m = model.cards.currentStatusBasedOnSelections;
            
            // Click Saved Inputs
            
            // Rewards Goal
            document.getElementById(m.rewardsGoal).click();
            document.getElementById(m.rewardsGoal + 'Mobile').click();

            // Own Business 
            if (m.ownBusiness) {
               document.getElementById('yesOwnBusiness').click();
               document.getElementById('yesOwnBusinessMobile').click(); 
            } else {
                document.getElementById('noOwnBusiness').click();
                document.getElementById('noOwnBusinessMobile').click();
            }

            // Credit Score
            document.getElementById(m.creditScore).click();
            document.getElementById(m.creditScore + 'Mobile').click();

            // Monthly Spending
            document.getElementById(m.monthlySpend).click();
            document.getElementById(m.monthlySpend + 'Mobile').click();

            var dbCards = [
                'card1',
                'card2',
                'card3',
                'card4',
                'card5',
                'card6',
                'card7',
                'card8',
                'card9'
            ];

            // Populate and Display Cards that the User Selected in the Past
            dbCards.forEach(function(card) {
                if (model.cards.currentStatusBasedOnSelections[card]) {
                    document.getElementById(card).parentNode.style.display = 'inline';
                    document.getElementById(card).value = model.cards.currentStatusBasedOnSelections[card];
                    if (card !== 'card1') {
                        var xId = 'x' + card.charAt((card.length - 1));
                        document.getElementById(xId).style.display = 'inline';
                        model.appState.addAnotherCardCount += 1;
                    }
                }
            });

            var dbCardsMobile = [
                'card1Mobile',
                'card2Mobile',
                'card3Mobile',
                'card4Mobile',
                'card5Mobile',
                'card6Mobile',
                'card7Mobile',
                'card8Mobile',
                'card9Mobile'
            ];

            // Populate and Display Cards that the User Selected in the Past
            dbCardsMobile.forEach(function(card) {
                var nonMobileCard = card.slice(0,5);
                var mobileEnd = card.slice(4,(card.length));
                console.log(mobileEnd);
                if (model.cards.currentStatusBasedOnSelections[nonMobileCard]) {
                    document.getElementById(card).parentNode.style.display = 'inline';
                    document.getElementById(card).value = model.cards.currentStatusBasedOnSelections[nonMobileCard];
                    if (card !== 'card1Mobile') {
                        var xId = 'x' + mobileEnd;
                        document.getElementById(xId).style.display = 'inline';
                    }
                }
            });

            dbCards.forEach(function(card) {
                if (model.cards.currentStatusBasedOnSelections[card]) {
                    delete model.cards.currentStatusBasedOnSelections[card];
                }
            });

            // Activate the input fields that are filled in
            Materialize.updateTextFields();
        },
        displayRecsSetup: () => {
            
            // Scroll to Top
            window.scrollTo(0,0);

            // Change App State
            model.appState.landingPage = false;
            model.appState.resultsPage = true;
            model.appState.loginLoading = true;

            // Hide Landing Page
            document.getElementById('signIn').style.display = "none";
            document.getElementById('register').style.display = "none";
            document.getElementById('preNav').style.display = 'none';
            document.getElementById('preFooterDesktop').style.display = 'none';
            document.getElementById('preFooterMobile').style.display = 'none';

            // Hide Calculator Page
            document.getElementById('pointsCalculator').style.display = 'none';

            // Display Loading Login
            document.getElementById('loginLoading').style.display = 'inline';

            model.controllers.vetPointCalcInputs();
        },
        vetPointCalcInputs: () => {
            // Create Shortcut to Model
            const m = model.cards.currentStatusBasedOnSelections;

            document.getElementById('vetPointCalcInputsDesktop').style.display = 'none';
            document.getElementById('vetPointCalcInputsMobile').style.display = 'none';

            // Vet inputs
            if (m.ownBusiness !== null && m.creditScore !== null 
                && m.rewardsGoal !== null && m.monthlySpend !== null) {
                model.controllers.createReport();
            } else {
                document.getElementById('vetPointCalcInputsDesktop').style.display = 'inline';
                document.getElementById('vetPointCalcInputsMobile').style.display = 'inline';
            }
        },
        createReport: () => {
            
            model.appState.completedCalculator = true;

            // Reset Inputs
            model.cards.userSelections = [];
            model.cards.intermediateRecsPers = [];
            model.cards.intermediateRecsBiz = [];
            model.cards.finalRecsPers = [];
            model.cards.finalRecsBiz = [];
            model.cards.combinedRecs = [];

            // Hide the Form
            document.getElementById('pointsCalculator').style.display = 'none';
            document.getElementById('preFooterMobile').style.display = 'none';
            document.getElementById('preFooterDesktop').style.display = 'none';
            document.getElementById('preNav').style.display = 'none';

            if (!model.appState.loginLoading) {
                // Display the Crunching Numbers Page
                document.getElementById('crunchingNumbers').style.display = 'inline';
            }

            // Move on to Log the User's Selections to the Model
            model.controllers.determineSelections();
        },
        determineSelections: () => {
            
            // Log User's Remaining Inputs to the Model
            
            // Other Amount, if applicable
            if (!model.appState.loginLoading) {
                var otherAmount = document.getElementById('otherSelectionInput').value;
                if (otherAmount) {
                    model.cards.currentStatusBasedOnSelections.monthlySpend = otherAmount;
                }
            }


            // Current CCs, if applicable

            var compiledCardValues = [card1,card2,card3,card4,card5,card6,card7,card8,card9];

            var checkCards = ['card1','card2','card3','card4','card5','card6','card7','card8','card9',]
            
            for (var i = 0; i < checkCards.length; i++) {
                if (document.getElementById(checkCards[i]).value) {
                    compiledCardValues[i] = document.getElementById(checkCards[i]).value;
                } else if (document.getElementById(checkCards[i] + 'Mobile').value) {
                    compiledCardValues[i] = document.getElementById(checkCards[i] + 'Mobile').value;
                } else {
                    compiledCardValues[i] = null;
                }
            }

            var cards = model.cards.all;

            // Determine Cash Back Status for Rewards Goal Toggle on Display Recs View
            if (model.cards.currentStatusBasedOnSelections.rewardsGoal === 'cashBack') {
                model.cards.currentStatusBasedOnSelections.cashBack = true;
            } else {
                model.cards.currentStatusBasedOnSelections.cashBack = false;
            }

            // Create the Selections Object
            for (var i = 0; i < cards.length; i++) {
                compiledCardValues.forEach(function(card) {
                    if (cards[i].cardName === card) {
                        model.cards.userSelections.push(cards[i]);
                    }
                }); 
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

                // TO DO: Create Current Rewards Figure 

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
                    a.creditScore === 'limitedCredit') {
                    model.controllers.determinePersRecs();
                } else if (a.creditScore === 'fairCredit') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One® Spark® Classic for Business') {
                            c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                } else if (a.creditScore === 'goodCredit' 
                            && a.rewardsGoal === 'cashBack') {

                    var recs = [
                        'Capital One® Spark® Cash For Business Visa',
                        'Capital One® Spark® Cash Select For Business Visa'
                    ];

                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possibleBizRecs.length; i++) {
                            if (c.possibleBizRecs[i].cardName === rec) {
                                c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                            }
                        }
                    });
                } else if (a.creditScore === 'goodCredit' 
                            && a.rewardsGoal === 'freeFlights') {

                    var recs = [
                        'Starwood Preferred Guest® Business Credit Card from American Express',
                        'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                        'Gold Delta SkyMiles® Business Credit Card from American Express',
                        'The Business Platinum® Card From American Express OPEN®'
                    ];

                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possibleBizRecs.length; i++) {
                            if (c.possibleBizRecs[i].cardName === rec) {
                                c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                            }
                        }
                    });
                } else if (a.creditScore === 'excellentCredit' 
                            && a.rewardsGoal === 'cashBack') {
                    
                    var recs = [
                        'Chase® Ink Cash℠ Business Visa',
                        'Capital One® Spark® Cash For Business Visa',
                        'Chase® Ink Business Preferred℠ Visa',
                        'Capital One® Spark® Cash Select For Business Visa',
                        'SimplyCash® Plus Business Credit Card from American Express'
                    ];


                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possibleBizRecs.length; i++) {
                            if (c.possibleBizRecs[i].cardName === rec) {
                                c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                            }
                        }
                    });
                } else if (a.creditScore === 'excellentCredit' 
                            && a.rewardsGoal === 'freeFlights') {
                    var recs = [
                        'Chase® Ink Business Preferred℠ Visa', 
                        'Chase® Ink Cash℠ Business Visa',
                        'Starwood Preferred Guest® Business Credit Card from American Express',
                        'The Blue for Business® Credit Card from American Express',
                        'The Business Gold Rewards Card From American Express OPEN®',
                        'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                        'Gold Delta SkyMiles® Business Credit Card from American Express',
                        'The Business Platinum® Card From American Express OPEN®'
                    ];
                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possibleBizRecs.length; i++) {
                            if (c.possibleBizRecs[i].cardName === rec) {
                                c.intermediateRecsBiz.push(c.possibleBizRecs[i]);
                            }
                        }
                    });
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

                var recs = [
                    'Discover It® Secured Credit Card',
                    'Capital One® QuicksilverOne® Cash Rewards Credit Card',
                    'Capital One® Platinum Credit Card',
                    'Capital One® Secured MasterCard®'
                ];
                recs.forEach(function(rec) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === rec) {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                });
            } else if (a.creditScore === 'limitedCredit') {
                
                var recs = [
                    'Discover it®',
                    'Discover it® for Students',
                    'Journey® Student Rewards from Capital One®',
                    'Discover it® chrome for Students',
                    'Citi ThankYou® Preferred Card for College Students',
                    'Chase Freedom®',
                    'Discover It® Secured Credit Card'
                ];

                recs.forEach(function(rec) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === rec) {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                });

            } else if (a.creditScore === 'fairCredit') {

                var recs = [
                    'Capital One® QuicksilverOne® Cash Rewards Credit Card',
                    'Discover it® for Students',
                    'Discover It® Secured Credit Card',
                    'Journey® Student Rewards from Capital One®',
                    'Discover it®'
                ];

                recs.forEach(function(rec) {
                    for (var i = 0; i < c.possiblePersRecs.length; i++) {
                        if (c.possiblePersRecs[i].cardName === rec) {
                            c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                        }
                    }
                });

            } else if (a.rewardsGoal === 'cashBack') {
                if (a.creditScore === 'goodCredit') {
                    
                    var recs = [
                        'Discover it®',
                        'Chase Freedom®',
                        'Bank of America® BankAmericard Travel Rewards® Credit Card',
                        'Discover It® Miles',
                        'Capital One® Venture® Rewards Credit Card',
                        'Journey® Student Rewards from Capital One®',
                        'Barclaycard Arrival Plus™ World Elite MasterCard®'
                    ];

                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === rec) {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    });
                } else if (a.creditScore === 'excellentCredit') {
                    
                    var recs = [
                        'Citi® Double Cash Card',
                        'Discover it®',
                        'Chase Freedom®',
                        'Bank of America® BankAmericard Travel Rewards® Credit Card',
                        'Discover It® Miles',
                        'Capital One® Venture® Rewards Credit Card',
                        'Journey® Student Rewards from Capital One®',
                        'Barclaycard Arrival Plus™ World Elite MasterCard®'
                    ];

                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === rec) {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    });

                } 
            } else if (a.rewardsGoal === 'freeFlights') {
                if (a.creditScore === 'goodCredit') {
                    var recs = [
                        'Chase Sapphire Preferred® Card',
                        'The Amex Everyday® Credit Card from American Express',
                        'Chase Freedom®',
                        'The Amex Everyday® Preferred Credit Card from American Express',
                        'Chase Freedom Unlimited℠',
                        'Starwood Preferred Guest® Credit Card from American Express',
                        'Premier Rewards Gold Card From American Express®',
                        'Gold Delta SkyMiles® Credit Card from American Express',
                        'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                        'Bank of America® Alaska Airlines Visa Signature® Credit Card'
                    ];

                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === rec) {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    });  
                } else if (a.creditScore === 'excellentCredit') {
                    var recs = [
                        'Chase Sapphire Preferred® Card',
                        'The Amex Everyday® Credit Card from American Express',
                        'Chase Freedom®',
                        'The Amex Everyday® Preferred Credit Card from American Express',
                        'Chase Freedom Unlimited℠',
                        'Chase Sapphire Reserve℠',
                        'Starwood Preferred Guest® Credit Card from American Express',
                        'Premier Rewards Gold Card From American Express®',
                        'Chase® United MileagePlus® Explorer Card',
                        'Citi®/AAdvanage® Platinum Select® World Elite™ MasterCard®',
                        'Gold Delta SkyMiles® Credit Card from American Express',
                        'Citi Prestige® Card',
                        'Citi ThankYou® Premier Card',
                        'The Platinum® Card From American Express',
                        'Premier Rewards Gold Card From American Express®',
                        'Bank of America® Alaska Airlines Visa Signature® Credit Card'
                    ];

                    recs.forEach(function(rec) {
                        for (var i = 0; i < c.possiblePersRecs.length; i++) {
                            if (c.possiblePersRecs[i].cardName === rec) {
                                c.intermediateRecsPers.push(c.possiblePersRecs[i]);
                            }
                        }
                    }); 
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
            if (model.cards.currentStatusBasedOnSelections.ownBusiness) {
                // Limit Pers Recs to 2
                if (model.cards.intermediateRecsPers.length > 1) {
                    model.cards.intermediateRecsPers.splice(2);
                }

                // Limit Biz Recs to 2
                if (model.cards.intermediateRecsBiz.length > 1) {
                    model.cards.intermediateRecsBiz.splice(2);
                } 
            } else {
                // Limit Pers Recs to 4
                if (model.cards.intermediateRecsPers.length > 3) {
                    model.cards.intermediateRecsPers.splice(4);
                }
            }
            

            console.log('Limit Recs to no more than 4 per Biz/Pers Rec.');

            model.controllers.createCategoryComparisonArrayInEachRecommendation();
        },
        createCategoryComparisonArrayInEachRecommendation: () => {


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
        prepEarningsCompChart: () => {
            // Prepare Data for Earnings Comparison Chart

            // Empty Current Comparison Data
            model.cards.comparisonData = [];

            // Prepare Signup Bonus Object

            var signupBonusData = {
                name: 'Signup Bonus',
                data: [
                    0,
                    model.cards.currentDisplayRec.cardDetails.signupBonus.bonusValue,
                    0
                ]
            };

            console.log('Signup Bonus Data');
            console.log(signupBonusData);

            // Establish Baseline Variables

            var yearlySpend = model.cards.currentStatusBasedOnSelections.monthlySpend * 12;

            var earningRateCats = [
                'everywhere',
                'gas',
                'groceries',
                'travel',
                'diningOut'
            ];

            // Calculate Current Earning Rate 

            var currentEarningRateRatios = {
                everywhere: 0.2,
                gas: 0.2,
                groceries: 0.2,
                travel: 0.2,
                diningOut: 0.2
            }

            var currentEarningRate = 0;

            earningRateCats.forEach(function(cat) {
                if (!model.cards.currentStatusBasedOnSelections[cat]) {
                    delete currentEarningRateRatios[cat];
                    currentEarningRateRatios.everywhere += 0.2;
                }
            });

            if (model.cards.userSelections.length === 0) {
                currentEarningRate = 0;
            } else {   
                for (var cat in currentEarningRateRatios) {
                    currentEarningRate += (currentEarningRateRatios[cat] * yearlySpend * model.cards.currentStatusBasedOnSelections[cat]);
                }
            }

            console.log('currentEarningRate');
            console.log(currentEarningRate);

            // Calculate Future Earning Rate

            var newEarningRateRatios = {
                everywhere: 0.2,
                gas: 0.2,
                groceries: 0.2,
                travel: 0.2,
                diningOut: 0.2
            }

            var newEarningRate = 0;

            // Add New Card to Current Status Based on Selections
            
            var newCurrentStatus={}; 

            earningRateCats.forEach(function(cat) {
                if (model.cards.currentStatusBasedOnSelections[cat]) {
                    newCurrentStatus[cat] = model.cards.currentStatusBasedOnSelections[cat];
                }
            });

            console.log(model.cards.currentStatusBasedOnSelections);
            console.log(newCurrentStatus);

            earningRateCats.forEach(function(cat) {
                if (model.cards.currentDisplayRec.categories[cat] && newCurrentStatus[cat]) {                
                    if (model.cards.currentDisplayRec.categories[cat] > model.cards.currentStatusBasedOnSelections[cat]) {
                        newCurrentStatus[cat] = model.cards.currentDisplayRec.categories[cat];
                    }
                }
            });


            earningRateCats.forEach(function(cat) {
                if (!newCurrentStatus[cat]) {
                    delete newEarningRateRatios[cat];
                    newEarningRateRatios.everywhere += 0.2;
                }
            });

            for (var cat in newEarningRateRatios) {
                newEarningRate += (newEarningRateRatios[cat] * yearlySpend * newCurrentStatus[cat]);
            }

            console.log('newEarningRate');
            console.log(newEarningRate);

            // Add Data to Baseline Earning Rate
            var baselineEarningRate = {
                name: 'Everyday Spending Bonus',
                data: [
                    (currentEarningRate/100),
                    (newEarningRate/100),
                    (newEarningRate/100)
                ]
            };

            console.log('baselineEarningRate');
            console.log(baselineEarningRate);

            // Create Data for Comparison Chart
            model.cards.comparisonData.push(signupBonusData, baselineEarningRate);
            
            console.log('comparisonData');
            console.log(model.cards.comparisonData);

            // Calculate Earning Rate Increase
            if (currentEarningRate === 0) {
                model.cards.currentDisplayRec.earningRateIncrease = 100;
            } else {
                model.cards.currentDisplayRec.earningRateIncrease = Number((((newEarningRate - currentEarningRate) / currentEarningRate) * 100).toFixed(1));
            }

            console.log('earningRateIncrease');
            console.log(model.cards.currentDisplayRec.earningRateIncrease);

            document.getElementById('earningRateIncreaseDesktop').innerHTML = model.cards.currentDisplayRec.earningRateIncrease + '%';
            document.getElementById('earningRateIncreaseMobile').innerHTML = model.cards.currentDisplayRec.earningRateIncrease + '%';

            // Populate Chart Desktop

            Highcharts.chart('earningComparison', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Increased rewards benefit'
                },
                xAxis: {
                    categories: ['Current Earnings', 'Earnings in Year 1', 'Earnings in Year 2+']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Dollar value of total earnings'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    },
                    labels: {
                            formatter: function () {
                            return '$' + this.value;
                            }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: ${point.y}<br/>Total: ${point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                
                series: model.cards.comparisonData
            });

            // Populate Chart Mobile

            Highcharts.chart('earningComparisonMobile', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Increased rewards benefit'
                },
                xAxis: {
                    categories: ['Current Earnings', 'Earnings in Year 1', 'Earnings in Year 2+']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Dollar value of total earnings'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    },
                    labels: {
                            formatter: function () {
                            return '$' + this.value;
                            }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: ${point.y}<br/>Total: ${point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                
                series: model.cards.comparisonData
            });
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

            if (!model.appState.loginLoading) {
                model.controllers.sendToFirebase();

                // Display Report
                setTimeout(function() {
                    document.getElementById('crunchingNumbers').style.display = 'none';
                    document.getElementById('cardRecs').style.display = 'block';
                    document.getElementById('cardRecs').click();
                    document.getElementById('cardRecs').classList.add('active');
                    document.getElementById('displayRecommendations').style.display ='inline'; 
                    model.controllers.displayRecInteractions();
                    }, 3000);
            } else {
                // Hide Loading Login
                document.getElementById('loginLoading').style.display = 'none';


                // Show Profile Page
                document.getElementById('profile').style.display = 'inline';
                document.getElementById('cardRecs').click();
                document.getElementById('cardRecs').classList.add('active');
                document.getElementById('displayRecommendations').style.display ='inline';
                model.appState.loginLoading = false;
                model.controllers.displayRecInteractions();
            }
        },
        sendToFirebase: () => {
            var calcEntry = model.cards.currentStatusBasedOnSelections;
            calcEntry['completedCalculator'] = true;
            for (var i = 1; i < 10; i++) {
                if (model.cards.userSelections[(i-1)]) {
                    calcEntry['card' + i] = model.cards.userSelections[(i-1)].cardName;
                }
            }

            // for (var i = 1; i < 10; i++) {
            //     if (model.cards.combinedRecs[(i-1)]) {
            //         calcEntry['rec' + i] = model.cards.combinedRecs[(i-1)].cardName;
            //     }
            // }

            console.log(calcEntry);

            var userRef = firebase.database().ref("users/" + model.appState.uid);
            userRef.update(calcEntry);

            var dbCards = [
                'card1',
                'card2',
                'card3',
                'card4',
                'card5',
                'card6',
                'card7',
                'card8',
                'card9'
            ];

            dbCards.forEach(function(card) {
                if (model.cards.currentStatusBasedOnSelections[card]) {
                    delete model.cards.currentStatusBasedOnSelections[card];
                }
            });
        },
        displayRecInteractions: () => {
            
            model.controllers.prepEarningsCompChart();

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
                model.controllers.toggleCashBackFreeFlightsSwitch);
            document.getElementById('mobileSwitch').addEventListener('click', 
                model.controllers.toggleCashBackFreeFlightsSwitch);

            // Toggle b/w Card Details Event Listeners Desktop/Mobile
            document.getElementById('pickCategoryDesktop').addEventListener('click', (e) => {
                toggleBetweenDetailsCategoriesDesktop(e);
            });

            document.getElementById('pickCategoryMobile').addEventListener('click', (e) => {
                toggleBetweenDetailsCategoriesMobile(e);
            });
        },
        toggleCashBackFreeFlightsSwitch: () => {
            document.getElementById('crunchingNumbers').style.display = 'inline';
            document.getElementById('displayRecommendations').style.display = 'none';
                
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

            setTimeout(function() {
                document.getElementById('crunchingNumbers').style.display = 'none';
                document.getElementById('displayRecommendations').style.display = 'inline';
            }, 3500);
        },
        showRegisterRec: () => {
            document.getElementById('privacyPolicy').style.display = 'none';
            document.getElementById('termsOfService').style.display = 'none';

            model.appState.registerBeforeRecs = true;
            model.appState.resultsPage = false;
           
            document.getElementById('displayRecommendations').style.display = 'none';

            window.scrollTo(0,0);

            document.getElementById('preNav').style.display = 'block';
            document.getElementById('preFooterDesktop').style.display = 'block';
            document.getElementById('preFooterMobile').style.display = 'block';
            document.getElementById('register').style.display = 'inline';

            document.getElementById('returnToResultsFromRegister').innerHTML = "Return to results.";

            document.getElementById('returnToResultsFromRegister').addEventListener('click', model.controllers.returnToResultsFromRegister);
        },
        returnToResultsFromRegister: () => {
            document.getElementById('privacyPolicy').style.display = 'none';
            document.getElementById('termsOfService').style.display = 'none';
            document.getElementById('preNav').style.display = 'none';
            document.getElementById('preFooterDesktop').style.display = 'none';
            document.getElementById('preFooterMobile').style.display = 'none';

            window.scrollTo(0,0);

            model.appState.registerBeforeRecs = false;
            model.appState.resultsPage = true;
           
            document.getElementById('displayRecommendations').style.display = 'inline';

            document.getElementById('register').style.display = 'none';
        },
        showLoginRec: () => {
            document.getElementById('privacyPolicy').style.display = 'none';
            document.getElementById('termsOfService').style.display = 'none';


            model.appState.signInBeforeRecs = true;
            model.appState.resultsPage = false;
           
            document.getElementById('displayRecommendations').style.display = 'none';
            
            window.scrollTo(0,0);

            document.getElementById('preNav').style.display = 'block';
            document.getElementById('preFooterDesktop').style.display = 'block';
            document.getElementById('preFooterMobile').style.display = 'block';
            document.getElementById('signIn').style.display = 'inline';

            document.getElementById('returnToResultsFromSignIn').innerHTML = "Return to results.";

            document.getElementById('returnToResultsFromSignIn').addEventListener('click', model.controllers.returnToResultsFromSignIn);
        },
        returnToResultsFromSignIn: () => {
            document.getElementById('privacyPolicy').style.display = 'none';
            document.getElementById('termsOfService').style.display = 'none';
            document.getElementById('preNav').style.display = 'none';
            document.getElementById('preFooterDesktop').style.display = 'none';
            document.getElementById('preFooterMobile').style.display = 'none';

            model.appState.signInBeforeRecs = false;
            model.appState.resultsPage = true;

            window.scrollTo(0,0);
           
            document.getElementById('displayRecommendations').style.display = 'inline';

            document.getElementById('signIn').style.display = 'none';
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