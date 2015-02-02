var app = angular.module("skycastApp", ["chart.js"]);

app.controller("forecastCtrl", function($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.alertList = [];
    $scope.search = "Chicago, IL";
    $scope.searchList = [];
    $scope.searchNew = function() {
        $scope.searchList.unshift({ "address" : $scope.search })
        $scope.getNewForecast();
    };
    $scope.alerts = [];
    $scope.daily = [];
    $scope.chart_series = ["This Week", "Last Year"];
    
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.currentPosition = position.coords;
          $scope.getNewForecast(true);
      });
    });
    }
    
    $scope.getNewForecast = function(use_geolocation) {
        var url = "/locations";
        if (use_geolocation && $scope.currentPosition.longitude && $scope.currentPosition.latitude) {
            params = "?longitude=" + $scope.currentPosition.longitude +
                    "&latitude=" + $scope.currentPosition.latitude;
            $scope.search = null;
        } else {
            params = "?address=" + $scope.search;
        }
        
        $http.get(url + params)
            .success( function(data) {
                if (data.forecast.alerts) {
                    $scope.alerts = data.forecast.alerts;
                    $(".alert").removeClass("hidden");
                } else {
                    $(".alert").addClass("hidden");
                }
                $scope.daily = data.forecast.daily;
                $scope.alertList = data.forecast.alerts;
            })
            .error( function(data) {

            });
    };
    
    // CHART
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.chart_temps = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
    console.log(points, evt);
    };
    
});


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
    });
});

