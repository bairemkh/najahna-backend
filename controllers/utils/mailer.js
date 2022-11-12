import mailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path";
export async function verificationMail(email,otp){
    var from = "Najahni team"
    var to = email
    var subject = "Let's verify your account"
   // var message = req.body.message

    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
    })
   /* const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./utils/templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./utils/templates/'),
    };*/


    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
        html:
        "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : blue'>" + otp + "</b></p>",
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
    })
}