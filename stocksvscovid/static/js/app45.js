// Create a Line plot with Ploty using data from app.py
var plot_area = d3.select("#plot")

// Selecting page areas
var selector = d3.select("#selDateset");
var headline = d3.select("#news-headline")
var news = d3.select("#news-text")
var bar_area = d3.select("#bar-graph")
var category = d3.select("#selTable")


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


function optionChanged() {
    console.log('option changed')

}


// Changes new area based on user selection
function display_news() {
    var user_date = selector.node().value

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

    var dtdt = new Date(user_date)
    var end_date = new Date(dtdt - (-45 * 24 * 60 * 60 * 1000))
    var start_date = new Date(dtdt - (45 * 24 * 60 * 60 * 1000))

    buildplot(user_date, start_date, end_date)
        // d3.json(`/filterDate/${user_date}`).then((data) => {
        // });
    dates = [start_date,end_date]
    return dates
};



// function dates(user_category) {
//     bar_area.html()
//     var url = `"/${user_category}"`
//     var user_date = selector.node().value
//     user_date = new Date(user_date)
//     console.log(user_date)

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


function buildplot(user_date, start_date, end_date) {
    // console.log(start_date)
    d3.json("/entertainment").then((data) => {


        var sett = data.entertainment_stocks[0]
        var dates = arrayToDates(sett.Date)
        var date_range = dates.filter(dt => (dt >= start_date) && (dt <= end_date))

        var start_index = dates.indexOf(date_range[0])
        var end_index = dates.indexOf(date_range[date_range.length - 1])


        var start_price = sett.Adj_Close[start_index]
        var end_price = sett.Adj_Close[end_index]

        var prices = []


        for (var x = start_index; x < end_index; x++) {
            prices.push(sett.Adj_Close[x])
        }
        console.log(prices)


    })
}

