require 'test_helper'

class PeriodTest < Minitest::Test
  def test_valid
    now = Time.new
    assert Period.new(now, now + 60).valid?
  end

  def test_invalid
    assert !Period.new(nil, nil).valid?
  end
end
