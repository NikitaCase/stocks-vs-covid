// Create a Line plot with Plotly

// Select page sections
var date_selector = d3.select("#selDateset")
var plot_area = d3.select("#plot")
var headline = d3.select("#news_headline")
var bar_area = d3.select("#bar-graph")
var category = d3.select("#selTable")

// Initialization function for index page
function init() {
    d3.json("/dates").then((data) => {
        // Pull data from news date table
        var Dates = data.Story[0].Date
        var News = data.Story[0].News

        //Populate Dates selector section
        Dates.forEach((date) => {
            date_selector.append("option")
                .text(date)
                .property("value",date);
        })
    });
};

// Initialize the page
init();

// Selectors on Change event listeners
function optionChanged() {
    console.log('Option Changed');
}

// Date selector listener
date_selector.on("change",optionChanged());
// Category listener
//
// Ticker Listener


// PLOT FUNCTIONS