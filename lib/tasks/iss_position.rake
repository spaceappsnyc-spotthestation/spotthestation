namespace :iss_position do
  desc "Update the position of the ISS on Foursquare"
  task :update => :environment do
    puts IssInfo.update_foursquare_venue
    User.where('phone_number is not null').
         where('next_sighting < ?',(Time.now.to_i + 5.minutes).to_i).each { |user|
      user.next_sighting = nil
      user.save!
      user.send_notification
    }
  end
end
