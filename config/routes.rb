Spotthestation::Application.routes.draw do
  get "user/auth"
  post "user/set_next_sighting"

  get "home/login"

  get "home/landing"

  get "iss/index"

  get "iss/now"

  get "iss/me"

  match '/login', :to => 'home#login'
end
