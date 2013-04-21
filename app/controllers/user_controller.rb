class UserController < ApplicationController
  def auth
    u = User.find_or_create_by_fsq_token(:fsq_token => params[:fsq_token])
    session[:user] = u
  end

  def set_next_sighting
    u = User.find_or_create_by_fsq_token(:fsq_token => params[:fsq_token])
    u.next_sighting = params[:next_sighting]
    u.save!
    format.json { render :text => u.next_sighting) }
  end

  def set_phone_number
    u = User.find_or_create_by_fsq_token(:fsq_token => params[:fsq_token])
    u.phone_number = params[:phone_number]
    u.save!
    format.json { render :text => u.phone_number) }
  end
end
