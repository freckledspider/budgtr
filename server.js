// -----------------------------------------------
// Import Dependencies
// -----------------------------------------------

require("dotenv").config() // load variables from .env into process.env
const express = require('express'); // backend framework
const budget = require("./models/budget")
const morgan = require("morgan")
const methodOverride = require("method-override") // import method-override


// -----------------------------------------------
// Express app object
// -----------------------------------------------

const app = express();


// -----------------------------------------------
// Middleware
// -----------------------------------------------
app.use(express.urlencoded({extended: true}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static", express.static("public"))
app.use('/public', express.static('public'));

// -----------------------------------------------
// Routes
// -----------------------------------------------

app.get("/budgets:index", (req, res) => {
    res.render("show.ejs")
})

app.get("/budgets/new", (req, res) => {
    res.render("new.ejs")
})

// Return all budget data

app.get('/budgets', (req, res) => {
    res.render(
        'index.ejs',
        {
            allBudgets:budget
        }
    );
});


// -----------------------------------------------
// Server Listener
// -----------------------------------------------

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});