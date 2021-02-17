// Create a Line plot with Plotly

// Select page sections
var date_selector = d3.select("#selDateset")
var plot_area = d3.select("#plot")
var headline = d3.select("#news-headline")
var news_section = d3.select("#news-text")
var bar_area = d3.select("#bar-graph")
var category = d3.select("#selCategory")
var user_date = date_selector.node().value

// Initialization function for index page
function init() {
    // load Dates
    load_Dates();
    // load News
    load_News();
    // load Categories

        // Bring up first news
        //load_News(date_selector.node().value);
        //load_News(select.node().value);
};

// DATES CHANGED
function optionChanged() {
    load_News();
    categoryChanged();

}

// CATEGORY CHANGED
function categoryChanged() {
    console.log("CategoryChanged")
    console.log(date_selector.node().value)
    var user_category = category.property("value")
    var url = `"/${user_category}"`
    if (user_category === "aviation") {
        buildplot_aviation(),
            d3.json(url).then((data) => {
                var dates = data.aviation_stocks[0].Date.map(d => new Date(d))
                console.log(dates)
            })} 
    // else if (user_category === "entertainment") {  buildplot_entertainment() } 
    // else if (user_category === "technology") { buildplot_technology() } 
    // else { buildplot_telecommunication() }
}


// LOAD Dates Function
function load_Dates(){
    d3.json("/dates").then((data) => {
        // Pull data from news date table
        var Dates = data.Story[0].Date

        // Populate Dates selector section
        Dates.forEach((date) => {
            var date = date
            date_selector.append("option")
                .text(date.slice(0, -13))
                .property("value",date);
            console.log("ASD")
        });
    });

    console.log("DATES: ",date_selector.node().value);
}

// LOAD News Function
//missing--->> Should load the first news on the page initialization
function load_News(){
    var user_date = date_selector.node().value;

    console.log("NEWS DATE",user_date)

    headline.html("")
    headline.append("h3")
        .text(`Headline for ${user_date.slice(0, -13)}`)

    news_section.html("")
    d3.json("/dates").then((data) => {
        console.log(data)
        var dates = data.Story[0]['Date']
        var ind = dates.indexOf(user_date)
        //m---> Setindex 0 to load at initialization
        var blurb = data.Story[0]['News'][ind]
        news_section.append("p").text(blurb)
    });
}

//========= PLOT FUNCTIONS
function buildplot_aviation() {
    
    var user_date = get_Dates(date_selector.node().value,0)
    console.log("Buildplot_aviation",user_date)
    var start_date = get_Dates(user_date,1)
    console.log("Start Date", start_date)
    var end_date = get_Dates(user_date,-1)
    console.log("End Date", end_date)
}


//========== Dates FUNCTIONS
function get_Dates(dateV,time) {
    // Convert default date
    if (time === 0) { return new Date(dateV) }
    // Get start date
    else if (time === 1) 
        { return new Date(dateV - (45 * 25 * 60 * 60 *1000) ) }
    // Get end date
    else if (time === -1) 
        { return new Date(dateV - (-45 * 25 * 60 * 60 *1000) ) }
    console.log("getDate")
    console.log(new Date(dateV)) 
}

// function which hopefuly returns array of dates 
function arrayToDates(arr) {
    var date_list = []
    for (var n = 0; n < arr.length; n++) {
        var dt = new Date(arr[n])
            // console.log(dt)
        date_list.push(dt)
    }
    return date_list
}

// Initialize the page
init();


// Date selector listener
date_selector.on("change",optionChanged());

// Category change listener
category.on("change", categoryChanged)
// Ticker Listener