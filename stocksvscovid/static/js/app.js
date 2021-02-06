
function buildplot() {
  d3.json("/entertainment").then(function (data) {
    var ticker = data.entertainment_stocks[0].Ticker;
    var adj_Close = data.entertainment_stocks[0].Adj_Close;
    var date = data.entertainment_stocks[0].Date

    //console.log(ticker);
    //console.log(adj_Close);
    //console.log(date);

    var trace = {
      x: date,
      y: adj_Close,
      type: "scatter",
      mode: "line",
      name: ticker
    };

    var data = [trace];

    var layout = {
      title: `Entertainment Stock`
    };
    Plotly.newplot("plot", data, layout)
  })
}

buildplot()

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

