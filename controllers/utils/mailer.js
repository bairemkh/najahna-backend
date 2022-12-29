import mailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path";
export async function verificationMail(req,user){
    var from = "Najahni team"
    var to = user.email
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
            email: user.email,
            username: user.firstname + " " +user.lastname,
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

export async function otpMail(user){
  var from = "Najahni team"
  var to = user.email
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
          otp: user.otp,
          username: user.firstname + " " + user.lastname
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

export async function certifsend(req,user,course,filename){
  var from = "Najahni team"
  var to = user.email
  var subject = "Certificate"
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
      template: 'certif',
      context: {
        host: req.get('host'),
          user: user,
          course: course.title
          //email: email,
      } ,
      attachments : [
        {
          filename: filename,
          path: "./public/files/"+filename
        }
      ]     
    };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error)
      } else {
          console.log("Email Sent: " + info.response)
      }
  })
}