const { EmbedBuilder } = require('discord.js');
const main = require('./main.js')

function readData(in_file) {
  const fs = require('fs');
  const csv = require('csv-parser');

  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(in_file)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

function writeData(data, out_file) {
  const { createObjectCsvWriter } = require('csv-writer');
  const csvWriter = createObjectCsvWriter({
    path: out_file,
    header: [
      { id: 'username', title: 'username' },
      { id: 'user_id', title: 'user_id' },
      { id: 'food_item', title: 'food_item' },
      { id: 'rating', title: 'rating' },
      { id: 'review', title: 'review' },
    ],
    append: true,
  });
  return csvWriter.writeRecords(data);
}

async function getAllData(in_f) {
  const data = await readData(in_f);
  return data;
}

async function findByName(name, file) {
  const data = await readData(file);
  let reviews = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].username.localeCompare(name)) {
      reviews.push(data[i]);
    }
  }
  return reviews;
}

async function findByFood(food, file) {
  const data = await readData(file);
  let reviews = [];

  const client = main.getClient();

  console.log(data[0])
  console.log(client.users.cache);
  //console.log(data)g
  for (let i = 0; i < data.length; i++) {
    
    if (data[i].food_item.localeCompare(food) == 0) {
      const embed = new EmbedBuilder()
        .setAuthor({name: data[i].username})
        .setTitle(data[i].food_item)
        .setDescription(`**Rating: ${data[i].rating}/10\nReview: ${data[i].review}**`)
      reviews.push(embed);
    }
  }
  return reviews;
}

async function sortRating(food, file) {
  const reviews = await readData(file);

  let data = []
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].food_item.localeCompare(food)) {
      //data.push(reviews[i]);
      console.log(review[i]);
    }
  }

  // if (LH === true) {
  //   data.sort((a, b) => {
  //     if (a.rating < b.rating) {
  //       return -1;
  //     }
  //     if (a.rating > b.rating) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }
  // else {
  //   data.sort((a, b) => {
  //     if (a.rating < b.rating) {
  //       return 1;
  //     }
  //     if (a.rating > b.rating) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  // }

  return data;
}




module.exports = {
  readData,
  writeData,
  findByName,
  findByFood,
  sortRating
};

//getAllData('user_reviews.csv').then((data) => console.log(data));
