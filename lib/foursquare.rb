class Foursquare
  def self.redirect_url
    ['https://foursquare.com/oauth2/authenticate',
     '?client_id=',self.client_id,
     '&response_type=code',
     '&redirect_uri=localhost:3000/foursquare/authenticate'].join
  end

  def self.authenticate_url

  end

  def self.client_id
    'OCDE4J4KFIFFUQ1BUQSASIVDIO034V1V1GVU1YRGWNFS54QZ'
  end

  def self.client_secret
    'HEIZDD13Z11LWCIMN5L4AH5C1FKBUUXRCLTH30DMQ2HC4NG1'
  end

  def self.userless
    Foursquare2::Client.new(:client_id => self.client_id, :client_secret => self.client_secret)
  end
end
