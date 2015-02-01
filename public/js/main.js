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
                
                var chartData = [
                  {
                    "year": "Monday",
                    "current_temps": 88.5,
                    "last_year_temps": 18.1
                  }
                ];
                
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
  {
    "year": "Tuesday",
    "current_temps": 26.2,
    "last_year_temps": 22.8
  },
  {
    "year": "Wednesday",
    "current_temps": 30.1,
    "last_year_temps": 23.9
  },
  {
    "year": "Thursday",
    "current_temps": 29.5,
    "last_year_temps": 25.1
  },
  {
    "year": "Friday",
    "current_temps": 30.6,
    "last_year_temps": 27.2,
    "dashLengthLine": 5
  },
  {
    "year": "Saturday",
    "current_temps": 34.1,
    "last_year_temps": 29.9,
    "dashLengthColumn": 5,
    "alpha":0.2,
    "additional":"(projection)"
  }
];

var dataProvider = {
  mapVar: AmCharts.maps.usaLow,
  areas: [
    {
      id: "US-AL",
      value: 30},
    {
      id: "US-AK",
      value: 30},
    {
      id: "US-AZ",
      value: 40},
    {
      id: "US-AR",
      value: 30},
    {
      id: "US-CA",
      value: 30},
    {
      id: "US-CO",
      value: 30},
    {
      id: "US-CT",
      value: 30},
    {
      id: "US-DE",
      value: 30},
    {
      id: "US-FL",
      value: 30},
    {
      id: "US-GA",
      value: 30},
    {
      id: "US-HI",
      value: 30},
    {
      id: "US-ID",
      value: 30},
    {
      id: "US-IL",
      value: 30},
    {
      id: "US-IN",
      value: 50},
    {
      id: "US-IA",
      value: 30},
    {
      id: "US-KS",
      value: 30},
    {
      id: "US-KY",
      value: 30},
    {
      id: "US-LA",
      value: 30},
    {
      id: "US-ME",
      value: 30},
    {
      id: "US-MD",
      value: 30},
    {
      id: "US-MA",
      value: 30},
    {
      id: "US-MI",
      value: 30},
    {
      id: "US-MN",
      value: 30},
    {
      id: "US-MS",
      value: 30},
    {
      id: "US-MO",
      value: 30},
    {
      id: "US-MT",
      value: 30},
    {
      id: "US-NE",
      value: 30},
    {
      id: "US-NV",
      value: 30},
    {
      id: "US-NH",
      value: 30},
    {
      id: "US-NJ",
      value: 30},
    {
      id: "US-NM",
      value: 30},
    {
      id: "US-NY",
      value: 30},
    {
      id: "US-NC",
      value: 30},
    {
      id: "US-ND",
      value: 30},
    {
      id: "US-OH",
      value: 30},
    {
      id: "US-OK",
      value: 30},
    {
      id: "US-OR",
      value: 30},
    {
      id: "US-PA",
      value: 30},
    {
      id: "US-RI",
      value: 30},
    {
      id: "US-SC",
      value: 30},
    {
      id: "US-SD",
      value: 30},
    {
      id: "US-TN",
      value: 30},
    {
      id: "US-TX",
      value: 30},
    {
      id: "US-UT",
      value: 30},
    {
      id: "US-VT",
      value: 30},
    {
      id: "US-VA",
      value: 30},
    {
      id: "US-WA",
      value: 30},
    {
      id: "US-WV",
      value: 30},
    {
      id: "US-WI",
      value: 30},
    {
      id: "US-WY",
      value: 30}
  ]
};