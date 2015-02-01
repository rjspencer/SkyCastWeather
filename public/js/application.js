$(document).ready( function() {
//    setTimeout( function() { 
//        $(".logo").fadeOut(500, function() {
//            $(".logo").removeClass("splash").fadeIn(500);
//            
//        });
//    }, 500);
    
    $(".menu").on("click", ".tab", function() {
      $(".menu").toggleClass("hide-left");  
    });
    
    //callback handler for form submit
    $("form").submit( function(event)
    {
        event.preventDefault();
        
        var postData = $(this).serializeArray(),
          formURL = $(this).attr("action");
      
        $.ajax({
            url : formURL,
            type: "POST",
            data: postData,
            success: function(data) {
              if(data.success) {                
                if(data.forecast.alerts) {
                  $(".alert").removeClass("hidden");
                  $(".alert > .title").text(data.forecast.alerts[0].title);
                  $(".alert > .description").text(data.forecast.alerts[0].description.toLowerCase());
                } else {
                  $(".alert").addClass("hidden");
                  $(".alert > .title").text("");
                  $(".alert > .description").text("");
                }
                daily = data.forecast.daily;
                var box_template = $('.forecast .box:first').clone();
                $(".forecast").empty().append("<h3>" + daily.summary + "</h3>");
                
                $.each(daily.data, function(key, value) {
                  var day = moment.unix(value.time),
                      temp = parseInt((value.temperatureMax + value.temperatureMin) / 2),
                      box = box_template.clone();
       
                  box.children(".icon").attr("src", "img/weather-icons/" + value.icon + ".svg");
                  box.children(".temp").text(temp);
                  box.children(".summary").text(value.summary);
                  box.children(".day").text(day.format("dddd"));
                  $(".forecast").append(box);
                                    
                });
                
              } else {
                console.log(data);
              }
            }
        });
        
    });

  AmCharts.ready(function() {
    // SERIAL CHART  
    chart = new AmCharts.AmSerialChart();
    chart.pathToImages = "img/charts/";
    chart.dataProvider = chartData;
    chart.categoryField = "year";
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
    graph2.title = "Same Time Last Year";
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

var chart;
var chartData = [
  {
    "year": "Monday",
    "current_temps": 23.5,
    "last_year_temps": 18.1
  },
];

var dataProvider = {
  mapVar: AmCharts.maps.usaLow,
  areas: [ {id: "US-AL", value: 30} ]
};