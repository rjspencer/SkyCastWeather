get '/' do
  if session[:user_id]
    @user = User.find(session[:user_id]) rescue nil
  else 
    @user = User.new
  end
  erb :index
end

post '/' do
  content_type :json
  {success: "Welcome to the SkyCast API"}.to_json
end

# Login
#
# password
# email
#
post '/users/login' do
  if params["email"] && params["password"]
    user = User.find_by_email(params[:email])
    if user
      if user.authenticate(params[:password])
        session[:user_id] = user.id
        response = {
          user_id: user.id, 
          recent_searches: user.locations.last(10),
          success: "Successfully logged in"
        }
      else
        response = {error: "Incorrect email or password"}
      end
    else
      response = {error: "Incorrect email or password"}
    end
  end

  content_type :json
  response.to_json
end

# Logout
#
get '/users/logout' do
  session[:user_id] = nil
  
  content_type :json
  {user_id: user.id, success: "Successfully logged out"}.to_json
end

# Create new user
#
# password
# email
# name <optional>
#
post '/users' do
  response = {}
  if params["email"] && params["password"]
    if User.find_by_email(params[:email])
      response[:error] = "Email already exists, try logging in"
    else
      user = User.create(
        email: params[:email],
        password: params[:password]
      )
      if user
        user.name params[:name] if params[:name]
        response[:success] = "New user created"
        response[:user_id] = user.id
      else
        response[:error] = "User creation failed"
      end
    end
  else
    response[:error] = "Missing parameters"
    response[:params] = params
  end
  
  content_type :json
  response.to_json
end