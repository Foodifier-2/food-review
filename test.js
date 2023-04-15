const BASE_URL = "https://nutrition.sa.ucsc.edu/longmenu.aspx?sName=UC+Santa+Cruz+Dining&locationNum=";
const LOCATION_URLS = {
	'Cowell/Stevenson': "05&locationName=Cowell%2fStevenson+Dining+Hall&naFlag=1",
	'Crown/Merrill': "20&locationName=Crown%2fMerrill+Dining+Hall&naFlag=1",
	'Nine/Ten': "40&locationName=College+Nine%2fJohn+R.+Lewis+Dining+Hall&naFlag=1",
	'Porter/Kresge': "25&locationName=Porter%2fKresge+Dining+Hall&naFlag=1"
};
const MEAL_URL = "&WeeksMenus=UCSC+-+This+Week%27s+Menus&mealName=";

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Late Night', 'Auto'];
//Auto meal selects meal based on current time
const DIVIDERS = ['-- Soups --', '-- Breakfast --', '-- Grill --', '-- Entrees --', '-- Pizza --', '-- Clean Plate --', '-- DH Baked --', '-- Bakery --', '-- Open Bars --', '-- All Day --'];
// strings corresponding to the dividers, will be used to determine menu validity

// (eg if cereal is first divider found, then the dh is not open for that meal)
const EMOJIS = { 'veggie': '🥦', 'vegan': '🌱', 'halal': '🍖', 'eggs': '🥚', 'beef': '🐮', 'milk': '🥛', 'fish': '🐟', 'alcohol': '🍷', 'gluten': '🍞', 'soy': '🫘', 'treenut': '🥥', 'sesame': '', 'pork': '🐷', 'shellfish': '🦐', 'nuts': '🥜' };

const { SlashCommandBuilder } = require('discord.js');
var JSSoup = require('jssoup').default;
var axios = require('axios');


function get_site_with_cookie(url, location_url) {
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
        console.log(response.status);
        console.log(response.data);
        return response;
      }).catch(error => {
        console.error(error);
        return error;
      });

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

	let full_url = BASE_URL + location_url + MEAL_URL + meal + date_string;
	console.log(full_url);
	let response = get_site_with_cookie(full_url, location_url);
	console.log(response);
	//let soup = new JSSoup(response);
	//console.log(soup.findAll('tr', recursive = true));
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
  return "hi";
}

get_meal('Cowell/Stevenson', 'Lunch');