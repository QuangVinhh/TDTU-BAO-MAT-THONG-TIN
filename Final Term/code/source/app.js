const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
const PORT = 3000;

//----------|| view engine
const configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./");
}
configViewEngine(app)

//----------|| middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//----------|| crypt AES
const encryptAES = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey !== null) {
        api.encryptAES(text, secretkey);
        return res.redirect("/");
    }
    else {
        let database = await api.dataHome();
        return res.render("home.ejs", { database });
    }
}

const decryptAES = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey !== null) {
        api.decryptAES(text, secretkey);
        return res.redirect("/");
    }
    else {
        let database = await api.dataHome();
        return res.render("home.ejs", { database });
    }
}

//----------|| crypt Server A
const encryptServerA = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey !== null) {
        api.encryptServerA(text, secretkey);
        return res.redirect("/serverA");
    }
    else {
        let database = await api.dataServerA();
        return res.render("serverA.ejs", { database });
    }
}

const decryptServerA = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey !== null) {
        api.decryptServerA(text, secretkey);
        return res.redirect("/serverA");
    }
    else {
        let database = await api.dataServerA();
        return res.render("serverA.ejs", { database });
    }
}

//----------|| crypt Server B
const encryptServerB = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey !== null) {
        api.encryptServerB(text, secretkey);
        return res.redirect("/serverB");
    }
    else {
        let database = await api.dataServerB();
        return res.render("serverB.ejs", { database });
    }
}

const decryptServerB = async (req, res) => {

    let text = req.body.text;
    let secretkey = req.body.secretkey;

    if (secretkey !== null) {
        api.decryptServerB(text, secretkey);
        return res.redirect("/serverB");
    }
    else {
        let database = await api.dataServerB();
        return res.render("serverB.ejs", { database });
    }
}

//----------|| read page
const pageHome = async (req, res) => {

    let database = await api.dataHome();
    return res.render("home.ejs", { database });
}

const pageServerA = async (req, res) => {

    let database = await api.dataServerA();
    return res.render("serverA.ejs", { database });
}

const pageServerB = async (req, res) => {

    let database = await api.dataServerB();
    return res.render("serverB.ejs", { database });
}

//----------|| web routes
const router = express.Router();
const webRoutes = (app) => {

    router.get("/", pageHome);
    router.get("/serverA", pageServerA);
    router.get("/serverB", pageServerB);

    router.post("/encryptAES", encryptAES);
    router.post("/decryptAES", decryptAES);

    router.post("/encryptServerA", encryptServerA);
    router.post("/decryptServerA", decryptServerA);

    router.post("/encryptServerB", encryptServerB);
    router.post("/decryptServerB", decryptServerB);

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

//----------|| running sever
app.listen(PORT, () => {
    console.log(">>> Server is running in PORT : " + PORT);
})