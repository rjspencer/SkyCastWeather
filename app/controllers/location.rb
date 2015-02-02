# Retrieve data for a location
# 
# latitude & longitude or postal code
# 
get '/locations' do
  response = {}
  user = User.find(session[:user_id]) if session[:user_id]
  location = Location.new
  location.user = user if user
  
  if params[:latitude] && params[:longitude]
    location.latitude = params[:latitude]
    location.longitude = params[:longitude]
    response[:location] = location
    response[:forecast] = location.forecast
    response[:success] = "OK"
    location.save
  elsif params[:address]
    if location.geolocateAddress params[:address]
        response[:location] = location
        response[:forecast] = location.forecast
        response[:success] = "OK"
        location.save
    else
      response[:error] = "Geocoding error, try again"
    end
  else
    response[:error] = "Missing or invalid parameters"
    response[:params] = params
  end
  
  content_type :json
  response.to_json
end

get '/location/history' do
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