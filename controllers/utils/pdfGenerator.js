//const fs = require('fs');
//const axios = require('axio');
//const FormData = require('form-data');
//const Mustache = require('mustache');
import pdf from 'pdf-creator-node'
import fs from 'fs' 
import { certifsend } from './mailer.js';
import { qrCodeGen } from './qrCodeGenerator.js';

export function pdfconvertFunction(req,user,course) {
	var html = fs.readFileSync("views/certif.html","utf-8");

var options = {
	format: "A4",
	orientation: "landscape",
	border: "10mm",
};
var name = user.firstname + " " +user.lastname;
var coursename = course.title;
var delivered = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') ;
var filename = "CERTIF_" + Date.now()+".pdf"
//var fileqr = "http://192.168.1.15:9090/img/QRCODE_CERTIF_" + Date.now() + ".png"
var fileqr ="http://" + req.get('host') +"/img/QRCODE_CERTIF_" + Date.now() + ".png"
var document = {
	html: html,
	data:{
		name: name,
		coursename: coursename,
		delivered: delivered,
		fileqr: fileqr
	},
	path: "./public/files/"+filename,
	type: "",
  };

  qrCodeGen(req,filename)
  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
	
	certifsend(req,user,course,filename)
  })
  .catch((error) => {
    console.error(error);
  });

}


/*const data = {
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
})();*/