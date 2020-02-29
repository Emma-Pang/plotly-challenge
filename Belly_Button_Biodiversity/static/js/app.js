// const url = "samples.json";

// d3.json(url).then(function(data) {
//   console.log(data)
  
// });




function buildMetadata(sample) {
  const url = "samples.json";
  // @TODO: Complete the following function that builds the metadata panel
  

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(data) {

    //filter data
  var dropdownSample = data.metadata.filter(specificSample => specificSample.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleMetadata = d3.select("#sample-metadata");
      
    console.log(dropdownSample);
    // // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");


    Object.entries(dropdownSample[0]).forEach(([key, value]) => {
      var row = sampleMetadata.append("h5");
      row.text(`${key}: ${value}`);
    });

    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
  const url = "samples.json";
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(function(data) {

    var idsamplevalues = data.samples.filter(xvalSample => xvalSample.id == sample);
    console.log(idsamplevalues);
    // @TODO: Build horizontal bar chart

    // @TODO: Build a Bubble Chart using the sample data
    
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
