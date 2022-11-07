import mailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path";
export function verificationMail(receiver){
    var from = "Najahni team"
    var to = receiver
    var subject = "Let's verify your account"
    var message = req.body.message

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
    })
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./utils/templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./utils/templates/'),
    };


    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
        html:"./templates/verifMail.html"
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
    })
}