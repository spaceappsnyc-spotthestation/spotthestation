class User < ActiveRecord::Base
  attr_accessible :fsq_token

  def self.send_texts(current_time)
    User.where('phone_number is not null').where('next_sighting is not null').
         where(:next_sighting => nil)
  end
end
