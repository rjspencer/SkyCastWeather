require 'faker'

User.destroy_all

user = User.create!(first_name: "Ryan", last_name: "Spencer", email: "ryan@test.com", password: "12345678")
10.times do
    Location.create!(
      user: user,
      latitude: Faker::Address.latitude,
      longitude: Faker::Address.longitude
      )
end

20.times do
  first_name = Faker::Name.first_name
  user = User.create!(
    first_name: first_name, 
    last_name: Faker::Name.last_name, 
    email: Faker::Internet.email(first_name), 
    password: Faker::Internet.password(8)
    )
  10.times do
    Location.create!(
      user: user,
      latitude: Faker::Address.latitude,
      longitude: Faker::Address.longitude
      )
  end
end

