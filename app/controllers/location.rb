# Retrieve data for a location
# 
# latitude & longitude or postal code
# 
get '/locations' do
  response = {}
  if session[:user_id]
    user = User.find(session[:user_id]) rescue nil
  end
  location = Location.new
  location.user = user if user
  if params[:time]
      time = params[:time]
  else
      time = false
  end
  
  if params[:latitude] && params[:longitude]
    location.latitude = params[:latitude].to_f.round(6)
    location.longitude = params[:longitude].to_f.round(6)
    response[:location] = location
    response[:forecast] = location.forecast(time)
    response[:success] = "OK"
    location.save
  elsif params[:address]
    if location.geolocateAddress params[:address]
        response[:location] = location
        response[:forecast] = location.forecast(time)
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