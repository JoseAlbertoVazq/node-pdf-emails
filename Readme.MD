# NodeJS emails with PDF attachments

Demo example using ExpressJS, Node-Mailer, Handlebars and http-pdf in order to send an email with a PDF file attached

## How does it works?

Run the following commands:

```bash
npm install

npm start
```
So this project will be running on port 3000.

Then you can send to http://localhost:3000/worker/pdf a POST request with this JSON body:

```json
{
    "name": "NAME",
    "lastName": "LASTNAME",
    "code": "CODE"
}
```

You can add new attributes if you modify the file templates/pdf.html customizing it on your own style.

