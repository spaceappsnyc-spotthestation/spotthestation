class HeavensAbove
  require 'net/http'

  def self.get_iss_location
    url = 'http://api.open-notify.org/iss-now/'
    #url = 'http://api.uhaapi.com/satellites/25544/'
    get_response(url)
  end

  def self.get_passes(number,lat,lng,alt)
    #url = ['http://api.open-notify.org/iss/?lat=',lat,'&lon=',lon,'&alt=',alt,'&n=',number].join
    url = 'http://api.uhaapi.com/satellites/25544/passes'
    p = ['?lat=',lat,'&lng=',lng].join
    get_response(url.concat(p))
  end

  private

  def self.get_response(url)
    uri = URI(url)
    res = Net::HTTP.get(uri) # => String
    #url = URI.parse(url)
    #req = Net::HTTP::Get.new(url.path,p)
    #res = Net::HTTP.start(url.host, url.port) {|http|
      #http.request(req)
    #}
    puts res
  end
end
