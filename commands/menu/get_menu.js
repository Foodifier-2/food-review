const BASE_URL = "https://nutrition.sa.ucsc.edu/longmenu.aspx?sName=UC+Santa+Cruz+Dining&locationNum=";
const LOCATION_URLS = {
	'Cowell/Stevenson': "05&locationName=Cowell%2fStevenson+Dining+Hall&naFlag=1",
	'Crown/Merrill': "20&locationName=Crown%2fMerrill+Dining+Hall&naFlag=1",
	'Nine/Ten': "40&locationName=College+Nine%2fJohn+R.+Lewis+Dining+Hall&naFlag=1",
	'Porter/Kresge': "25&locationName=Porter%2fKresge+Dining+Hall&naFlag=1"
};
const MEAL_URL = "&WeeksMenus=UCSC+-+This+Week%27s+Menus&mealName=";
const SCHEDULE = ['cowell'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Late Night', 'Auto'];
//Auto meal selects meal based on current time
const DIVIDERS = ['-- Soups --', '-- Breakfast --', '-- Grill --', '-- Entrees --', '-- Pizza --', '-- Clean Plate --', '-- DH Baked --', '-- Bakery --', '-- Open Bars --', '-- All Day --'];
// strings corresponding to the dividers, will be used to determine menu validity

// (eg if cereal is first divider found, then the dh is not open for that meal)
const EMOJIS = { 'veggie': '🥦', 'vegan': '🌱', 'halal': '🍖', 'eggs': '🥚', 'beef': '🐮', 'milk': '🥛', 'fish': '🐟', 'alcohol': '🍷', 'gluten': '🍞', 'soy': '🫘', 'treenut': '🥥', 'sesame': '', 'pork': '🐷', 'shellfish': '🦐', 'nuts': '🥜' };

const { SlashCommandBuilder } = require('discord.js');
var JSSoup = require('jssoup').default;
var needle = require('needle');
const { execute } = require('../review/reviews');

function get_site_with_cookie(url, location_url) {
	console.log(location_url);
	let location_cookie = location_url.slice(0, 2);
	let cookies = {
		'WebInaCartLocation': location_cookie,
		'WebInaCartDates': '',
		'WebInaCartMeals': '',
		'WebInaCartQtys': '',
		'WebInaCartRecipes': ''
	};
	let response = needle.request("get", url, cookies);
	return response;
}

function get_meal(college, meal, date = "today") {
	let food_items = [];
	let date_string = "";
	if (date != "today") {
		let date_split = date.split("/");
		date_string = `&dtdate=${date_split[0]}%2F${date_split[1]}%2F${date_split[2]}`;
	}
	//console.log(college)
	let location_url = LOCATION_URLS[college];
	//console.log(location_url)

	let full_url = BASE_URL + MEAL_URL + meal + date_string;

	let response = get_site_with_cookie(full_url, location_url);
	let soup = new JSSoup(response);
	console.log(soup.findAll('tr', recursive = true));
	// for tr in table.find_all('tr',recursive=True): # recursive false so it doesnt get the text 3 times due to nested trs
	//     #print(f"{tr}\n\n")
	//     if (divider := tr.find('div',{'class':'longmenucolmenucat'})) is not None: # check if divider (Grill, Cereal etc) in current tr. if so, print or whatever and go to next tr
	//         food_items[divider.text] = None
	//         #print(divider.text)
	//         continue
	//     if (food := tr.find('div', {'class':'longmenucoldispname'})) is not None:
	//         food_items[food.text] = [] # add food to dictionary
	//         #print(food.text)
	//         for img in tr.find_all('img'): # iterate through dietary restrictions and get img src names
	//             diets = img['src'].split('/')[1].split('.')[0] # parse them just in case i need them later
	//
	//             food_items[food.text].append(diets)

}


module.exports = {
	data: new SlashCommandBuilder()
		.setName("menu")
		.setDescription("Get the menu of the specified day at a dining hall")
		.addStringOption(option =>
			option.setName("dining_hall")
				.setDescription("Dining hall you want to eat at")
				.addChoices(
					{ name: "Cowell/Stevenson", value: "Cowell/Stevenson" },
					{ name: "Porter/Kresge", value: "Porter/Kresge" },
					{ name: "Crown/Merrill", value: "Crown/Merrill" },
					{ name: "Nine/Ten", value: "Nine/Ten" }
				)
				.setRequired(true))
		.addStringOption(option =>
			option.setName("meal")
				.setDescription("What meal you want to eat")
				.addChoices(
					{ name: "Breakfast", value: "Breakfast" },
					{ name: "Lunch", value: "Lunch" },
					{ name: "Dinner", value: "Dinner" },
					{ name: "Late Night", value: "Late Night" },
				)
				.setRequired(true)),

	async execute(interaction) {
		const hall = interaction.options.getString("dining_hall");
		console.log(hall);
		const meal = interaction.options.getString("meal");
		await interaction.reply(get_meal(hall, meal));

		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	}
};
