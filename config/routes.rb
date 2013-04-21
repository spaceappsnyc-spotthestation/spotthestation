Spotthestation::Application.routes.draw do
  post "user/auth"
  post "user/set_next_sighting"

  get "home/login"

  get "home/landing"

  get "iss/index"

  get "iss/now"

  get "iss/me"

  get "foursquare/authenticate"
  get "foursquare/token"
  match '/login', :to => 'home#login'
end
