class FutureEventsQuery < BaseQuery
  def initialize(relation = Event.all)
    @relation = relation
  end

  def call(from = Time.zone.now)
    relation.where('start_at > ?', from)
  end
end
