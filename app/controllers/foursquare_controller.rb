class FoursquareController < ApplicationController
  def redirect
    redirect_to Foursquare.redirect_url
  end

  def authenticate
  end
end
