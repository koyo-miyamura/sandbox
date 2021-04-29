ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require_relative 'sign_in_helper'
require 'rails/test_help'
require 'minitest/mock'

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end

if ENV['QUERY_LOG'].present?
  ActiveRecord::Base.logger = ActiveSupport::Logger.new($stdout)
end
