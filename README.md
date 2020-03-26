# KTU Notifier

A simple node script that notifies you when there is a new announcement from KTU. Data is obtained by scraping and notification is sent using Twilio.

# Instruction for use

``` 
git clone https://github.com/rabeehrz/ktu-notifier.git
cd ktu-notifier
npm install
```

Change the following settings:

```
// TWILIO CONFIGURATION
const accountSID = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const fromPhoneNumber = "FROM_PHONE_NUMBER";
const toPhoneNumber = "TO_PHONE_NUMBER";
```

```
npm start
```

Keep the terminal running. The script will check for updates every 30 sec.

To change the interval, modify `TIME_INTERVAL` setting.

**This was tested using localhost. Live test is going on.**
