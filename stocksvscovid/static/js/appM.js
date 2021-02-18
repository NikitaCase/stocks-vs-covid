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
};

// DATES CHANGED
function optionChanged() {
    load_News();
    categoryChanged();
}

// CATEGORY CHANGED
function categoryChanged() {
    console.log("CategoryChanged")
    console.log(category.property("value"))

    buildplot_Categories()
}

// LOAD Dates Function
function load_Dates(){
    var url = "/"+"dates"
    d3.json(url).then((data) => {
        // Pull data from news date table
        var Dates = data.Story[0].Date

        // Populate Dates selector section
        Dates.forEach((date) => {
            var date = date
            date_selector.append("option")
                .text(date.slice(0, -13))
                .property("value",date);
        });
    });
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
        var dates = data.Story[0]['Date']
        var ind = dates.indexOf(user_date)
        var blurb = data.Story[0]['News'][ind]
        news_section.append("p").text(blurb)
    });
}

//========= PLOT FUNCTION
function buildplot_Categories() {

    plot_area.html("")
    
    // Get Selected category
    var user_category = category.property("value")

    // Set url
    var url = `/${user_category}`

    d3.json(url).then(function(data) {

        // Set array data binding
        if ( user_category === "aviation" ) 
            { gc_route = data.aviation_stocks }
        else if ( user_category === "technology" )
            { gc_route = data.technology }
        else if ( user_category === "entertainment" )
            { gc_route = data.entertainment_stocks}
        else
            { gc_route = data.telecommunication_stocks}

        var gc = get_DateRange(gc_route[0])
        var trace_1 = get_Trace(gc,"00d775")
        
        var recp = get_DateRange(gc_route[1])
        var trace_2 = get_Trace(recp,"0077df")

        var tracedata = [trace_1, trace_2];

        var layout = get_Layout(user_category)
        
        Plotly.newPlot("plot", tracedata, layout)

    })
}


//========================//
//======== Price Related Functions
function get_Prices(gc,start_index,end_index) {

        var priceList = []
        for (let x = start_index; x < end_index; x++) {
            priceList.push(gc.Adj_Close[x])
        }
        var pricesDict = {
            "priceList" : priceList,
            "priceAvg" : avg(priceList)
        }
        return pricesDict
}
// Calculates average close prices
function avg(arr) {
    var sum = 0
    for (var n = 0; n < arr.length; n++) {
        var price = arr[n]
        sum += price
    }
    var average_price = sum / arr.length
    return average_price
}

//===========================//
//========== PLOT Related Functions
// GET TITLE
function get_Title(Title) {
    return Title.charAt(0).toUpperCase() + Title.slice(1) +" Stock";
}
// GET TRACES
function get_Trace(gc,colorCode) {
            var trace= {
            type: "scatter",
            mode: "line",
            name: gc.ticker,
            x: gc.date_range,
            y: gc.priceList,
            line: {
                color: colorCode
            }
        };
    return trace
}
// GET LAYOUT
function get_Layout(Title) {
        var layout = {
            title: get_Title(Title),
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        }
    return layout
}

//=============================//
//========== Date Related FUNCTIONS
// Date Dictionary
function get_DateDictionary (){

    var user_date = get_Dates(date_selector.node().value,0)
    var start_date = get_Dates(user_date,1)
    var end_date = get_Dates(user_date,-1)
    var end19 = get_Dates(end_date,365)
    var start19 = get_Dates(start_date,365)


    var datesDict = {
        "user_date" : user_date,
        "start_date" : start_date,
        "end_date" : end_date,
        "end19" : end19,
        "start19" : start19
    }
    return datesDict;
}

// GET DATE RANGE
function get_DateRange(gc) {

    // Get Dates dictionary
    var dateDict = get_DateDictionary()
    var ticker = gc.Ticker
    var dates_gc = arrayToDates(gc.Date)
    var date_range_gc = dates_gc.filter(dt => (dt >= dateDict.start_date) && (dt <= dateDict.end_date))

    var start_index = dates_gc.indexOf(date_range_gc[0])
    var end_index = dates_gc.indexOf(date_range_gc[date_range_gc.length - 1])
    

    var pricesDict = get_Prices(gc,start_index,end_index)

    dateRangeDict = {
        "ticker": ticker,
        "dates": dates_gc,
        "date_range": date_range_gc,
        "start_index": start_index,
        "end_index": end_index,
        "priceAvg": pricesDict.pricesAvg,
        "priceList":pricesDict.priceList
    }
    return dateRangeDict
}

/**
 * Convert strings to new Date format
 * @param {string} dateV, 
 * @param {number} time {{date type -1,0,1,365}}
 * @return {Date} 
 * */ 
function get_Dates(dateV,time) {

    // Convert default date
    if (time === 0) { return new Date(dateV) }
    // Get start date
    else if (time === 1) 
        { return new Date(dateV - (45 * 25 * 60 * 60 *1000) ) }
    // Get end date
    else if (time === -1) 
        { return new Date(dateV - (-45 * 25 * 60 * 60 *1000) ) }

    // Get 365 Conversion
    else if (time === 365) 
        { return new Date(dateV - (365 * 86400000) ) }

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

//====================//
//======Event Listeners
// Date selector listener
date_selector.on("change",optionChanged());

// Category change listener
category.on("change", categoryChanged)
// Ticker Listener