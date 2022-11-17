const nodeMailer = require("nodemailer");
const dotenv = require("dotenv").config();
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

//create transport
const verifyAccountMail = async (to, subject, data) => {
  const transport = nodeMailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: user,
      pass: pass,
    },
  });

  //create a mail
  await transport.sendMail({
    from: `"Account Verify" ${user}`,
    to: to,
    subject: subject,
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email template</title>
    <style>
        .main-wrapper{
            background-color: #e9e9e9;  
            padding: 30px 0px;  
            font-size:18px;
        }
      .header img {
        width: 150px;
        margin-left: 30px;
      }
      .body{
        width: 80%;
        margin: auto;
        font-family: Arial, Helvetica, sans-serif;

      }
      .wrapper{
        width: 70%;
        margin: auto;
        padding: 5px 0px 20px 0px;
        background-color: white;
        border-radius: 5px;
      }
      .body a {
        text-decoration: none;
        background-color: rgb(72, 158, 238);
        text-align: center;
        color: #fff;

      }
    </style>
  </head>
  <body>
      <div class="main-wrapper">
        <div class="wrapper">
          <div class="header">
          <img src="https://w7.pngwing.com/pngs/15/560/png-transparent-verified-badge-symbol-computer-icons-twitter-discord-flat-icon-blue-text-logo-thumbnail.png" alt="">
          <hr>
        </div>
        <div class="body">
          <h3>Hi ${data.name},</h3>
          <p>To Active your student Account, please verify your email address.
            <br>
            Your account will not be created until your email address is confirmed.
          </p>
          <br>
          <div style="text-align:center;">
          <a href="https://showstudent.herokuapp.com/students/verify/${data.token}" style="background-color:rgb(245, 20, 20);padding:10px 20px;border-radius: 5px;">Verify Your Email</a></div> 
          <br>
          <p>Or, copy and paste the following URL into your browser:</p>
          <p><a href="" style="background-color:white;color: rgb(23, 92, 231);text-decoration:underline;">https://showstudent.herokuapp.com/students/verify/${data.token}</a></p>
        </div>
        </div>
      </div>
  </body>
</html>

    `,
  });
};

//export mail function
module.exports = verifyAccountMail;
