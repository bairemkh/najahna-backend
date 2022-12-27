//const fs = require('fs');
//const axios = require('axio');
//const FormData = require('form-data');
//const Mustache = require('mustache');
import fs from 'fs' 

const data = {
  invoiceNumber: "#12345"
}

const generation = {
	html: 'template.html',
};

const template = fs.readFileSync('./template.html', { encoding: 'utf8' });
const filledTemplate = Mustache.render(template, data);

const body = new FormData();
body.append('template.html', template, { filename: "template.html" });
body.append('template.html', filledTemplate, { filename: "template.html" });
body.append('generation', JSON.stringify(generation));

(async () => {
	const response = await axios.post('http://localhost:5000/process', body, {
		headers: body.getHeaders(),
		responseType: 'stream',
	});
	await response.data.pipe(fs.createWriteStream('invoice.pdf'));
})();