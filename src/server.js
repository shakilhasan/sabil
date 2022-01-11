const app = require('./app');
const connectWithDb = require("./mongo");

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Contact List");
});

app.listen(port, () => {
    connectWithDb();

    console.log(`Server is running on port ${port}`);
});
