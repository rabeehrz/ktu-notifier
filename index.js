const axios = require("axios");
const cheerio = require("cheerio");

// TWILIO CONFIGURATION
const accountSID = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const fromPhoneNumber = "FROM_PHONE_NUMBER"; // This is your Twilio Number
const toPhoneNumber = "TO_PHONE_NUMBER";

const client = require("twilio")(accountSID, authToken);

// APP CONFIGURATION
const TIME_INTERVAL = 1000 * 30; // Interval between checking for updates in milliseconds
const REQUEST_URL = "https://ktu.edu.in/home.htm"; // KTU home page link

const getTop = async () => {
  return new Promise(resolve => {
    axios
      .get(REQUEST_URL)
      .then(async res => {
        const $ = cheerio.load(res.data);
        const top = $($(".annuncement li")[0]).text();
        resolve(top);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const start = async () => {
  var oldAnnouncement = await getTop();

  const checkUpdate = async () => {
    const newAnnouncement = await getTop();
    if (oldAnnouncement != newAnnouncement) {
      console.log("Update has occured. New annoucement = " + newAnnouncement);

      // Comment if you do not want to use Twilio
      client.messages
        .create({
          body: "KTU NOTIFIER UPDATE: " + newAnnouncement,
          from: fromPhoneNumber,
          to: toPhoneNumber
        })
        .then(message => console.log("Message Sent: " + message.sid));
      // till here
      oldAnnouncement = newAnnouncement;
    } else {
      console.log("No updates.");
    }
  };

  setInterval(checkUpdate, TIME_INTERVAL);
};

start();
