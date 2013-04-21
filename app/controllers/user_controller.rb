class UserController < ApplicationController
  def auth
    u = User.find_or_create_by_fsq_token(:fsq_token => params[:fsq_token])
    session[:user] = u
  end

  def set_next_sighting
    u = User.find_or_create_by_fsq_token(:fsq_token => params[:fsq_token])
    u.next_sighting = params[:next_sighting]
    u.save!
  end
end
