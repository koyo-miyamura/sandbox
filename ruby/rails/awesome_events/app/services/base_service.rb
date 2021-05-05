class BaseService
  private_class_method :new

  def self.call(*kwargs)
    new(*kwargs).call
  end
end
