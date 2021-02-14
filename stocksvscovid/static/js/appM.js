// Create a Line plot with Plotly

// Select page sections
var date_selector = d3.select("#selDateset")
var plot_area = d3.select("#plot")
var headline = d3.select("#news-headline")
var news = d3.select("#news-text")
var bar_area = d3.select("#bar-graph")
var category = d3.select("#selTable")

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



// load Dates Function
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

// load News Function
//missing--->> Should load the first news on the page initialization
function load_News(){
    var user_date = date_selector.node().value;

    console.log("NEWS DATE",user_date)

    headline.html("")
    headline.append("h3")
        .text(`Headline for ${user_date.slice(0, -13)}`)

    news.html("")
    d3.json("/dates").then((data) => {
        console.log(data)
        var dates = data.Story[0]['Date']
        var ind = dates.indexOf(user_date)
        //m---> Setindex 0 to load at initialization
        var blurb = data.Story[0]['News'][ind]
        news.append("p").text(blurb)
    });
}
// PLOT FUNCTIONS






// Initialize the page
init();

// Selectors on Change event listeners
function optionChanged() {
    console.log('Option Changed');
    load_Dates();
    load_News();
    //call plot functions
}

// Date selector listener
//date_selector.on("change",optionChanged());
// Category listener
//category.on("change",optionChanged());
// Ticker Listener