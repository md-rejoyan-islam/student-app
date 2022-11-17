const dotenv = require("dotenv").config();
const twilio = require("twilio")(
  process.env.SMS_SID,
  process.env.SMS_AUTH_TOKEN
);
const twilioNumber = process.env.SMS_TWILIO_NUMBER;

const smsSEND = async(to,code) => {
  twilio.messages
    .create({
      from: twilioNumber,
      to: to,
      body: `Your verification code is ${code}`,
    })
    .then((res) => console.log("successfully send sms"))
    .catch((error) => console.log(error));
};

module.exports=smsSEND
