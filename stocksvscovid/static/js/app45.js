// Create a Line plot with Ploty using data from app.py

// Selecting page areas
var plot_area = d3.select("#plot")
var selector = d3.select("#selDateset");
var headline = d3.select("#news-headline")
var news = d3.select("#news-text")
var bar_area = d3.select("#bar-graph")
var category = d3.select("#selTable")
var user_date = selector.node().value

// Populates drop down menu with dates from global news page
function init() {
    d3.json("/dates").then((data) => {
        var Dates = data.Story[0].Date
        var News = data.Story[0].News
        Dates.forEach((date) => {
            selector.append("option")
                .text(date)
                .property("value", date);
        })
    });

};

// updates headline and news story sections when date selected
function optionChanged() {

    let user_date = selector.node().value

    headline.html("")
    headline.append("h3")
        .text(`Headline for ${user_date}`)

    news.html("")
    d3.json("/dates").then((data) => {
        var dates = data.Story[0]['Date']
        var ind = dates.indexOf(user_date)
        var blurb = data.Story[0]['News'][ind]
        news.append("p")
            .text(blurb)
    })

    changeCategory()
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

// Creates Traces
function get_traces(ticker, date, adj_Close) {
    var trace = {
        type: "scatter",
        mode: "line",
        name: ticker,
        x: date,
        y: adj_Close,
        line: {
            color: "0077df"
        }
    };
    return trace;
}


// builds entertainment plot 
function buildplot_entertainment() {
    var user_date = selector.node().value
    var dtdt = new Date(user_date)
    var end_date = new Date(dtdt - (-45 * 24 * 60 * 60 * 1000))
    var start_date = new Date(dtdt - (45 * 24 * 60 * 60 * 1000))


    plot_area.html("")
    d3.json("/entertainment").then(function(data) {

        // GC variables
        var gc = data.entertainment_stocks[0]
        var dates_gc = arrayToDates(gc.Date)
        var date_range_gc = dates_gc.filter(dt => (dt >= start_date) && (dt <= end_date))

        var start_index = dates_gc.indexOf(date_range_gc[0])
        var end_index = dates_gc.indexOf(date_range_gc[date_range_gc.length - 1])

        var prices_gc = []
        for (var x = start_index; x < end_index; x++) {
            prices_gc.push(gc.Adj_Close[x])
        }

        // recp variables
        var recp = data.entertainment_stocks[1]
        var dates_recp = arrayToDates(recp.Date)
        var date_range_recp = dates_recp.filter(dt => (dt >= start_date) && (dt <= end_date))

        var prices_recp = []
        for (var x = start_index; x < end_index; x++) {
            prices_recp.push(recp.Adj_Close[x])
        }


        // cgx variables
        var cgx = data.entertainment_stocks[2]
        var dates_cgx = arrayToDates(cgx.Date)
        var date_range_cgx = dates_cgx.filter(dt => (dt >= start_date) && (dt <= end_date))

        console.log(date_range_cgx)

        var prices_cgx = []
        for (var x = start_index; x < end_index; x++) {
            prices_cgx.push(cgx.Adj_Close[x])
        }


        var trace_1 = {
            type: "scatter",
            mode: "line",
            name: gc.Ticker,
            x: date_range_gc,
            y: prices_gc,
            line: {
                color: '00d775'
            }
        };

        var trace_2 = {
            type: "scatter",
            mode: "line",
            name: recp.Ticker,
            x: date_range_recp,
            y: prices_recp,
            line: {
                color: "0077df"
            }
        };
        var trace_3 = {
            type: "scatter",
            mode: "line",
            name: cgx.Ticker,
            x: date_range_cgx,
            y: prices_cgx,
            line: {
                color: "7f6dcc"
            }
        };

        var tracedata = [trace_1, trace_2, trace_3];

        var layout = {
            title: `Entertainment Stock`,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
        Plotly.newPlot("plot", tracedata, layout)
    });
};


// Create a Line plot with Ploty using data from app.py
function buildplot_technology() {
    var user_date = selector.node().value
    var dtdt = new Date(user_date)
    var end_date = new Date(dtdt - (-45 * 24 * 60 * 60 * 1000))
    var start_date = new Date(dtdt - (45 * 24 * 60 * 60 * 1000))

    plot_area.html("")
    var user_date = selector.node().value

    d3.json("/technology").then(function(data) {


        // GC variables
        var gc = data.technology[0]
        var dates_gc = arrayToDates(gc.Date)
        var date_range_gc = dates_gc.filter(dt => (dt >= start_date) && (dt <= end_date))

        var start_index = dates_gc.indexOf(date_range_gc[0])
        var end_index = dates_gc.indexOf(date_range_gc[date_range_gc.length - 1])

        var prices_gc = []
        for (var x = start_index; x < end_index; x++) {
            prices_gc.push(gc.Adj_Close[x])
        }

        // recp variables
        var recp = data.technology[1]
        var dates_recp = arrayToDates(recp.Date)
        var date_range_recp = dates_recp.filter(dt => (dt >= start_date) && (dt <= end_date))

        var prices_recp = []
        for (var x = start_index; x < end_index; x++) {
            prices_recp.push(recp.Adj_Close[x])
        }

        var trace_1 = {
            type: "scatter",
            mode: "line",
            name: gc.Ticker,
            x: date_range_gc,
            y: prices_gc,
            line: {
                color: '00d775'
            }
        };

        var trace_2 = {
            type: "scatter",
            mode: "line",
            name: recp.Ticker,
            x: date_range_recp,
            y: prices_recp,
            line: {
                color: "0077df"
            }
        };

        var tracedata = [trace_1, trace_2];

        var layout = get_layout("Technology Stock")

        Plotly.newPlot("plot", tracedata, layout)
    });
};


// Create a Line plot with Ploty using data from app.py
// function buildplot_technology() {
//     plot_area.html("")
//     d3.json("/technology").then(function(data1) {
//         var ticker3 = data1.technology[0].Ticker;
//         var adj_Close3 = data1.technology[0].Adj_Close;
//         var date3 = data1.technology[0].Date
//         var ticker4 = data1.technology[1].Ticker;
//         var adj_Close4 = data1.technology[1].Adj_Close;
//         var date4 = data1.technology[1].Date

//         var trace3 = {
//             type: "scatter",
//             mode: "line",
//             name: ticker3,
//             x: date3,
//             y: adj_Close3,
//             line: {
//                 color: '00d775'
//             }
//         };

//         var trace4 = {
//             type: "scatter",
//             mode: "line",
//             name: ticker4,
//             x: date4,
//             y: adj_Close4,
//             line: {
//                 color: "0077df"
//             }
//         };

//         var tracedata_technology = [trace3, trace4];

//         var layout = {
//             title: `Technology Stock`,
//             paper_bgcolor: '002e50',
//             plot_bgcolor: '002e50',
//             yaxis: {
//                 title: 'Stock Price (in CAD $)'
//             }
//         };
//         Plotly.newPlot("plot", tracedata_technology, layout)
//     });
// };

// Create a Line plot with Ploty using data from app.py
// function buildplot_aviation() {
//     plot_area.html("")
//     var user_date = selector.node().value

//     d3.json("/aviation").then(function(data2) {



//         var date_range_ac, price_range_ac = getDateRange(data2.aviation_stocks[0], user_date)
//         var date_range_bbd, price_range_bbd = getDateRange(data2.aviation_stocks[1], user_date)
//         console.log(date_range_ac)
//         console.log(date_range_bbd)
//         console.log(price_range_ac)
//         console.log(price_range_bbd)


//         // var ticker5 = data2.aviation_stocks[0].Ticker;
//         // var adj_Close5 = data2.aviation_stocks[0].Adj_Close;
//         // var date5 = data2.aviation_stocks[0].Date
//         // var ticker6 = data2.aviation_stocks[1].Ticker;
//         // var adj_Close6 = data2.aviation_stocks[1].Adj_Close;
//         // var date6 = data2.aviation_stocks[1].Date

//         // var trace5 = {
//         //     type: "scatter",
//         //     mode: "line",
//         //     name: ticker5,
//         //     x: date5,
//         //     y: adj_Close5,
//         //     line: {
//         //         color: '00d775'
//         //     }
//         // };

//         // var trace6 = {
//         //     type: "scatter",
//         //     mode: "line",
//         //     name: ticker6,
//         //     x: date6,
//         //     y: adj_Close6,
//         //     line: {
//         //         color: "0077df"
//         //     }
//         // };

//         // var tracedata_aviation = [trace5, trace6];

//         // var layout = {
//         //     title: `Aviation Stock`,
//         //     paper_bgcolor: '002e50',
//         //     plot_bgcolor: '002e50',
//         //     yaxis: {
//         //         title: 'Stock Price (in CAD $)'
//         //     }
//         // };
//         // Plotly.newPlot("plot", tracedata_aviation, layout)
//     });
// };


// Create a Line plot with Ploty using data from app.py
function buildplot_telecommunication() {
    var user_date = selector.node().value
    var dtdt = new Date(user_date)
    var end_date = new Date(dtdt - (-45 * 24 * 60 * 60 * 1000))
    var start_date = new Date(dtdt - (45 * 24 * 60 * 60 * 1000))

    plot_area.html("")
    d3.json("/telecommunication").then(function(data) {

        // GC variables
        var gc = data.telecommunication_stocks[0]
        var dates_gc = arrayToDates(gc.Date)
        var date_range_gc = dates_gc.filter(dt => (dt >= start_date) && (dt <= end_date))

        var start_index = dates_gc.indexOf(date_range_gc[0])
        var end_index = dates_gc.indexOf(date_range_gc[date_range_gc.length - 1])

        var prices_gc = []
        for (var x = start_index; x < end_index; x++) {
            prices_gc.push(gc.Adj_Close[x])
        }

        // recp variables
        var recp = data.telecommunication_stocks[1]
        var dates_recp = arrayToDates(recp.Date)
        var date_range_recp = dates_recp.filter(dt => (dt >= start_date) && (dt <= end_date))

        var prices_recp = []
        for (var x = start_index; x < end_index; x++) {
            prices_recp.push(recp.Adj_Close[x])
        }

        var trace_1 = {
            type: "scatter",
            mode: "line",
            name: gc.Ticker,
            x: date_range_gc,
            y: prices_gc,
            line: {
                color: '00d775'
            }
        };

        var trace_2 = {
            type: "scatter",
            mode: "line",
            name: recp.Ticker,
            x: date_range_recp,
            y: prices_recp,
            line: {
                color: "0077df"
            }
        };

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
    });
};


// Create a Line plot with Ploty using data from app.py
function buildplot_aviation() {

    var user_date = selector.node().value
    var dtdt = new Date(user_date)
    var end_date = new Date(dtdt - (-45 * 24 * 60 * 60 * 1000))
    var start_date = new Date(dtdt - (45 * 24 * 60 * 60 * 1000))

    plot_area.html("")
    d3.json("/aviation").then(function(data) {

        // GC variables
        var gc = data.aviation_stocks[0]
        var dates_gc = arrayToDates(gc.Date)
        var date_range_gc = dates_gc.filter(dt => (dt >= start_date) && (dt <= end_date))

        var start_index = dates_gc.indexOf(date_range_gc[0])
        var end_index = dates_gc.indexOf(date_range_gc[date_range_gc.length - 1])

        var prices_gc = []
        for (var x = start_index; x < end_index; x++) {
            prices_gc.push(gc.Adj_Close[x])
        }

        // recp variables
        var recp = data.aviation_stocks[1]
        var dates_recp = arrayToDates(recp.Date)
        var date_range_recp = dates_recp.filter(dt => (dt >= start_date) && (dt <= end_date))

        var prices_recp = []
        for (var x = start_index; x < end_index; x++) {
            prices_recp.push(recp.Adj_Close[x])
        }

        var trace_1 = {
            type: "scatter",
            mode: "line",
            name: gc.Ticker,
            x: date_range_gc,
            y: prices_gc,
            line: {
                color: '00d775'
            }
        };

        var trace_2 = {
            type: "scatter",
            mode: "line",
            name: recp.Ticker,
            x: date_range_recp,
            y: prices_recp,
            line: {
                color: "0077df"
            }
        };

        var tracedata = [trace_1, trace_2];


        var layout = {
            title: `Aviation Stock`,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
        Plotly.newPlot("plot", tracedata, layout)
    });
};

// creates layout portion of plotly graph 
function get_layout(title) {
    var layout = {
        title: title,
        paper_bgcolor: '002e50',
        plot_bgcolor: '002e50',
        yaxis: {
            title: 'Stock Price (in CAD $)'
        }
    };

    return layout
}


// Load initial functions
init();

// plot initial graph
buildplot_aviation();

// Load ticker selection section
load_Tickers();

// Listener for category change
category.on("change", changeCategory)

function changeCategory() {
    var user_category = category.property("value")
    var url = `"/${user_category}"`
    if (user_category === "aviation") {
        buildplot_aviation(),
            d3.json(url).then((data) => {
                var dates = data.aviation_stocks[0].Date.map(d => new Date(d))
                console.log(dates)
            })
    } else if (user_category === "entertainment") { buildplot_entertainment() } else if (user_category === "technology") { buildplot_technology() } else { buildplot_telecommunication() }
}


var tickerSelector = d3.select("#selTicker");

function load_Tickers() {
    tickerlist = [{
                name: "Enbridge",
                symbol: "ENB.TO"
            },
            {
                name: "Canadian Tire",
                symbol: "CTC-A.TO"
            },
            {
                name: "Bank of Scotia",
                symbol: "BNS.TO"
            },
            {
                name: "Fortis",
                symbol: "FTS.TO"
            }
        ]
        //tickerlist = ["ENB.TO","CTC-A.TO","FTS.TO","BNS.TO"]
    tickerSelector = d3.select("#selTicker");
    tickerlist.forEach(d => {
        console.log(d)
        tickerSelector.append("option").text(d.name).property("value", d.symbol)
    })

}

function get_stock_data() {

}

tickerSelector.on("change", get_stock_data)


// creates date range
function dateRange(user_date) {
    var dtdt = new Date(user_date)
    var end_date = new Date(dtdt - (-45 * 24 * 60 * 60 * 1000))
    var start_date = new Date(dtdt - (45 * 24 * 60 * 60 * 1000))

    return start_date, end_date
}