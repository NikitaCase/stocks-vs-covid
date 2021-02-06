function buildplot_entertainment() {
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
                color: "red"
            }
        };

        var trace1 = {
            type: "scatter",
            mode: "line",
            name: ticker1,
            x: date1,
            y: adj_Close1,
            line: {
                color: "yellow"
            }
        };
        var trace2 = {
            type: "scatter",
            mode: "line",
            name: ticker2,
            x: date2,
            y: adj_Close2,
            line: {
                color: "orange"
            }
        };

        var tracedata = [trace, trace1, trace2];

        var layout = {
            title: `Entertainment Stock`
        }


        Plotly.newPlot("plot", tracedata, layout)
    });
};

buildplot_entertainment()


// function buildplot_technology() {
//     d3.json("/technology").then(function(data2) {
//         var ticker5 = data2.telecommunication_stocks[0].Ticker;
//         var adj_Close5 = data2.telecommunication_stocks[0].Adj_Close;
//         var date5 = data2.telecommunication_stocks[0].Date
//         var ticker6 = data2.telecommunication_stocks[1].Ticker;
//         var adj_Close6 = data2.telecommunication_stocks[1].Adj_Close;
//         var date6 = data2.telecommunication_stocks[1].Date

//         var trace5 = {
//             type: "scatter",
//             mode: "line",
//             name: ticker5,
//             x: date5,
//             y: adj_Close5,
//             line: {
//                 color: "purple"
//             }
//         };

//         var trace6 = {
//             type: "scatter",
//             mode: "line",
//             name: ticker6,
//             x: date6,
//             y: adj_Close6,
//             line: {
//                 color: "pink"
//             }
//         };

//         var tracedata_technology = [trace5, trace6];

//         var layout = {
//             title: `Technology Stock`
//         }


//         Plotly.newPlot("plot2", tracedata_technology, layout)
//     });
// };

// buildplot_technology()

/*
function buildplot_aviation() {
  d3.json("/aviation").then(function (data3) {
    var ticker7 = data3.aviation_stocks[0].Ticker;
    var adj_Close7 = data3.aviation_stocks[0].Adj_Close;
    var date7 = data3.aviation_stocks[0].Date
    var ticker8 = data3.aviation_stocks[1].Ticker;
    var adj_Close8 = data3.aviation_stocks[1].Adj_Close;
    var date8 = data3.aviation_stocks[1].Date

    var trace7 = {
      type: "scatter",
      mode: "line",
      name: ticker7,
      x: date7,
      y: adj_Close7,
      line: {
        color: "brown"
      }
    };

    var trace8 = {
      type: "scatter",
      mode: "line",
      name: ticker8,
      x: date8,
      y: adj_Close8,
      line: {
        color: "black"
      }
    };

    var tracedata_aviation = [trace7, trace8];

    var layout = {
      title: `Aviation Stock`
    }


    Plotly.newPlot("plot3", tracedata_aviation, layout)
  });
};

buildplot_aviation()

*/



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



        // News.forEach((news) => {
        //     newsparagraph.append("p")
        //         .text(news)
        // })
    });

};

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