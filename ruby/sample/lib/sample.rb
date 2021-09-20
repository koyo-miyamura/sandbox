require 'sample/version'
require 'uri'
require 'net/http'

module Sample
  class Error < StandardError; end

  def self.version
    Sample::VERSION
  end

  def self.request
    uri = URI('https://example.com')
    res = Net::HTTP.get_response(uri)

    res.body
  end
end
