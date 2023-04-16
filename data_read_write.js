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
      console.log(data[i]);
      if (data[i].username == name) {
        reviews.append(data[i]);
      }
    }
    return reviews;
}

async function findByFood(food, file) {
    const data = await readData(file);
    let reviews = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].food_item === food) {
        reviews.append(data[i]);
      }
    }
    return reviews;
}

async function sortRating(food, file, LH) {
    const bsl = require('/sorting_algorithms/bubble');
    const data = await readData(file);
    
    let reviews = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].food_item === food) {
        reviews.append(data[i]);
      }
    }

    if(LH === true){
        reviews = bsl.bubbleSortLH(reviews);
    }
    else{
        reviews = bsl.bubbleSortHL(reviews);
    }

    return reviews;
}

module.exports = {
    readData,
    writeData,
    findByName,
    findByFood,
    sortRating
};

//getAllData('user_reviews.csv').then((data) => console.log(data));
