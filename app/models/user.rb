class User < ActiveRecord::Base
  attr_accessible :fsq_token

  def self.send_texts(current_time)
    User.where('phone_number is not null').where('next_sighting is not null').
         where(:next_sighting => nil)
  end

  def needs_notification
    next_sighting - Time.now.to_i < 5.minutes.to_i
  end

  def send_notification
    SMS.text(:to => self.phone_number, :body => "Space station sighting in 5 minutes!")
  end
end
