class BaseQuery
  attr_reader :relation

  class << self
    delegate :call, to: :new
  end

  def call
    raise NotImplementedError
  end
end
