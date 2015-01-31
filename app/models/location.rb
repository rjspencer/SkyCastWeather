class Location < ActiveRecord::Base
  belongs_to :user

  # developers.forecast.io
  FORECAST_KEY = "87ff6d41d5731793a1f9eb9cc54ccee5"
  
  # developers.google.com
  GEOLOCATE_KEY = ""
  
  def geolocateAddress address
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{address}"
    data = JSON.parse(open(url).read)
    if data[:status] = "OK"
      geo_data = data["results"][0]["geometry"]["location"]
      self.latitude = geo_data["lat"]
      self.longitude = geo_data["lng"]
      return geo_data
    end
    
    return false
  end
  
  def forecast time=false
    url = "https://api.forecast.io/forecast/#{FORECAST_KEY}/#{self.latitude},#{self.longitude}"
    url += ",#{time}" if time
    url += "?exclude=minutely"
    data = JSON.parse(open(url).read)
  end

end