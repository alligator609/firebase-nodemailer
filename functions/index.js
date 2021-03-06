const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mail@gmail.com',
        pass: 'password'
    }
});

// let transporter = nodemailer.createTransport({
//     host: "mail.smtp.com",
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: "mail@smtp.com",
//         pass: "password"
//     },
//     tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false
//       }
//   });


exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Your Account Name <yourgmailaccount@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'I\'M A PICKLE!!!', // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://imgd.aeplcdn.com/476x268/n/cw/ec/38904/mt-15-front-view.jpeg?q=80" />
            ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro,info) => {
            if(erro){
                console.log(erro);
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});
