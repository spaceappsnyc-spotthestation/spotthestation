Spotthestation::Application.routes.draw do
  post "user/auth"
  post "user/set_next_sighting"
  post "user/set_phone_number"

  get "home/login"

  get "home/landing"

  get "iss/index"

  get "iss/now"

  get "iss/me"

  get "foursquare/authenticate"
  get "foursquare/token"
  match '/login', :to => 'home#login'
end
