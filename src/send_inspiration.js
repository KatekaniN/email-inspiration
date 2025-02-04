const quotesData = require("./quotes.json");
const createTransporter = require("./config");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../smtp_secrets.sh"),
});

function sendEmail(quote, email) { 
  const transporter = createTransporter(); //create a transporter object 
  const mailOptions = { //create a mail object 
    from: process.env.SMTP_LOGIN,
    to: email,
    subject: "Your Inspirational Quote Of The Day",
    text: quote,
  };

  return transporter.sendMail(mailOptions);
}

function getRandomQuote() { //function to get a random quote from the quotes.json file
  const quotes = quotesData.quotes;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  return `"${selectedQuote.quote}" - ${selectedQuote.author}`;
}

async function sendInspirationalQuote(recipientEmail) { //function to send an email with a random quote to the recipient
  if (!recipientEmail) {
    throw new Error("Your email address is required.");
  } else if (
    !recipientEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    throw new Error("Please provide a valid email address.");
  }

  try {
    const quote = getRandomQuote(); 
    await sendEmail(quote, recipientEmail); // send the email
    console.log(`Inspirational quote sent to ${recipientEmail}`);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
}

if (require.main === module) {  
  const recipientEmail = process.argv[2]; // get the email address from the command line at the 2nd index
  sendInspirationalQuote(recipientEmail); 
}

module.exports = { getRandomQuote, sendInspirationalQuote };
