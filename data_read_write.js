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
    const fs = require('fs');
    const csv = require('csv-parser');
    const csvWriter = createObjectCsvWriter({
        path: out_file,
        header: [
            { id: 'username', title: 'username' },
            { id: 'food_item', title: 'food_item' },
            { id: 'rating', title: 'rating' },
            { id: 'review', title: 'review' },
        ],
    });
    return csvWriter.writeRecords(data);
}

async function getAllData(in_file) {
    const data = await readData(in_file);
    return data;
}

module.exports = {
    readData,
    writeData
};

getAllData().then((data) => console.log(data));
