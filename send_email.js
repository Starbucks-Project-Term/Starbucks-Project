var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'starbucks.team.2018@gmail.com',
    pass: 'starbucks2018'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'starbucks.team.2018@gmail.com',
  subject: 'Test Sb',
  text: 'Success!'
};

var send_email = (options) => {
  transporter.sendMail(options, function(error, info){
  if (error) {
      console.log(error);
    } 
  else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports ={
  transporter,
  mailOptions,
  send_email
};

