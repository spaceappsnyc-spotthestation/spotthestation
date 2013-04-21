class IssInfo
  def self.fsq_venue_id
    '51731aa945b06a17def98aef'
  end

  def self.superuser_token

  end

  def self.update_foursquare_venue
    @client = Foursquare.get_superuser_client
    location = JSON.parse(HeavensAbove.get_iss_location)
    lat = location['iss_position']['latitude']
    lng = location['iss_position']['longitude']
    update_it(lat,lng)
  end

  def self.fudge_foursquare_venue
    # Set it to Alley NYC coords
    @client = Foursquare.get_superuser_client
    lat = 40.75316931842327
    lng = -73.98977213783496
    update_it(lat,lng)
  end

  def self.update_it(lat,lng)
    @client.venue_edit(IssInfo.fsq_venue_id,{:ll => [lat,lng].join(',')})
    ['Updated ISS Foursquare venue to ',lat,' ',lng].join
  end
end
