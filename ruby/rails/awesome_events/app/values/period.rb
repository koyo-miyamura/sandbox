class Period
  attr_reader :start_at, :end_at

  def initialize(start_at, end_at)
    @start_at = start_at
    @end_at = end_at
  end

  def valid?
    return false unless @start_at && @end_at

    @start_at < @end_at
  end
end
