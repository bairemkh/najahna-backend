import mailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path";
export async function verificationMail(req,email){
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
    const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve('./templates/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./templates/'),
        extName: ".handlebars",
      }
    transporter.use('compile', hbs(handlebarOptions));
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        template: 'verifMail',
        context: {
            host: req.get('host'),
            email: email,
        }      
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
    })
}

export async function otpMail(email,username,otp){
  var from = "Najahni team"
  var to = email
  var subject = "Forget password"
 // var message = req.body.message

  var transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
  })
  const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./templates/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./templates/'),
      extName: ".handlebars",
    }
  transporter.use('compile', hbs(handlebarOptions));
  var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      template: 'otp',
      context: {
          otp: otp,
          name: username
          //email: email,
      }      
    };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error)
      } else {
          console.log("Email Sent: " + info.response)
      }
  })
}