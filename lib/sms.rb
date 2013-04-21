class SMS
  def self.text(options)
    from = Rails.env.production? || Rails.env.staging? ? self.production : self.sandbox
    numbers = options[:to].split(',')
    numbers.each { |number|
      self.client.account.sms.messages.create(
        :from => from,
        :to => number,
        :body => options[:body]
      )
    }
  end

  def self.production
  end

  def self.sandbox
    '+18625794601'
  end

  def self.client
    Twilio::REST::Client.new 'ACd4b3de3325ceb8e9c23994593cb4b3e9', '5ee0853a8f95e891c05aa6eb0d120cf7'
  end
end
