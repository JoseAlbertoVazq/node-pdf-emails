const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const htmlPdf = require('html-pdf');
const nodeMailer = require('nodemailer');
module.exports = {
    sendPdf(req, res) {
        const data = req.body;
        createPdf(data).then(() => res.sendStatus(200)).catch(() => res.sendStatus(500));
    }
}

let createPdf = (data) => {
    return new Promise((resolve, reject) => {
        const templateHtml = fs.readFileSync(path.join(process.cwd(), 'templates/pdf.html'), 'utf8');
        const template = handlebars.compile(templateHtml);
        const html = template(data);
        const options = { format: 'Letter' };
        htmlPdf.create(html, options).toFile('../pdf/report.pdf', (err, result) => {
            if (err) {
                reject();
            }
            sendEmail(result).then(() => resolve()).catch(() => reject());
        });
    });
}

let sendEmail = (pdf) => {
    return new Promise((resolve, reject) => {
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com', // you can change this if you are using other host
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'user@gmail.com',
                    pass: 'yourpassword'
                }
            });
            const mailOptions = {
                from: '“Homer J. Simpson” <homerjsimpson@springfield.com>', // sender address
                to: 'nedflanders@springfield.com', // list of receivers
                subject: 'Stupid Flanders!!', // Subject line
                text: 'D\'oh!', // plain text body
                html: '<b>I\'m in Moe\'s</b>', // html body
                attachments: [{
                    filename: 'report.pdf',
                    path: '../pdf/report.pdf',
                    contentType: 'application/pdf',
                    content: pdf
                }],
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    reject();
                }
                resolve();
            });
        });
}