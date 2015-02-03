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
    // CHART
    $scope.labels = [];
    $scope.temps = [[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]];
    $scope.series = ["This Week", "Last Year"];
    
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
                $scope.labels = [];
                $scope.temps = [[],[]];
                angular.forEach($scope.daily.data, function(day) {
                    $scope.labels.push(day.day_name);
                    $scope.temps[0].push(day.temperatureMax);
                });
                $scope.alertList = data.forecast.alerts;
//                $scope.last_year = (Date.now() - (1000*60*60*24*365))/1000;
//                $scope.getPastForecast(use_geolocation, $scope.last_year);
                
            })
        };
    
    $scope.getPastForecast = function(use_geolocation, time) {
        var url = "/locations?time=" + parseInt(time);
        if (use_geolocation && $scope.currentPosition.longitude && $scope.currentPosition.latitude) {
            params = "&longitude=" + $scope.currentPosition.longitude +
                    "&latitude=" + $scope.currentPosition.latitude;
            $scope.search = null;
        } else {
            params = "?address=" + $scope.search;
        }
        
        $http.get(url + params)
            .success( function(data) {
                var daily = data.forecast.daily;
                angular.forEach(daily.data, function(day) {
                    $scope.temps[1].unshift(day.temperatureMax);
                });
                if (time >= $scope.last_year - (60*60*24*6)) {
                    $scope.getPastForecast(use_geolocation, time - 60*60*24);
                };
            })
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

