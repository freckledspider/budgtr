// -----------------------------------------------
// Import Dependencies
// -----------------------------------------------

require("dotenv").config() 
const express = require('express'); 
const budgets = require("./models/budget")
const morgan = require("morgan")
const methodOverride = require("method-override")


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
// Index Route
// -----------------------------------------------

// Make /budgets the index page
app.get("/", (req, res) => res.redirect("/budgets"))

// Return all budget data

app.get('/budgets/', (req, res) => {
    res.render(
        'index.ejs',
        {
            allBudgets:budgets
        }
    );
});

// -----------------------------------------------
// New Route
// -----------------------------------------------

app.get("/budgets/new", (req, res) => {
    res.render("new.ejs")
})


// -----------------------------------------------
// Create Route
// -----------------------------------------------

app.post("/budgets", (req, res) => {
    budgets.push(req.body)
    res.redirect("/budgets")
})


// -----------------------------------------------
// Show Route
// -----------------------------------------------

app.get('/budgets/:index', (req, res) => {
    res.render('show.ejs', {
        budget: budgets[req.params.index],
        i: req.params.index
    });
});

// -----------------------------------------------
// Server Listener
// -----------------------------------------------

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
