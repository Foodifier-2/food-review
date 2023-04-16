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

const { SlashCommandBuilder, Embed, EmbedBuilder } = require('discord.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

var axios = require('axios');

async function get_site_with_cookie(url, location_url) {
  console.log(url)
	let location_cookie = location_url.slice(0, 2);
    const cookies = {
        'WebInaCartLocation': location_cookie,
        'WebInaCartDates': '',
        'WebInaCartMeals': '',
        'WebInaCartQtys': '',
        'WebInaCartRecipes': ''
      };
    
      return axios.get(url, { 
        headers: {
          'Cookie': Object.entries(cookies).map(c => c.join('=')).join('; ')
        }
    }).then(response => {
        console.log('worked');
        //console.log(response.data);
        return response.data;
      }).catch(error => {
        console.error(error);
        return error;
      });

}

async function get_meal(college, meal) {
	let food_items = {};
	let date_string = "";

	const today = new Date();
	date = `&dtdate=${today.getMonth() + 1}%2F${today.getDate()}%2F${today.getFullYear().toString().substr(-2)}`;

	let location_url = LOCATION_URLS[college];
	//console.log(location_url)

	let full_url = BASE_URL + location_url + MEAL_URL + meal + date;
	console.log(full_url);
	let response = await get_site_with_cookie(full_url, location_url);
	console.log(response.data)
  	food_items = {};
	const dom = new JSDOM(response)
  	dom.window.document.querySelectorAll('tr').forEach((tr) => {
		if (tr.querySelector('div.longmenucolmenucat')) {
			// If current tr has a divider
			//console.log(tr.querySelector('div.longmenucolmenucat'));
			food_items[tr.querySelector('div.longmenucolmenucat').textContent] = null;
			return; // go to next tr
			}
			if (tr.querySelector('div.longmenucoldispname')) {
			// If current tr has a food item
			let food = tr.querySelector('div.longmenucoldispname').textContent;
			food_items[food] = []; // add food to dictionary
			for (let img of tr.querySelectorAll('img')) {
				// Iterate through dietary restrictions and get img src names
				let diets = img.getAttribute('src').split('/')[1].split('.')[0];
				food_items[food].push(diets);
			}
			}
		
  })

    

  // for (const tr in $('tr')){
  //   console.log(tr);
  // }



	// let response = get_site_with_cookie(full_url, location_url);
	// let soup = new JSSoup(response);
	// console.log(soup.findAll('tr', recursive = true));


  // for (const tr in soup.findAll('tr', recursive=true)){
  //   let divider;
  //   if(divider = tr.find('div', {'class':'longmenucolmenucat'}) != null){
  //       // console.log(divider)
  //       food_items[divider.text] = null
  //       continue
  //   }
  //   let food;
  //   if (food = tr.find('div', {'class':'longmenucoldispname'}) != null) {
  //     food_items[food.text] = []
  //     for (const img in tr.findAll('img')){
  //       diets = img['src'].split('/')[1].split('.')[0]
  //       food_items[food.text].append(diets);
  //     }
  //   }
  // // console.log(food_items)
  // }
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
	console.log(JSON.stringify(food_items));
  return food_items;
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
		const meal = interaction.options.getString("meal");

		//console.log(get_meal(hall, meal));
		let msg = '';
		let food_items = await get_meal(hall, meal);
		for (let food of Object.keys(food_items)) {
			if (food.includes('-- ') && !DIVIDERS.includes(food)) {
				break;
			}
			
			if (!DIVIDERS.includes(food)) {
				msg += food;
				for (let diet_restriction of food_items[food]) {
					console.log(diet_restriction);
					msg += EMOJIS[diet_restriction] + '  ';
				}
				msg += '\n';
			} else {
				msg += food.replace('-- ', '**')
				.replace(' --', '**') + '\n';
			}
		}
		const embed = new EmbedBuilder()
			.setColor(0x50C878)
			.setDescription(msg);
		await interaction.reply({ embeds: [embed] });

		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	}
};
