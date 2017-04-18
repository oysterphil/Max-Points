var model = {
    programs: {
        pointsTransferrable: {
            chase: {
                participatingPrograms: [
                    {
                        name: 'unitedAirlines',
                        pointTransferRate: 1.2
                    },
                    {
                        name: 'deltaAirlines',
                        pointTransferRate: 1
                    },
                    {
                        name: 'Chase Cash Back Program',
                        pointTransferRate: 1
                    }
                ]
            },
            amex: {
                participatingPrograms: [
                    {
                        name: 'unitedAirlines',
                        pointTransferRate: 1.2
                    },
                    {
                        name: 'example2',
                        pointTransferRate: 1
                    }
                ]
            },
            citi: {
                participatingPrograms: [
                    {
                        name: 'unitedAirlines',
                        pointTransferRate: 1.2
                    },
                    {
                        name: 'example2',
                        pointTransferRate: 1
                    }
                ]
            }
        },
        cashBack: {
            discover: {
                participatingPrograms: [
                    {
                        name: 'Discover Cash Back Program',
                    }
                ]
            },
            anotherCashBackProgram: {
                participatingPrograms: [
                    {
                        name: 'Discover Cash Back Program',
                    }
                ]
            }
        },
        frequentFlier: {
            unitedAirlines: {
                displayName: 'United\'s Display Name',
                programType: 'regionBased',
                // I break each program up into fromRegions 
                // within each from region.
                // These sections will hold all of the information that
                // we will be drawing on to visualize recommendations for
                // users, depending on which from/to city they choose.
                fromRegions: {
                    // For fromRegions, all US from cities could go anywhere
                    // in the world, but we assume that all non-US from cities
                    // will end up somewhere in the US.
                    us: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '100',
                                businessMiles: '100,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'MXC',
                                    'GTC'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'WAS', 
                            'JFK'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'MAD',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    },
                    canada: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'OTT', 
                            'YCW'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'CDG',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    },
                    europe: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'WAS',
                                    'JFK'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'CDG', 
                            'LON'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'LAX',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    }
                }
            },
            deltaAirlines: {
                displayName: 'Delta\'s Display Name',
                programType: 'regionBased',
                // I break each program up into fromRegions 
                // within each from region.
                // These sections will hold all of the information that
                // we will be drawing on to visualize recommendations for
                // users, depending on which from/to city they choose.
                fromRegions: {
                    // For fromRegions, all US from cities could go anywhere
                    // in the world, but we assume that all non-US from cities
                    // will end up somewhere in the US.
                    us: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'MXC',
                                    'GTC'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'LAX', 
                            'LGD'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'MAD',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    },
                    canada: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'OTT', 
                            'YCS'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'CDG',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    },
                    europe: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'MAD', 
                            'BRR'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'CDG',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    }
                }
            },
            chaseCashBack: {
                displayName: 'Chase Cash Back',
                programType: 'regionBased',
                // I break each program up into fromRegions and then 
                // toRegions within each from region.
                // These sections will hold all of the information that
                // we will be drawing on to visualize recommendations for
                // users, depending on which from/to city they choose.
                fromRegions: {
                    // For fromRegions, all US from cities could go anywhere
                    // in the world, but we assume that all non-US from cities
                    // will end up somewhere in the US.
                    us: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'MIA', 
                            'DFW'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'CDG',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    },
                    canada: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'DFS', 
                            'GFS'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'CDG',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    },
                    europe: {
                        // Below is where you list the general fee and miles
                        // for each toRegion.
                        generalToRegionCosts: {
                            europe: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            },
                            latinAmerica: {
                                economyFee: '5',
                                economyMiles: '30,000 - 35,000',
                                businessFee: '5',
                                businessMiles: '30,000 - 35,000',
                                airports: [
                                    'CDG',
                                    'BCN'
                                ]
                            }
                        },
                        generalFromAirports: [
                            'AMS', 
                            'RMA'
                        ],
                        // Here we list city information, including all airports
                        // within each city.
                        exceptionToAirports: [              
                            {
                                exceptionAirportCode: 'LON',
                                exceptionEconomyFee: '100',
                                exceptionEconomyMiles: '50,000',
                                exceptionBusinessFee: '100',
                                exceptionBusinessMiles: '50,000'
                            },
                            {
                                exceptionAirportCode: 'CDG',
                                exceptionFee: '10',
                                exceptionMiles: '20,000'
                            }   
                        ]
                    }
                }
            },
            virginAtlantic: {
                programType: 'distanceBased',
                fromBatches: [
                    // Each city object will look like the below
                    {
                        fromAirportCodes: [
                            'JFK',
                            'BOS',
                            'IAD'
                        ],
                        toBatches: [
                            {
                                batch: [
                                    'BCN',
                                    'MAD',
                                    'CDG'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    // businessFee: '20 - 100',
                                    // businessMiles: '50,000'
                                }
                            },
                            {
                                batch: [
                                    'FCO',
                                    'LIS',
                                    'DBV'
                                ],
                                costs: {
                                    fee: '50 - 100',
                                    miles: '20,000'
                                }
                            }
                        ]
                    },
                    {
                        fromAirportCodes: [
                            'WAS',
                            'LAX',
                            'PXD'
                        ],
                        toBatches: [
                            {
                                batch: [
                                    'BCN',
                                    'MAD',
                                    'CDG'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            },
                            {
                                batch: [
                                    'FCO',
                                    'LIS',
                                    'DBV'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            }
                        ]
                    },
                    {
                        fromAirportCodes: [
                            'BCN',
                            'MAD',
                            'CDG'
                        ],
                        toBatches: [
                            {
                                batch: [
                                    'JFK',
                                    'WAS',
                                    'IAD'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            }
                        ]
                    }
                ]
            },
            virginAtlantic2: {
                programType: 'distanceBased',
                // I break each program up into fromRegions and then 
                // toRegions within each from region.
                // These sections will hold all of the information that
                // we will be drawing on to visualize recommendations for
                // users, depending on which from/to city they choose.
                fromBatches: [
                    // Each city object will look like the below
                    {
                        fromAirportCodes: [
                            'JFK',
                            'BOS',
                            'IAD'
                        ],
                        toBatches: [
                            {
                                batch: [
                                    'BCN',
                                    'MAD',
                                    'CDG'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            },
                            {
                                batch: [
                                    'FCO',
                                    'LIS',
                                    'DBV'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            }
                        ]
                    },
                    {
                        fromAirportCodes: [
                            'JFK',
                            'BOS',
                            'IAD'
                        ],
                        toBatches: [
                            {
                                batch: [
                                    'BCN',
                                    'MAD',
                                    'CDG'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            },
                            {
                                batch: [
                                    'FCO',
                                    'LIS',
                                    'DBV'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            }
                        ]
                    },
                    {
                        fromAirportCodes: [
                            'BCN',
                            'MAD',
                            'CDG'
                        ],
                        toBatches: [
                            {
                                batch: [
                                    'JFK',
                                    'BOS',
                                    'IAD'
                                ],
                                costs: {
                                    // If business, include 
                                    economyFee: '5 - 50',
                                    economyMiles: '30,000',
                                    // If business, include below and remove comma on economyMiles
                                    businessFee: '20 - 100',
                                    businessMiles: '50,000'
                                }
                            }
                        ]
                    }
                ]
            }
        }
    },
    userFlightSelections: {
        toDestination: {
            fromAirport: 'WAS',
            toAirport: 'CDG',
            class: 'economy',
            type: 'roundTrip',
            numTickets: null
        },
        fromDestination: {
            fromAirport: 'CDG',
            toAirport: 'WAS',
            class: 'economy',
            type: 'roundTrip',
            numTickets: null
        }
    },
    userPrograms: [
        {
            name: 'chase',
            points: 25000
        },
        {
            name: 'deltaAirlines',
            points: 250000
        },
        {
            name: 'virginAtlantic',
            points: 1000
        }
    ],
    userFreqFlierPrograms: [],
    eligiblePrograms: {
        toDestination: [],
        fromDestination: []
    },
    grabFlightSelections: () => {
            
        if (document.getElementById('').value === 'oneWay') {
            // Log to destination
            model.userFlightSelections.toDestination.fromAirport = document.getElementById('').value;
            model.userFlightSelections.toDestination.toAirport = document.getElementById('').value;
            model.userFlightSelections.toDestination.class = document.getElementById('').value;
            model.userFlightSelections.toDestination.type = document.getElementById('').value;
            model.userFlightSelections.toDestination.numTickets = document.getElementById('').value;
        }

        if (document.getElementById('').value === 'roundTrip') {

            // Log from destination TO DO: Switch out fromAirport from to dest with toAirport
            model.userFlightSelections.fromDestination.fromAirport = document.getElementById('').value;
            model.userFlightSelections.fromDestination.toAirport = document.getElementById('').value;
            model.userFlightSelections.fromDestination.class = document.getElementById('').value;
            model.userFlightSelections.fromDestination.type = document.getElementById('').value;
            model.userFlightSelections.fromDestination.numTickets = document.getElementById('').value;

        }

        model.createRewardProgramSelectionsObject();
    },
    createRewardProgramSelectionsObject: () => {
        
        // TO DO: Insert code to grab program selections
        // from the front end, identify the program, and 
        // push the name of each program to the model as
        // well as the number of points per program.

        model.translateProgramSelectionsToFreqFlierPrograms();
    },
    translateProgramSelectionsToFreqFlierPrograms: () => {
        // Iterate through each program that the user inputted
        // First check to see if any of their programs are
        // points transferrable programs.
        
        // Reset Frequent Flier Programs
        model.userFreqFlierPrograms = [];

        var progExists = false;

        model.userPrograms.forEach(function(prog) {
            var pointsTransferrableProgs = [
                {
                    prog: 'chase',
                    ref: model.programs.pointsTransferrable.chase.participatingPrograms
                },
                {
                    prog: 'amex',
                    ref: model.programs.pointsTransferrable.amex.participatingPrograms
                },
                {
                    prog: 'citi',
                    ref: model.programs.pointsTransferrable.citi.participatingPrograms
                }
            ];
            pointsTransferrableProgs.forEach(function(ptProg) {
                if (prog.name === ptProg.prog) {
                    // If any of the user selections are points
                    // transferrable programs, then calculate
                    // how many points they would have in each 
                    // program at the various conversion rates.
                    var prg = model.programs.pointsTransferrable.chase.participatingPrograms;
                    ptProg.ref.forEach(function(p) {
                        var obj = {};
                        obj['name'] = p.name;
                        obj['points'] = prog.points * p.pointTransferRate;
                        model.userFreqFlierPrograms.push(obj);
                    });
                    console.log(model.userFreqFlierPrograms);
                }
            });

            // Next check for frequent flier and cash back 
            // programs. First, though, check and see if 
            // the their selection is already in the 
            // model.userFreqFlierPrograms array due to a
            // points transferrable program and then add
            // the points.

            model.userFreqFlierPrograms.forEach(function(sel) {
                if (prog.name === sel.name) {
                    sel.points += prog.points;
                    progExists = true;
                } 
            }); 

            if (prog.name === 'chase' || prog.name === 'amex' || prog.name === 'citi') {

            } else if (!progExists) {
                model.userFreqFlierPrograms.push(prog);
            }

            // Reset progExists
            progExists = false;
        });

        model.determineElibilePrograms();
    },
    determineElibilePrograms: () => {
        
        var ffCbPrograms = [
            'unitedAirlines',
            'deltaAirlines',
            'virginAtlantic',
            'chaseCashBack'
        ];

        // For Each Frequent Flier Program with points fully updated
        model.userFreqFlierPrograms.forEach(function(prog) {
            var ff = model.programs.frequentFlier;
            // For every frequent flier program
            for (var key in ff) {
                // When the User's Freq. Flier Program matches with 
                // the freq. flier program database in the model
                if (prog.name === key) {
                    // If the program in the model is region based
                    if (ff[key].programType === 'regionBased') {
                        // Create an object to house all of the from regions
                        // for that program
                        var regions = ff[key].fromRegions;
                        // Iterate through each region within that object
                        for (var reg in regions) {
                            
                            // Check to see if the user selection from airport
                            // matches this region's general from airports first
                            // and then check for toRegion.
                            if (regions[reg].generalFromAirports.indexOf(model.userFlightSelections.toDestination.fromAirport) > -1) {
                                
                                // If it does match, then check to see if the program 
                                // supports the user's toRegion destination in general.
                                
                                for (var costReg in regions[reg].generalToRegionCosts) {
                                    
                                    if (regions[reg].generalToRegionCosts[costReg].airports.indexOf(model.userFlightSelections.toDestination.toAirport) > -1) {
                                        // Success! Program supports from and to 
                                        // destinations, so push the following data to 
                                        // the program in the user's freq flier prog obj
                                        var obj = {};
                                        obj['name'] = prog.name;
                                        obj['points'] = prog.points;
                                        obj['supportsRoute'] = true;
                                        obj['from'] = model.userFlightSelections.toDestination.fromAirport;
                                        obj['to'] = model.userFlightSelections.toDestination.toAirport;

                                        if (model.userFlightSelections.toDestination.class === 'economy') {
                                            obj['fees'] = regions[reg].generalToRegionCosts[costReg].economyFee;
                                            obj['miles'] = regions[reg].generalToRegionCosts[costReg].economyMiles;
                                            model.eligiblePrograms.toDestination.push(obj);
                                        } else {
                                            obj['fees'] = regions[reg].generalToRegionCosts[costReg].businessFee;
                                            obj['miles'] = regions[reg].generalToRegionCosts[costReg].businessMiles;
                                            model.eligiblePrograms.toDestination.push(obj);
                                        }
                                    }
                                }

                                // If fromRegion does match but general toRegion does 
                                // not, then check to see if the program 
                                // supports the user's toRegion destination in exceptions.
                                
                                regions[reg].exceptionToAirports.forEach(function (excp) {
                                    if (excp.exceptionAirportCode === model.userFlightSelections.toDestination.toAirport) {
                                        // Success! Program supports from and to 
                                        // destinations, so push the following data to 
                                        // the program in the user's freq flier prog obj

                                        var obj = {};
                                        obj['name'] = prog.name;
                                        obj['points'] = prog.points;
                                        obj['supportsRoute'] = true;
                                        obj['from'] = model.userFlightSelections.toDestination.fromAirport;
                                        obj['to'] = model.userFlightSelections.toDestination.toAirport;

                                        if (model.userFlightSelections.toDestination.class === 'economy') {
                                            obj['fees'] = excp.exceptionEconomyFee;
                                            obj['miles'] = excp.exceptionEconomyMiles;
                                            model.eligiblePrograms.toDestination.push(obj);
                                        } else {
                                            obj['fees'] = excp.exceptionBusinessFee;
                                            obj['miles'] = excp.exceptionBusinessMiles;
                                            model.eligiblePrograms.toDestination.push(obj);
                                        }
                                    }
                                });                                 
                            }

                            // If roundTrip, perform for from destination
                            if (model.userFlightSelections.toDestination.type === 'roundTrip') {

                                // Check to see if the user selection from airport
                                // matches this region's general from airports first
                                // and then check for toRegion.
                                if (regions[reg].generalFromAirports.indexOf(model.userFlightSelections.fromDestination.fromAirport) > -1) {
                                    
                                    // If it does match, then check to see if the program 
                                    // supports the user's toRegion destination in general.
                                    
                                    for (var costReg in regions[reg].generalToRegionCosts) {
                                        
                                        if (regions[reg].generalToRegionCosts[costReg].airports.indexOf(model.userFlightSelections.fromDestination.toAirport) > -1) {
                                            // Success! Program supports from and to 
                                            // destinations, so push the following data to 
                                            // the program in the user's freq flier prog obj
                                            var obj = {};
                                            obj['name'] = prog.name;
                                            obj['points'] = prog.points;
                                            obj['supportsRoute'] = true;
                                            obj['from'] = model.userFlightSelections.fromDestination.fromAirport;
                                            obj['to'] = model.userFlightSelections.fromDestination.toAirport;

                                            if (model.userFlightSelections.toDestination.class === 'economy') {
                                                obj['fees'] = regions[reg].generalToRegionCosts[costReg].economyFee;
                                                obj['miles'] = regions[reg].generalToRegionCosts[costReg].economyMiles;
                                                model.eligiblePrograms.fromDestination.push(obj);
                                            } else {
                                                obj['fees'] = regions[reg].generalToRegionCosts[costReg].businessFee;
                                                obj['miles'] = regions[reg].generalToRegionCosts[costReg].businessMiles;
                                                model.eligiblePrograms.fromDestination.push(obj);
                                            }
                                        }
                                    }

                                    // If fromRegion does match but general toRegion does 
                                    // not, then check to see if the program 
                                    // supports the user's toRegion destination in exceptions.
                                    
                                    regions[reg].exceptionToAirports.forEach(function (excp) {
                                        if (excp.exceptionAirportCode === model.userFlightSelections.fromDestination.toAirport) {
                                            // Success! Program supports from and to 
                                            // destinations, so push the following data to 
                                            // the program in the user's freq flier prog obj
                                            
                                            var obj = {};
                                            obj['name'] = prog.name;
                                            obj['points'] = prog.points;
                                            obj['supportsRoute'] = true;
                                            obj['from'] = model.userFlightSelections.fromDestination.fromAirport;
                                            obj['to'] = model.userFlightSelections.fromDestination.toAirport;

                                            if (model.userFlightSelections.toDestination.class === 'economy') {
                                                obj['fees'] = excp.exceptionEconomyFee;
                                                obj['miles'] = excp.exceptionEconomyMiles;
                                                model.eligiblePrograms.fromDestination.push(obj);
                                            } else {
                                                obj['fees'] = excp.exceptionBusinessFee;
                                                obj['miles'] = excp.exceptionBusinessMiles;
                                                model.eligiblePrograms.fromDestination.push(obj);
                                            }
                                        }
                                    });                                 
                                }
                            }
                            
                        }
                    } else if (ff[key].programType === 'distanceBased') {
                        
                        // Create a variable to house all of the from batches
                        // for that program
                        
                        var batches = ff[key].fromBatches;
                        
                        // Iterate through each from batch within that object to
                        // look for the from/to airport to see if the program 
                        // supports the route.

                        batches.forEach(function(b) {
                            if (b.fromAirportCodes.indexOf(model.userFlightSelections.toDestination.fromAirport) > -1) {
                                
                                // If it does match, then check to see if the program 
                                // supports the user's toRegion destination and at what 
                                // fee.

                                b.toBatches.forEach(function(toB) {
                                    if (toB.batch.indexOf(model.userFlightSelections.toDestination.toAirport) > -1) {
                                        // Success! Program supports from and to 
                                        // destinations, so push the following data to 
                                        // the program in the user's freq flier prog obj
                                        var obj = {};
                                        obj['name'] = prog.name;
                                        obj['points'] = prog.points;
                                        obj['supportsRoute'] = true;
                                        obj['from'] = model.userFlightSelections.toDestination.fromAirport;
                                        obj['to'] = model.userFlightSelections.toDestination.toAirport;

                                        if (model.userFlightSelections.toDestination.class === 'economy') {
                                            obj['fees'] = toB.costs.economyFee;
                                            obj['miles'] = toB.costs.economyMiles;
                                            model.eligiblePrograms.toDestination.push(obj);
                                        } else {
                                            if (toB.costs.businessFee) {
                                                obj['fees'] = toB.costs.businessFee;
                                                obj['miles'] = toB.costs.businessMiles;
                                                model.eligiblePrograms.toDestination.push(obj);
                                            } else {
                                                obj['fees'] = toB.costs.economyFee;
                                                obj['miles'] = toB.costs.economyMiles;
                                                model.eligiblePrograms.toDestination.push(obj);
                                            }
                                            
                                        }
                                    }
                                });                                 
                            }

                            // If roundTrip, perform for from destination
                            if (model.userFlightSelections.toDestination.type === 'roundTrip') {
                                if (b.fromAirportCodes.indexOf(model.userFlightSelections.fromDestination.fromAirport) > -1) {
                                
                                    // If it does match, then check to see if the program 
                                    // supports the user's toRegion destination and at what 
                                    // fee.

                                    b.toBatches.forEach(function(toB) {
                                        if (toB.batch.indexOf(model.userFlightSelections.fromDestination.toAirport) > -1) {
                                            // Success! Program supports from and to 
                                            // destinations, so push the following data to 
                                            // the program in the user's freq flier prog obj
                                            var obj = {};
                                            obj['name'] = prog.name;
                                            obj['points'] = prog.points;
                                            obj['supportsRoute'] = true;
                                            obj['from'] = model.userFlightSelections.fromDestination.fromAirport;
                                            obj['to'] = model.userFlightSelections.fromDestination.toAirport;

                                            if (model.userFlightSelections.toDestination.class === 'economy') {
                                                obj['fees'] = toB.costs.economyFee;
                                                obj['miles'] = toB.costs.economyMiles;
                                                model.eligiblePrograms.fromDestination.push(obj);
                                            } else {
                                                if (toB.costs.businessFee) {
                                                    obj['fees'] = toB.costs.businessFee;
                                                    obj['miles'] = toB.costs.businessMiles;
                                                    model.eligiblePrograms.fromDestination.push(obj);
                                                } else {
                                                    obj['fees'] = toB.costs.economyFee;
                                                    obj['miles'] = toB.costs.economyMiles;
                                                    model.eligiblePrograms.fromDestination.push(obj);
                                                }
                                                
                                            }
                                        }
                                    });                                 
                                }
                            }
                        });
                    }
                }
            }
        });

        console.log(model.eligiblePrograms);
    }
}