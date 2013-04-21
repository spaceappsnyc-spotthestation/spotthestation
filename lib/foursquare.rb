class Foursquare
  @@client_id = ''
  @@client_secret = ''
  @@superuser_token = ''

  def self.get_credentials_from_text_file
    f = File.open('config/fsq.txt')
    @@client_id = f.gets.chomp
    @@client_secret = f.gets.chomp
    @@superuser_token = f.gets.chomp
  end

  def self.get_superuser_client
    Foursquare2::Client.new(:oauth_token => @@superuser_token)
  end

  def self.userless
    Foursquare2::Client.new(:client_id => @@client_id, :client_secret => @@client_secret)
  end
end
