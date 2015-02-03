class Location < ActiveRecord::Base
  belongs_to :user

  # developers.forecast.io
  FORECAST_KEY = "87ff6d41d5731793a1f9eb9cc54ccee5"
  
  # developers.google.com
  GEOLOCATE_KEY = "AIzaSyAOPuKGSn3FAtKkw7kKyDsuny0lh_BjS9A"
  
  def geolocateAddress address
    cached = self.find_by_address(address) rescue nil
    if cached
        self.address = address
        self.latitude = cached.latitude.to_f.round(6)
        self.longitude = cached.longitude.to_f.round(6)
        return true
    else
        url = URI.escape("https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&key=#{GEOLOCATE_KEY}")
        data = JSON.parse(open(url).read)
        if data[:status] = "OK"
          geo_data = data["results"][0]["geometry"]["location"]
          if geo_data
              self.address = address
              self.latitude = geo_data["lat"].to_f.round(6)
              self.longitude = geo_data["lng"].to_f.round(6)
              return true
          end
        end
    end
    
    return false
  end
  
  def forecast time=false
    api_data = getForecastFromAPI(time)
    convertDataFromAPI(api_data)
  end
    
  def getForecastFromAPI time=false
    url = "https://api.forecast.io/forecast/#{FORECAST_KEY}/#{self.latitude.to_f.round(6)},#{self.longitude.to_f.round(6)}"
    url += ",#{time}" if time
    url += "?exclude=minutely,hourly"
      
    return JSON.parse(open(url).read)
  end

  def convertDataFromAPI api_data
      data = {
          alerts: [],
          currently: {},
          daily: {data: []},
          };
      if api_data["alerts"]
          api_data["alerts"].each do |a|
              data[:alerts] << {
                  title: a["title"],
                  description: a["description"]
                  }
          end
      else 
        data[:alerts] = false
      end
      api_data["daily"]["data"].each do |day|
          data[:daily][:data] << {
              day_name: Time.at(day["time"]).strftime("%A"),
              summary: day["summary"],
              temperatureMax: day["temperatureMax"].to_int,
              temperatureMin: day["temperatureMin"].to_int,
              icon: day["icon"],
              wind_speed: day["windSpeed"].to_int
              }
      end
      data[:daily][:summary] = api_data["daily"]["summary"]
      data[:currently] = {
              summary: api_data["currently"]["summary"],
              temperature: api_data["currently"]["temperature"].to_int,
              icon: api_data["currently"]["icon"],
              wind_speed: api_data["currently"]["windSpeed"].to_int
              }
      data
  end
    
end
