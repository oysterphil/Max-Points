// Model
var model = {
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
        },
        possiblePersRecs: [
            {
                cardName: 'Discover It',
                annualFee: 0,
                everywhere: 1,
                gas: 5,
                diningOut: 5,
                localTransportation: 5,
                departmentStores: 5,
                amazon: 5,
                wholesaleClubs: 5,
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '1% cash back everywhere and 2% in year one.',
                    '5% cash back on rotating categories (up to $1,500 spent per quarter) and 10% in year 1.',
                    'Typical categories: gas & local transportation including Uber and Lyft in Q1, restaurants, movies & wholesale clubs in Q2, Amazon & home improvement stores in Q3 then department stores & Amazon in Q4.',
                    'No foreign transaction fees.',
                    'Free TransUnion FICO score updated monthly.',
                    'Access to Discover Deals online shopping portal.',
                    'All cash back doubled at the end of year one.'
                ]
            },
            {
                cardName: 'Discover It Secured Card',
                annualFee: 0,
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                howCardIncreasesPoints: [
                    'The highest points-earning secured card without an annual fee.',
                    'Your initial deposit is your credit line and your card is reviewed automatically after the first year in order to refund the deposit and transition the card to a regular unsecured card.',
                    '1% cash back (2% in year one) everywhere.',
                    '2% cash back (4% in year one) on gas and restaurants (up to $1,000 in combined purchases quarterly).',
                    'No foreign transaction fees.',
                    'Free TransUnion FICO score updated monthly.',
                    'All cash back doubled at the end of year one.'
                ]
            },
            {
                cardName: 'Capital One Quicksilver One MasterCard or Visa',
                annualFee: 39,
                everywhere: 1.5,
                howCardIncreasesPoints: [
                    '$39 annual fee.',
                    '1.5% cash back everywhere.',
                    'No foreign transaction fees.'
                ]
            },
            {
                cardName: 'Citi Double Cash MasterCard',
                annualFee: 0,
                everywhere: 2,
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '2% cash back everywhere.',
                    'Access to Citi Price Rewind automatic savings on purchase price drops.'
                ]
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
                departmentStores: 5,
                signUpBonus: '15,000 points after spending $500 in the first three months.',
                howCardIncreasesPoints: [
                    '1% cash back everywhere.',
                    '5% cash back on rotating categories (up to $1,500 spent per quarter).',
                    'Typical categories: gas & commuter passes in Q1,grocery stores and drugstores in Q2, restaurants in Q3 then department stores & drugstores in Q4',
                    'Access to Chase’s online shopping portal.',
                    'Points are cash back but if the same cardholder has the Chase Sapphire Preferred, Reserve, Ink Plus, Ink Bold or Ink Preferred, then all points are transferable to many frequent flyer and hotel loyalty programs for even more value.'
                ]
            },
            {
                cardName: 'Barclaycard Arrival Plus World Elite MasterCard',
                annualFee: 89,
                everywhere: 2.1,
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
                everywhere: 1.5,
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
                everywhere: 1.5,
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
                everywhere: 1,
                diningOut: 2,
                travel: 2,
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
                everywhere: 1,
                diningOut: 3,
                travel: 3,
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
                everywhere: 1.2,
                groceries: 2.4,
                uber: 2.2,
                amexTravel: 2.2,
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
                everywhere: 1.5,
                gas: 3,
                groceries: 4.5,
                uber: 2.5,
                amexTravel: 2.5,
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
                everywhere: 0,
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
                everywhere: 1,
                diningOut: 3,
                travel: 3,
                telecommunications: 3,
                socialMediaAdvertising: 3,
                shipping: 3,
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
                everywhere: 1,
                howCardIncreasesPoints: [
                    'No annual fee.',
                    '1% cash back everywhere.',
                    'No foreign transaction fees.'
                ]
            },
            {
                cardName: 'Capital One Spark Cash Select For Business Visa',
                annualFee: 0,
                everywhere: 1.5,
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
                everywhere: 2,
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
                everywhere: 1,
                gas: 2,
                diningOut: 2,
                telecommunications: 5,
                officeSupplyStores: 5,
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
                everywhere: 1,
                gas: 2,
                carRentals: 2,
                telecommunications: 2,
                americanAirlinesFlights: 2,
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
        finalRecsBiz: [
        ],
        finalRecsPers: [
        ]
    },
    templates: {
        variables: {
            personalRecommendationsTemplate: null,
            businessRecommendationsTemplate: null
        },
        compile: function() {
        // Compile Personal Recommendations Template
        var personalRecommendationsTemplateSource = document.getElementById('personalRecommendationsTemplate').innerHTML;
        model.templates.variables.personalRecommendationsTemplate = Handlebars.compile(personalRecommendationsTemplateSource);

        // Compile Business Recommendations Template
        var businessRecommendationsTemplateSource = document.getElementById('businessRecommendationsTemplate').innerHTML;
        model.templates.variables.businessRecommendationsTemplate = Handlebars.compile(businessRecommendationsTemplateSource);
        },
        renderPersonalRecommendationsTemplate: () => {
            var personalRecommendationsTemplateHtml = model.templates.variables.personalRecommendationsTemplate(model.cards);
            document.getElementById('personalRecommendations').innerHTML = personalRecommendationsTemplateHtml;
        },
        renderBusinessRecommendationsTemplate: () => {
            var businessRecommendationsTemplateHtml = model.templates.variables.businessRecommendationsTemplateHtml(model.cards);
            document.getElementById('businessRecommendations').innerHTML = businessRecommendationsTemplateHtml;   
        }
    },
    controllers: {
        setup: () => {
            model.templates.compile();

            // In Production:
            // document.getElementById('submitForm').addEventListener('click', determineSelections);

            // In Test:
            document.getElementById('submitForm').addEventListener('click', model.controllers.createReport);
        },
        createReport: () => {
            // Hide the Form
            document.getElementById('intakeForm').style.display = 'none';

            // Display the Loading Page
            document.getElementById('loading').style.display = 'inline';

            // Move on to Log the User's Selections to the Model
            model.controllers.determineSelections();
            // setTimeout(function(){
            //  document.getElementById('loading').style.display = 'none';
            //  document.getElementById('recommendationReport').style.display ='inline'; 
            //  document.getElementById('disclaimer').style.display = 'inline';
            // }, 3000);
        },
        determineSelections: () => {
            // Log User's Inputs to the Model
            if (document.getElementById('ownBusiness').value === 'Yes') {
                model.cards.currentStatusBasedOnSelections.ownBusiness = true;
            } else {
                model.cards.currentStatusBasedOnSelections.ownBusiness = false;
            }
            model.cards.currentStatusBasedOnSelections.rewardsGoal = document.getElementById('rewardsGoal').value;
            model.cards.currentStatusBasedOnSelections.creditScore = document.getElementById('creditScore').value;
            model.cards.currentStatusBasedOnSelections.email = document.getElementById('email').value;
            const card1 = document.getElementById('card1').value;
            const card2 = document.getElementById('card2').value;
            const card3 = document.getElementById('card3').value; 
            var cards = model.cards.all;

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

            console.log(model.cards.userSelections);

            // Move on to create the Results Object from the Selection
            model.controllers.determineCurrentStatusBasedOnSelections();
        },
        determineCurrentStatusBasedOnSelections:() => {
            
            // Calculate totalAnnualFee
            model.cards.userSelections.forEach(function(a){
                model.cards.currentStatusBasedOnSelections.totalAnnualFee += a.annualFee;
            });

            // Determine Best Everything
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
                //console.log(determineBest);
                model.cards.currentStatusBasedOnSelections[cat] = determineBest[0];
                determineBest = [];
            });

            model.controllers.cleanUpResults(model.cards.currentStatusBasedOnSelections);
        },
        cleanUpResults: (obj) => {
            for (var propName in obj) { 
                if (obj[propName] === null || obj[propName] === undefined) {
                  delete obj[propName];
                }
            }

            console.log(model.cards.currentStatusBasedOnSelections);
            
            model.controllers.determineBizRecs();
        },
        determineBizRecs: () => {
            var a = model.cards.currentStatusBasedOnSelections;
            var c = model.cards;
            if (a.ownBusiness) {
                if (a.creditScore === 'poorCredit' || 
                    a.creditScore === 'limitedCredit') {
                    model.controllers.determinePersRecs();
                    return;
                } else if (a.creditScore === 'fairCredit') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Classic For Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    model.controllers.determinePersRecs();
                    return;
                } else if (a.creditScore === 'goodCredit') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash Select For Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        } else if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash For Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        } else if (c.possibleBizRecs[i].cardName === 'Citi Business American Airlines AAdvantage Platinum Select MasterCard') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    model.controllers.determinePersRecs();
                    return;
                } else if (a.creditScore === 'excellentCredit' 
                            && a.rewardsGoal === 'cashBack') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Chase Ink Cash Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        } else if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash For Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        } else if (c.possibleBizRecs[i].cardName === 'Chase Ink Business Preferred Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        } else if (c.possibleBizRecs[i].cardName === 'Capital One Spark Cash Select For Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    model.controllers.determinePersRecs();
                    return;
                } else if (a.creditScore === 'excellentCredit' 
                            && a.rewardsGoal === 'freeFlights') {
                    for (var i = 0; i < c.possibleBizRecs.length; i++) {
                        if (c.possibleBizRecs[i].cardName === 'Chase Ink Business Preferred Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        } else if (c.possibleBizRecs[i].cardName === 'Chase Ink Cash Business Visa') {
                            c.finalRecsBiz.push(c.possibleBizRecs[i]);
                        }
                    }
                    model.controllers.determinePersRecs();
                    return;
                } else {
                    console.log(alert('User selected Not Sure about credit history and logic has been provided for this scenario'));
                }
            } else {
                model.controllers.determinePersRecs();
            }
        },
        determinePersRecs: () => {
            console.log(model.cards.finalRecsBiz);
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
        }
    }
}


$(document).ready(model.controllers.setup);
