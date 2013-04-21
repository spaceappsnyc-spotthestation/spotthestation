namespace :iss_position do
  desc "Update the position of the ISS on Foursquare"
  task :update => :environment do
    puts IssInfo.update_foursquare_venue
  end
end
