# Retrieve data for a location
# 
# latitude & longitude or postal code
# 
post '/location' do
  response = {}
  user = User.find(session[:user_id]) if session[:user_id]
  location = Location.new
  location.user = user if user
  
  if params[:latitude] && params[:longitude]
    location.latitude = params[:latitude]
    location.longitude = params[:longitude]
    response[:location] = location
    response[:forecast] = location.forecast
    location.save
  elsif params[:address]
     geo_data = location.geolocateAddress params[:address]
     if geo_data 
       response[:geo_data] = geo_data
       response[:location] = location
       response[:forecast] = location.forecast
       location.save
    else
      response[:error] = "Geocoding error, try again"
    end
  else
    response[:error] = "Missing or invalid parameters"
    response[:params] = params
  end
  response[:success] = "OK"
  
  content_type :json
  response.to_json
end

post '/location/history' do
  if session[:user_id]
    user = User.find(session[:user_id])
    response = {
          user_id: user.id, 
          recent_searches: user.locations.last(10),
          success: "OK"
        }
  else
    response = {error: "You must be logged in to view your history"}
  end

  content_type :json
  response.to_json
end