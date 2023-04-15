const fs = require('node:fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

function readData() {
	return new Promise((resolve, reject) => {
	  const results = [];
	  fs.createReadStream('data.csv')
		.pipe(csv())
		.on('data', (data) => results.push(data))
		.on('end', () => resolve(results))
		.on('error', reject);
	});
}

function writeData(data) {
  const csvWriter = createObjectCsvWriter({
    path: 'data.csv',
    header: [
      { id: 'name', title: 'name' },
      { id: 'rating', title: 'rating' },
      { id: 'review', title: 'review' },
    ],
  });
  return csvWriter.writeRecords(data);
}

async function getAllData() {
	const data = await readData();
	return data;
}

getAllData().then((data) => console.log(data));
