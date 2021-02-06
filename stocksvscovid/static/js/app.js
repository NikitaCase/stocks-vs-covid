function buildplot() {
  d3.json("/entertainment").then(function (data) {
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

buildplot()


function buildplot1() {
  d3.json("/telecommunication").then(function (data1) {
    var ticker3 = data1.telecommunication_stocks[0].Ticker;
    var adj_Close3 = data1.telecommunication_stocks[0].Adj_Close;
    var date3 = data1.telecommunication_stocks[0].Date
    var ticker4 = data1.telecommunication_stocks[1].Ticker;
    var adj_Close4 = data1.telecommunication_stocks[1].Adj_Close;
    var date4 = data1.telecommunication_stocks[1].Date

    //console.log(ticker);
    //console.log(adj_Close);
    //console.log(date);

    var trace3 = {
      type: "scatter",
      mode: "line",
      name: ticker3,
      x: date3,
      y: adj_Close3,
      line: {
        color: "green"
      }
    };

    var trace4 = {
      type: "scatter",
      mode: "line",
      name: ticker4,
      x: date4,
      y: adj_Close4,
      line: {
        color: "blue"
      }
    };

    var tracedata1 = [trace3, trace4];

    var layout = {
      title: `tele`
    }


    Plotly.newPlot("plot1", tracedata1, layout)
  });
};

buildplot1()

// function init() {
//   //Html binding
//   console.log("YOU ARE IN IT");
//   var selector = d3.select("#selDateset");

//   // const url = `/api/${date}`
//   //d3.json(url).then(function(data) => {
//     // Populate the dropdown
//     d3.json("/dates").then((data) =>  {

//         console.log(data);
//         var Dates = data.Date;

//         Dates.forEach((date) => {
//             selector.append("option")
//             .text(date)
//             .property("value",date);
//         })
//         console.log(Dates);
//         console.log("AFTER FOREACH");
//         // Use the first sample to init the charts
//         const initialSample = Dates[0];
//         console.log(Dates[0]);
//         // build_Charts(initialSample);
//         // buildMetadata(initialSample);
//     });
// };

// function optionChanged(newDate) {
//   // Fetch new data each time a new sample is selected
//   console.log("OPTION CHANGED");
//   // buildMetadata(newDate);
//   }

// // Initialize the dashboard
// init();

/* function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDateset");

  const url = "/dates"
  // Use the list of sample names to populate the select options
  d3.json(url).then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
} */

