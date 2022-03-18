const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
const PORT = 8080;

//----------|| view engine
const configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./");
}
configViewEngine(app)

//----------|| middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//----------|| cryptTextAES
const textAES = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey == "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3") {
        api.cryptTextAES(text, secretkey);
        return res.redirect("/");
    }
    else {
        let resultAES = await api.readDatabase();
        let error = "The Secret Key is invalid !!!";
        return res.render("home.ejs", { errorMessage: error, resultAES });
    }
}

//----------|| cryptTextAES
const fileAES = async (req, res) => {

    let file = req.body.file;
    let secretkey = req.body.secretkey;

    if (secretkey == "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3") {
        api.cryptFileAES(file, secretkey);
        return res.redirect("/");
    }
    else {
        let resultAES = await api.readDatabase();
        let error = "The Secret Key is invalid !!!";
        return res.render("home.ejs", { errorMessage: error, resultAES });
    }
}

//----------|| read database
const readAES = async (req, res) => {

    let resultAES = await api.readDatabase();
    return res.render("home.ejs", { resultAES });
}


//----------|| web routes
const router = express.Router();
const webRoutes = (app) => {

    router.get("/", readAES);
    router.post("/textAES", textAES);
    router.post("/fileAES", fileAES);
    return app.use("/", router);
}
webRoutes(app)

//----------|| custom 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.send('404 - Not Found')
})

//----------|| custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.send('500 - Server Error')
})

//----------|| running
app.listen(PORT, () => {
    console.log(">>> Server is running in PORT : " + PORT);
})