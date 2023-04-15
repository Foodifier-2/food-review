BASE_URL = "https://nutrition.sa.ucsc.edu/longmenu.aspx?sName=UC+Santa+Cruz+Dining&locationNum="
LOCATION_URLS = {
    'Cowell/Stevenson': "05&locationName=Cowell%2fStevenson+Dining+Hall&naFlag=1",
    'Crown/Merrill': "20&locationName=Crown%2fMerrill+Dining+Hall&naFlag=1",
    'Nine/Ten': "40&locationName=College+Nine%2fJohn+R.+Lewis+Dining+Hall&naFlag=1",
    'Porter/Kresge': "25&locationName=Porter%2fKresge+Dining+Hall&naFlag=1"}
MEAL_URL = "&WeeksMenus=UCSC+-+This+Week%27s+Menus&mealName="
SCHEDULE = ['cowell'
            
            
            
            ]
MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Late Night', 'Auto']  
//Auto meal selects meal based on current time
DIVIDERS = ['-- Soups --', '-- Breakfast --', '-- Grill --', '-- Entrees --', '-- Pizza --', '-- Clean Plate --', '-- DH Baked --', '-- Bakery --', '-- Open Bars --', '-- All Day --'] 
// strings corresponding to the dividers, will be used to determine menu validity 
                                                                                      
// (eg if cereal is first divider found, then the dh is not open for that meal)
EMOJIS = {'veggie':'🥦', 'vegan':'🌱', 'halal':'🍖', 'eggs':'🥚', 'beef':'🐮', 'milk':'🥛', 'fish':'🐟', 'alcohol':'🍷', 'gluten':'🍞', 'soy':'🫘', 'treenut':'🥥', 'sesame':'', 'pork':'🐷', 'shellfish':'🦐', 'nuts':'🥜'}


var JSSoup = require('jssoup').default;
var needle = require('needle');

function get_site_with_cookie(url, location_url){
  let location_cookie = location_url.slice(0,2);
  let cookies = {
        'WebInaCartLocation': location_cookie,
        'WebInaCartDates': '',
        'WebInaCartMeals': '',
        'WebInaCartQtys': '',
        'WebInaCartRecipes': ''
    };
  let response = needle.request("get",url,cookies);
  return response;
}

function get_meal(college, meal, date="today"){
  let food_items = [];
  let date_string = "";
  if(date!="today") {
    let date_split = date.split("/");
    date_string = `&dtdate=${date_split[0]}%2F${date_split[1]}%2F${date_split[2]}`;
  }

  let location_url = LOCATION_URLS[college];

  let full_url = BASE_URL + MEAL_URL + meal + date_string;

  let response = get_site_with_cookie(full_url, location_url);

  return response;
  let soup = new JSSoup(response);

}



