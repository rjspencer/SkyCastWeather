$(document).ready(function() {



var chart,
    chartData = [
    {
        "day": "Monday",
        "current_temps": 23.5,
        "last_year_temps": 18.1
    } 
];

AmCharts.ready(function() {
    // SERIAL CHART  
    chart = new AmCharts.AmSerialChart();
    chart.pathToImages = "img/charts/";
    chart.dataProvider = chartData;
    chart.categoryField = "day";
    chart.startDuration = 1;

    chart.handDrawn = true;
    chart.handDrawnScatter = 3;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.gridPosition = "start";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    chart.addValueAxis(valueAxis);

    // GRAPHS
    // column graph
    var graph1 = new AmCharts.AmGraph();
    graph1.type = "column";
    graph1.title = "Current Temperatures";
    graph1.lineColor = "#a668d5";
    graph1.valueField = "current_temps";
    graph1.lineAlpha = 1;
    graph1.fillAlphas = 1;
    graph1.dashLengthField = "dashLengthColumn";
    graph1.alphaField = "alpha";
    graph1.balloonText = "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>";
    chart.addGraph(graph1);

    // line
    var graph2 = new AmCharts.AmGraph();
    graph2.type = "line";
    graph2.title = "Last Year";
    graph2.lineColor = "#fcd202";
    graph2.valueField = "last_year_temps";
    graph2.lineThickness = 3;
    graph2.bullet = "round";
    graph2.bulletBorderThickness = 3;
    graph2.bulletBorderColor = "#fcd202";
    graph2.bulletBorderAlpha = 1;
    graph2.bulletColor = "#ffffff";
    graph2.dashLengthField = "dashLengthLine";
    graph2.balloonText = "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>";
    chart.addGraph(graph2);

    // LEGEND                
    var legend = new AmCharts.AmLegend();
    legend.useGraphSettings = true;
    chart.addLegend(legend);

    // WRITE
    chart.write("chartdiv");

    var map;
    map = new AmCharts.AmMap();
    map.pathToImages = "img/maps/";

    map.colorSteps = 10;

    var dataProvider = {
        mapVar: AmCharts.maps.usaLow,
        areas: [ { id: "US-AL", value: 30 } ]
    };
    map.areasSettings = {
        autoZoom: true
    };
    map.dataProvider = dataProvider;
    var valueLegend = new AmCharts.ValueLegend();
    valueLegend.right = 10;
    valueLegend.minValue = "little";
    valueLegend.maxValue = "a bunch!";
    map.valueLegend = valueLegend;

    map.write("mapdiv");
});
    
});