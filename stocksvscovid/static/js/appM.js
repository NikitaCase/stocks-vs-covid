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
    console.log(category.property("value"))

    buildplot_Categories()
    // var user_category = category.property("value")
    // var url = `"/${user_category}"`
    // if (user_category === "aviation") {
    //     buildplot_Categories(url),
    //         d3.json(url).then((data) => {
    //             var dates = data.aviation_stocks[0].Date.map(d => new Date(d))
    //             console.log(dates)
    //         })} 
    // else if (user_category === "entertainment") {  buildplot_entertainment() } 
    // else if (user_category === "technology") { buildplot_technology() } 
    // else { buildplot_telecommunication() }
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

// //========= PLOT FUNCTIONS
// function buildplot_Categories() {
    
//     // var dtdt = get_DateDictionary()
//     // console.log(dtdt)

//     //console.log(dtdt.end19)
//     plot_area.html("")
//     get_GC()
// }

//========= PLOT FUNCTION
function buildplot_Categories() {

    plot_area.html("")
    
    // Get Selected category
    var user_category = category.property("value")

    // Set url
    var url = `/${user_category}`

    var gc;
    console.log("IN GC")
    console.log(url)

    d3.json(url).then(function(data) {
        console.log("IN D3")

        // Set array data binding
        if ( user_category === "aviation" ) 
            { gc_route = data.aviation_stocks }
        else if ( user_category === "technology" )
            { gc_route = data.technology }
        else if ( user_category === "entertainment" )
            { gc_route = data.entertainment_stocks}
        else
            { gc_route = data.telecommunication_stocks}

        gc = get_DateRange(gc_route[0])
        console.log(gc)
        var trace_1 = get_Trace(gc,"00d775")
        console.log(trace_1)

        var recp = get_DateRange(gc_route[1])

        var trace_2 = get_Trace(recp,"0077df")

        var tracedata = [trace_1, trace_2];

        var layout = {
            title: `Telecommunication Stock`,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
        Plotly.newPlot("plot", tracedata, layout)

    })
}


//======== Get Prices
function get_Prices(gc,start_index,end_index) {

        var priceList = []
        for (let x = start_index; x < end_index; x++) {
            priceList.push(gc.Adj_Close[x])
            console.log("ADJ",gc.Adj_Close[x])
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
//========== PLOT DETAILS functions
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

//========== Dates FUNCTIONS
// Date Dictionary
function get_DateDictionary (){

    var user_date = get_Dates(date_selector.node().value,0)
    console.log("GETDATEDICT",user_date)
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


// Date conversions
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


// Date selector listener
date_selector.on("change",optionChanged());

// Category change listener
category.on("change", categoryChanged)
// Ticker Listener