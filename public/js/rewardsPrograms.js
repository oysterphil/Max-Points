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
			participatingPrograms: {
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
				}
			}
		},
		amex: {
			participatingPrograms: {
				{
					name: 'unitedAirlines',
					pointTransferRate: 1.2
				},
				{
					name: 'example2',
					pointTransferRate: 1
				}
			}
		},
		citi: {
			participatingPrograms: {
				{
					name: 'unitedAirlines',
					pointTransferRate: 1.2
				},
				{
					name: 'example2',
					pointTransferRate: 1
				}
			}
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
								fee: 5,
								miles: 30000
							},
							latinAmerica: {
								fee: 70,
								miles: 12000
							},
							anotherRegion: {
								fee: 100,
								miles: 50000
							},
							etc: {
								fee: 'etc',
								miles: 'etc'
							}
						},
						// Here we list city information, including all airports
						// within each city.
						cities: [
							// Each city object will look like the below
							{
								// City Name
								cityName: 'Atlanta',
								generalCityAirportCode: 'ATL',
								// Airports Array
								airports: [
									// Each airport is an object w/i the array
									// The DC example (next) is better
									{
										airportName: 'Specific Atlanta Airport',
										airportCode: 'SAA'
									}
								],
								// Below is where you would list fee/mileage exceptions
								// on an airport basis
								exceptionToAirports: [
									{
										exceptionAirportName: 'Heathrow',
										exceptionAirportCity: 'London',
										exceptionAirportCountry: 'The United Kingdom',
										exceptionAirportCode: 'LON',
										exceptionFee: 100,
										exceptionMiles: 50000
									},
									{
										exceptionAirportName: 'Charles De Gaule',
										exceptionAirportCity: 'Paris',
										exceptionAirportCountry: 'France',
										exceptionAirportCode: 'CDG',
										exceptionFee: 10,
										exceptionMiles: 20000
									}
								]
							},
							{
								cityName: 'Washington, DC',
								generalCityAirportCode: 'WAS',
								airports: [
									{
										airportName: 'Reagan',
										airportCode: 'DCA'
									},
									{
										airportName: 'Dulles',
										airportCode: 'IAD'
									}
								],
								exceptionToAirports: [
									{
										exceptionAirportName: 'Madrid International Airport',
										exceptionAirportCity: 'Madrid',
										exceptionAirportCountry: 'Spain',
										exceptionAirportCode: 'MAD',
										exceptionFee: 100,
										exceptionMiles: 50000
									},
									{
										exceptionAirportName: 'Ataturk',
										exceptionAirportCity: 'Istanbul',
										exceptionAirportCountry: 'Turkey',
										exceptionAirportCode: 'IST',
										exceptionFee: 10,
										exceptionMiles: 20000
									}
								]
							},
							{
								cityName: 'etc',
								airportCode: 'ETC'
							}
						],
					},
					canada: {
						// Because we assume, that all foreign cities are 
						// eventually headed to somewhere in the U.S. region,
						// we only need to list the general fee and miles to
						// the US. Down the line, if you wanted to add inter-
						// region costs, you would do it below as we have done
						// in the U.S. toRegionCosts object.
						generalToUsCosts: {
							fee: 5,
							miles: 30000
						},
						// Here we list city information, including all airports
						// within each city.
						cities: [
							{
								cityName: 'Ottowa',
								// List the general city airport code as null if there
								// is no general city airport code, but only individual 
								// airport codes.
								generalCityAirportCode: null,
								airports: [
									{
										airportName: 'Ottowa General',
										airportCode: 'OTW'
									}
								],
								// We use exceptionAirportState instead of Country because,
								// again, we are assuming that all flights are to the US.
								exceptionToAirports: [
									{
										exceptionAirportName: 'John F. Kennedy',
										exceptionAirportCity: 'New York City',
										// Feel free to use New York or NY as you prefer
										exceptionAirportState: 'New York',
										exceptionAirportCode: 'JFK',
										exceptionFee: 100,
										exceptionMiles: 50000
									},
									{
										exceptionAirportName: 'Washington Dulles',
										exceptionAirportCity: 'Washington',
										exceptionAirportState: 'District of Columbia',
										exceptionAirportCode: 'IAD',
										exceptionFee: 10,
										exceptionMiles: 20000
									}
								]
							}
						],
					}
				},
			},
			deltaAirlines: {
				// Repeat Above for each region based program
			}
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
				fromRegions: {
					// For fromRegions, all US from cities could go anywhere
					// in the world, but we assume that all non-US from cities
					// will end up somewhere in the US.
					us: {
						// Below is where you list the general fee and miles
						// for each toRegion. If there is no general rule for 
						// either fee or miles, simply list it as null.
						generalToRegionCosts: {
							europe: {
								fee: 5,
								miles: 30000
							},
							latinAmerica: {
								fee: 70,
								miles: 12000
							},
							anotherRegion: {
								fee: 100,
								miles: 50000
							},
							etc: {
								// This region does not have a general fee
								fee: null,
								miles: 'etc'
							}
						},
						// Here we list city information, including all airports
						// within each city.
						cities: [
							// Each city object will look like the below
							{
								// City Name
								cityName: 'Atlanta',
								generalCityAirportCode: 'ATL',
								// Airports Array
								airports: [
									// Each airport is an object w/i the array
									// The DC example (next) is better
									{
										airportName: 'Specific Atlanta Airport',
										airportCode: 'SAA'
									}
								],
								// Below is where you would list fee/mileage exceptions
								// on an airport basis
								exceptionToAirports: [
									{
										exceptionAirportName: 'Heathrow',
										exceptionAirportCity: 'London',
										exceptionAirportCountry: 'The United Kingdom',
										exceptionAirportCode: 'LON',
										exceptionFee: 100,
										exceptionMiles: 50000
									},
									{
										exceptionAirportName: 'Charles De Gaule',
										exceptionAirportCity: 'Paris',
										exceptionAirportCountry: 'France',
										exceptionAirportCode: 'CDG',
										exceptionFee: 10,
										exceptionMiles: 20000
									}
								]
							},
							{
								cityName: 'Washington, DC',
								generalCityAirportCode: 'WAS',
								airports: [
									{
										airportName: 'Reagan',
										airportCode: 'DCA'
									},
									{
										airportName: 'Dulles',
										airportCode: 'IAD'
									}
								],
								exceptionToAirports: [
									{
										exceptionAirportName: 'Madrid International Airport',
										exceptionAirportCity: 'Madrid',
										exceptionAirportCountry: 'Spain',
										exceptionAirportCode: 'MAD',
										exceptionFee: 100,
										exceptionMiles: 50000
									},
									{
										exceptionAirportName: 'Ataturk',
										exceptionAirportCity: 'Istanbul',
										exceptionAirportCountry: 'Turkey',
										exceptionAirportCode: 'IST',
										exceptionFee: 10,
										exceptionMiles: 20000
									}
								]
							},
							{
								cityName: 'etc',
								airportCode: 'ETC'
							}
						],
					},
					canada: {
						// Because we assume, that all foreign cities are 
						// eventually headed to somewhere in the U.S. region,
						// we only need to list the general fee and miles to
						// the US. If there is no general rule, please just list
						// it as null. Down the line, if you wanted to add inter-
						// region costs, you would do it below as we have done
						// in the U.S. toRegionCosts object.
						generalToUsCosts: {
							fee: 5,
							miles: 30000
						},
						// Here we list city information, including all airports
						// within each city.
						cities: [
							{
								cityName: 'Ottowa',
								// List the general city airport code as null if there
								// is no general city airport code, but only individual 
								// airport codes.
								generalCityAirportCode: null,
								airports: [
									{
										airportName: 'Ottowa General',
										airportCode: 'OTW'
									}
								],
								// We use exceptionAirportState instead of Country because,
								// again, we are assuming that all flights are to the US.
								exceptionToAirports: [
									{
										exceptionAirportName: 'John F. Kennedy',
										exceptionAirportCity: 'New York City',
										// Feel free to use New York or NY as you prefer
										exceptionAirportState: 'New York',
										exceptionAirportCode: 'JFK',
										exceptionFee: 100,
										exceptionMiles: 50000
									},
									{
										exceptionAirportName: 'Washington Dulles',
										exceptionAirportCity: 'Washington',
										exceptionAirportState: 'District of Columbia',
										exceptionAirportCode: 'IAD',
										exceptionFee: 10,
										exceptionMiles: 20000
									}
								]
							}
						],
					}
				},
			}
		}
	},
	// We still need to discuss cashBack, but from our original 
	// conversation, this seemed more straightforward.
	cashBack: {

	}
}