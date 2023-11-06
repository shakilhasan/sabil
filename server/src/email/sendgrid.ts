import sgMail from "@sendgrid/mail";
import config from "config";
const SENDGRID_API_KEY = config.get<string>("SENDGRID_API_KEY");
sgMail.setApiKey(SENDGRID_API_KEY);
const msg = {
    to: "foyzulkarim@gmail.com", // Change to your recipient
    from: "info@bizbook365.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg).then(() => {
    console.log("Email sent");
}).catch((error) => {
    console.error(error);
});
