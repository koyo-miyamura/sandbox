class BaseService
  private_class_method :new

  def self.call(**kargs)
    self.new(**kargs).call
  end
end
