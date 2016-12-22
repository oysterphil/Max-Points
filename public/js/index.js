// Model

var model = {
	cards: [
		{
        	cardName: 'American Express Blue Cash Everyday',
        	annualFee: 0,
        	everywhere: 1,
        	gas: 2,
            groceries: 3,
        	diningOut: null,
        	travel: null,
        	airfare: null,
        	hotels: null,
        	carRentals: null,
        	uber: null,
        	localTransportation: null,
        	amexTravel: null,
        	drugstores: null,
        	departmentStores: null,
        	amazon: null,
        	telecommunications: null,
        	cellPhoneServices: null,
        	officeSupplyStores: null,
        	socialMediaAdvertising: null,
        	shipping: null,
            wholesaleClubs: null,
			singleHotelChain: null,
		  	singleAirline: null
    	},
		{
       		cardName: 'American Express Blue Cash Preferred',
        	annualFee: 95,
        	everywhere: 1,
        	gas: 3,
            groceries: 6,
        	diningOut: null,
        	travel: null,
        	airfare: null,
        	hotels: null,
        	carRentals: null,
        	uber: null,
        	localTransportation: null,
        	amexTravel: null,
        	drugstores: null,
        	departmentStores: null,
        	amazon: null,
        	telecommunications: null,
        	cellPhoneServices: null,
        	officeSupplyStores: null,
        	socialMediaAdvertising: null,
        	shipping: null,
            wholesaleClubs: null,
			singleHotelChain: null,
		  	singleAirline: null
    	},
		{
       		cardName: 'American Express Blue Sky',
        	annualFee: 0,
        	everywhere: 0.75,
        	gas: null,
            groceries: null,
        	diningOut: null,
        	travel: null,
        	airfare: null,
        	hotels: null,
        	carRentals: null,
        	uber: null,
        	localTransportation: null,
        	amexTravel: null,
        	drugstores: null,
        	departmentStores: null,
        	amazon: null,
        	telecommunications: null,
        	cellPhoneServices: null,
        	officeSupplyStores: null,
        	socialMediaAdvertising: null,
        	shipping: null,
            wholesaleClubs: null,
			singleHotelChain: null,
		  	singleAirline: null
    	},
		{
        	cardName: 'American Express Charles Schwabb Investor Card',
        	annualFee: 0,
        	everywhere: 1.5,
        	gas: null,
            groceries: null,
        	diningOut: null,
        	travel: null,
        	airfare: null,
        	hotels: null,
        	carRentals: null,
        	uber: null,
        	localTransportation: null,
        	amexTravel: null,
        	drugstores: null,
        	departmentStores: null,
        	amazon: null,
        	telecommunications: null,
        	cellPhoneServices: null,
        	officeSupplyStores: null,
        	socialMediaAdvertising: null,
        	shipping: null,
            wholesaleClubs: null,
			singleHotelChain: null,
		  	singleAirline: null
    	},
		{
        cardName: 'American Express Platinum (Personal)',
        	annualFee: 450,
        	everywhere: 1,
        	gas: null,
            groceries: null,
       		diningOut: null,
        	travel: null,
        	airfare: 5,
        	hotels: null,
        	carRentals: null,
        	uber: 2,
        	localTransportation: null,
        	amexTravel: 2,
        	drugstores: null,
        	departmentStores: null,
        	amazon: null,
        	telecommunications: null,
        	cellPhoneServices: null,
        	officeSupplyStores: null,
        	socialMediaAdvertising: null,
        	shipping: null,
            wholesaleClubs: null,
			singleHotelChain: null,
		  	singleAirline: null
    	},
		{
        	cardName: 'American Express Platinum (Business)',
        	annualFee: 450,
        	everywhere: 1,
        	gas: null,
            groceries: null,
        	diningOut: null,
        	travel: null,
        	airfare: null,
        	hotels: null,
        	carRentals: null,
        	uber: 2,
        	localTransportation: null,
        	amexTravel: 2,
        	drugstores: null,
        	departmentStores: null,
        	amazon: null,
        	telecommunications: null,
        	cellPhoneServices: null,
        	officeSupplyStores: null,
        	socialMediaAdvertising: null,
        	shipping: null,
            wholesaleClubs: null,
			singleHotelChain: null,
		  	singleAirline: null
    	}
    ],
    categories: [
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
    selections: [],
    results: {
    	firstName: null,
    	email: null,
    	ownBusiness: null,
    	creditScore: null,
		rewardsGoal: null,
		totalAnnualFee: null,
		everywhere: null,
		gas: null,
		groceries: null,
		diningOut: null,
		travel: null,
		airfare: null,
		hotels: null,
		carRentals: null,
		uber: null,
		localTransportation: null,
		amexTravel: null,
		drugstores: null,
		departmentStores: null,
		amazon: null,
		telecommunications: null,
		cellPhoneServices: null,
		officeSupplyStores: null,
		socialMediaAdvertising: null,
		shipping: null,
		wholesaleClubs: null,
		singleHotelChain: null,
		singleAirline: null
    }

}

// View

function cleanUpResults(obj) {
	for (var propName in obj) { 
		if (obj[propName] === null || obj[propName] === undefined) {
		  delete obj[propName];
		}
	}

	console.log(model.results);
}

function determineResults() {
	
	// Calculate totalAnnualFee
	model.selections.forEach(function(a){
		model.results.totalAnnualFee += a.annualFee;
	});

	// Determine Best Everything
	determineBest = [];
	model.categories.forEach(function(cat) {		
		for (var i = 0; i < model.selections.length; i++) {
			var a = model.selections[i];
			if (a[cat] !== null) {
				determineBest.push(a[cat]);
			}
		}
		determineBest.sort().reverse();
		//console.log(determineBest);
		model.results[cat] = determineBest[0];
		determineBest = [];
	});

	console.log(model.results);

	cleanUpResults(model.results);
}

function determineSelections() {
	model.results.rewardsGoal = document.getElementById('rewardsGoal').value;
	model.results.ownBusiness = document.getElementById('ownBusiness').value;
	model.results.creditScore = document.getElementById('creditScore').value;
	model.results.email = document.getElementById('email').value;
	const card1 = document.getElementById('card1').value;
	const card2 = document.getElementById('card2').value;
	const card3 = document.getElementById('card3').value; 
	var cards = model.cards;

	for (var i = 0; i < cards.length; i++) {
		if (cards[i].cardName === card1) {
			model.selections.push(cards[i]);
		} else if (cards[i].cardName === card2) {
			model.selections.push(cards[i]);
		} else if (cards[i].cardName === card3) {
			model.selections.push(cards[i]);
		} 
	}
	determineResults();
}


function showRecommendationReport() {
	document.getElementById('intakeForm').style.display = 'none';
	document.getElementById('loading').style.display = 'inline';
	setTimeout(function(){
		document.getElementById('loading').style.display = 'none';
		document.getElementById('recommendationReport').style.display ='inline'; 
		document.getElementById('disclaimer').style.display = 'inline';
	}, 3000);
}

// Controller
function setup() {
	// In Production:
	// document.getElementById('submitForm').addEventListener('click', determineSelections);

	// In Test:
	document.getElementById('submitForm').addEventListener('click', showRecommendationReport);
}

$(document).ready(setup);
