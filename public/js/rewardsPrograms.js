var airports = [

];
var programs = {
	// Here is where you list the three points transferrable programs
	pointsTransferrable: {
		chase: {
			// Here is where you would include all of the relevant
			// data about each frequent flier program that the points
			// program works with. Feel free to add data points that 
			// I may have missed. Just be sure to separate each key
			// value pair within the object with a , except for the 
			// last key value pair. 
			participatingPrograms: [
				{
					// Place comma after this key value pair
					name: 'unitedAirlines',
					// But not after this key value pair, since
					// it is the last one in the object.
					pointTransferRate: 1.2
				},
				{
					name: 'delta',
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
	// This is the complex object for the frequentFlier programs.
	// We will be manipulating this object heavily in the logic section,
	// so it is important to get it right.
	frequentFlier: {
		// From our convo, there are region-based and distance based
		// programs.
		regionBased: {
			// United and Delta may not be region based programs, but I am
			// using them as examples here.
			unitedAirlines: {
				displayName: 'United\'s Display Name',
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
								fee: '70',
								miles: '12000'
							},
							anotherRegion: {
								fee: '100',
								miles: '50000'
							},
							etc: {
								fee: 'etc',
								miles: 'etc'
							}
						},
						generalFromAirports: [
							'WAS', 
							'JFK', 
							'...'
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
						// Because we assume, that all foreign cities are 
						// eventually headed to somewhere in the U.S. region,
						// we only need to list the general fee and miles to
						// the US. Down the line, if you wanted to add inter-
						// region costs, you would do it below as we have done
						// in the U.S. toRegionCosts object.
						airports: [
							'OTO'
						],
						generalToUsFeeEconomy: '55',
						generalToUsFeeBusiness: '100',
						// If no exceptions, no need to include the below, just delete.
						exceptionAirports: null
					},
					europe: {
						// Because we assume, that all foreign cities are 
						// eventually headed to somewhere in the U.S. region,
						// we only need to list the general fee and miles to
						// the US. Down the line, if you wanted to add inter-
						// region costs, you would do it below as we have done
						// in the U.S. toRegionCosts object.
						airports: [
							'BCN',
							'MAD'
						],
						generalToUsFee: '100',
						// Here we list city information, including all airports
						// within each city.
						exceptionAirports: [
							{
								airportCode: 'CDG'
								exceptionFee: '100 - 150',
							},
							{
								airportCode: 'BCN'
								exceptionFee: '75',
							}
						],
					}
				}
			},
			deltaAirlines: {
				// Repeat Above for each region based program
			},
			chaseCashBack: {
				displayName: 'Chase Cash Back',
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
								fee: 0,
								miles: 100000
							},
							latinAmerica: {
								fee: 0,
								miles: 50000
							},
							...
						}
					}
				}
			},


		},
		distanceBased: {
			// Virgin may not be a distance based program, but I am using
			// it and Delta as examples here.
			virginAtlantic: {
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
						fromAirportCode: 'JFK'
						toBatches: [
							{
								batch: [
									'BCN',
									'MAD',
									'CDG'
								],
								costs: {
									fee: '5 - 50',
									miles: '30,000'
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
									fee: '5 - 50',
									miles: '30,000'
								}
							}
						]
					}
				]
			}
		}
	}
}