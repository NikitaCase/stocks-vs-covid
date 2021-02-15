// Declaring variable
var plot_area = d3.select("#plot")

// Create a Line plot with Ploty using data from app.py for entertainment category
function buildplot_entertainment() {
    plot_area.html("")
    d3.json("/entertainment").then(function(data) {
        console.log(data)
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


// Create a Line plot with Ploty using data from app.py for technology category
function buildplot_technology() {
    plot_area.html("")
    d3.json("/technology").then(function(data1) {
        var ticker3 = data1.technology[0].Ticker;
        var adj_Close3 = data1.technology[0].Adj_Close;
        var date3 = data1.technology[0].Date
        var ticker4 = data1.technology[1].Ticker;
        var adj_Close4 = data1.technology[1].Adj_Close;
        var date4 = data1.technology[1].Date

        // var trace3 = {
        //     type: "scatter",
        //     mode: "line",
        //     name: ticker3,
        //     x: date3,
        //     y: adj_Close3,
        //     line: {
        //         color: '00d775'
        //     }
        // };

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

        var tracedata_technology = [trace4];

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


// Create a Line plot with Ploty using data from app.py for aviation category
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

buildplot_aviation();

// Create a Line plot with Ploty using data from app.py for telecommunication category
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

// Initialize function
function init() {

    //Html binding
    var selector = d3.select("#selDateset");
    var newsparagraph = d3.select("#blurb");

    // Populate the dropdown
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

// Function for option changed
function optionChanged(newDate) {
    // Fetch new data each time a new sample is selected
    console.log("OPTION CHANGED");
    // buildMetadata(newDate);
}

// // Initialize the dashboard
init();


// Selecting page areas
var selector = d3.select("#selDateset");
var headline = d3.select("#news-headline")
var news = d3.select("#news-text")

// Changes new area based on user selection
function plot_data() {


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
};


// listenener for date change
selector.on("change", plot_data)

var category = d3.select("#selTable")

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