function buildplot_entertainment() {
    plot_area.html("")
    d3.json("/entertainment").then(function(data) {
        var ticker = data.entertainment_stocks[0].Ticker;
        var adj_Close = data.entertainment_stocks[0].Adj_Close;
        var date = data.entertainment_stocks[0].Date
        var ticker1 = data.entertainment_stocks[1].Ticker;
        var adj_Close1 = data.entertainment_stocks[1].Adj_Close;
        var date1 = data.entertainment_stocks[1].Date
        var ticker2 = data.entertainment_stocks[2].Ticker;
        var adj_Close2 = data.entertainment_stocks[2].Adj_Close;
        var date2 = data.entertainment_stocks[2].Date;

        var trace = {
            type: "scatter",
            mode: "line",
            name: ticker,
            x: date,
            y: adj_Close,
            line: {
                color: '00d775'
            }
        };

        var trace1 = {
            type: "scatter",
            mode: "line",
            name: ticker1,
            x: date1,
            y: adj_Close1,
            line: {
                color: "0077df"
            }
        };
        var trace2 = {
            type: "scatter",
            mode: "line",
            name: ticker2,
            x: date2,
            y: adj_Close2,
            line: {
                color: "7f6dcc"
            }
        };

        var tracedata = [trace, trace1, trace2];

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


function get_traces(ticker,date,adj_Close) {
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

function get_layout(title){
    var layout = {
            title: title,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
}
// Create a Line plot with Ploty using data from app.py
function buildplot_technology() {
    plot_area.html("")
    d3.json("/technology").then(function(data1) {

        var dates = getDateRange()
        var start_date = dates[0]
        var end_date = dates[1]

        var ticker3 = data1.technology[0].Ticker;
        var adj_Close3 = data1.technology[0].Adj_Close;

        var date3 = getDateRange()
        var ticker4 = data1.technology[1].Ticker;
        var adj_Close4 = data1.technology[1].Adj_Close;
        
        var date4 = getDateRange()

        var trace3 = get_traces(ticker3,date3,adj_Close3);
        var trace4 = get_traces(ticker4,date4,adj_Close4);

        var tracedata_technology = [trace3, trace4];

        var layout = get_layout("Technology Stock")
        
        Plotly.newPlot("plot", tracedata_technology, layout)
    });
};

// Create a Line plot with Ploty using data from app.py
function buildplot_technology() {
    plot_area.html("")
    d3.json("/technology").then(function(data1) {
        var ticker3 = data1.technology[0].Ticker;
        var adj_Close3 = data1.technology[0].Adj_Close;
        var date3 = data1.technology[0].Date
        var ticker4 = data1.technology[1].Ticker;
        var adj_Close4 = data1.technology[1].Adj_Close;
        var date4 = data1.technology[1].Date

        var trace3 = {
            type: "scatter",
            mode: "line",
            name: ticker3,
            x: date3,
            y: adj_Close3,
            line: {
                color: '00d775'
            }
        };

        var trace4 = {
            type: "scatter",
            mode: "line",
            name: ticker4,
            x: date4,
            y: adj_Close4,
            line: {
                color: "0077df"
            }
        };

        var tracedata_technology = [trace3, trace4];

        var layout = {
            title: `Technology Stock`,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
        Plotly.newPlot("plot", tracedata_technology, layout)
    });
};

// Create a Line plot with Ploty using data from app.py
function buildplot_aviation() {
    plot_area.html("")
    d3.json("/aviation").then(function(data2) {
        var ticker5 = data2.aviation_stocks[0].Ticker;
        var adj_Close5 = data2.aviation_stocks[0].Adj_Close;
        var date5 = data2.aviation_stocks[0].Date
        var ticker6 = data2.aviation_stocks[1].Ticker;
        var adj_Close6 = data2.aviation_stocks[1].Adj_Close;
        var date6 = data2.aviation_stocks[1].Date

        var trace5 = {
            type: "scatter",
            mode: "line",
            name: ticker5,
            x: date5,
            y: adj_Close5,
            line: {
                color: '00d775'
            }
        };

        var trace6 = {
            type: "scatter",
            mode: "line",
            name: ticker6,
            x: date6,
            y: adj_Close6,
            line: {
                color: "0077df"
            }
        };

        var tracedata_aviation = [trace5, trace6];

        var layout = {
            title: `Aviation Stock`,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
        Plotly.newPlot("plot", tracedata_aviation, layout)
    });
};


// Create a Line plot with Ploty using data from app.py
function buildplot_telecommunication() {
    plot_area.html("")
    d3.json("/telecommunication").then(function(data3) {
        var ticker7 = data3.telecommunication_stocks[0].Ticker;
        var adj_Close7 = data3.telecommunication_stocks[0].Adj_Close;
        var date7 = data3.telecommunication_stocks[0].Date
        var ticker8 = data3.telecommunication_stocks[1].Ticker;
        var adj_Close8 = data3.telecommunication_stocks[1].Adj_Close;
        var date8 = data3.telecommunication_stocks[1].Date

        var trace7 = {
            type: "scatter",
            mode: "line",
            name: ticker7,
            x: date7,
            y: adj_Close7,
            line: {
                color: '00d775'
            }
        };

        var trace8 = {
            type: "scatter",
            mode: "line",
            name: ticker8,
            x: date8,
            y: adj_Close8,
            line: {
                color: "0077df"
            }
        };

        var tracedata_telecommuication = [trace7, trace8];

        var layout = {
            title: `Telecommunication Stock`,
            paper_bgcolor: '002e50',
            plot_bgcolor: '002e50',
            yaxis: {
                title: 'Stock Price (in CAD $)'
            }
        };
        Plotly.newPlot("plot", tracedata_telecommuication, layout)
    });
};


// Load initial functions
init();

// plot initial graph
buildplot_aviation();

// Load ticker selection section
load_Tickers();
// listenener for date change
selector.on("change", display_news)

// Listener for category change
category.on("change", function() {
    var user_category = category.property("value")
    var url = `"/${user_category}"`
    if (user_category === "aviation") {
        buildplot_aviation(),
            d3.json(url).then((data) => {
                var dates = data.aviation_stocks[0].Date.map(d => new Date(d))
                console.log(dates)
            })
    } else if (user_category === "entertainment") { buildplot_entertainment() } else if (user_category === "technology") { buildplot_technology() } else { buildplot_telecommunication() }
})


var tickerSelector = d3.select("#selTicker");

function load_Tickers() {
    tickerlist = [{name:"Enbridge",
                symbol:"ENB.TO"},
                {name:"Canadian Tire",
                symbol:"CTC-A.TO"},
                 {name:"Bank of Scotia",
                 symbol:"BNS.TO"},
                 {name:"Fortis",
                symbol:"FTS.TO"}]
    //tickerlist = ["ENB.TO","CTC-A.TO","FTS.TO","BNS.TO"]
    tickerSelector = d3.select("#selTicker");
    tickerlist.forEach(d => {
        console.log(d)
        tickerSelector.append("option").text(d.name).property("value",d.symbol)
    })

}

function get_stock_data() {

}

tickerSelector.on("change",get_stock_data)