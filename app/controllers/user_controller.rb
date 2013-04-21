class UserController < ApplicationController
  def auth
    User.find_or_create_by_fsq_token(:token => params[:token])
  end

  def set_next_sighting
    u = User.find_or_create_by_fsq_token(:token => params[:token])
    u.next_sighting = params[:next_sighting]
    u.save!
  end
end
