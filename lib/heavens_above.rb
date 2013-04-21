class HeavensAbove
  require 'net/http'

  def self.get_iss_location
    url = 'http://api.open-notify.org/iss-now/'
    get_response(url)
  end

  def self.get_passes(number,lat,lng,alt)
    url = 'http://api.uhaapi.com/satellites/25544/passes'
    p = ['?lat=',lat,'&lng=',lng].join
    get_response(url.concat(p))
  end

  private

  def self.get_response(url)
    uri = URI(url)
    Net::HTTP.get(uri)
  end
end
