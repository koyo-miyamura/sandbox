class Event < ApplicationRecord
  has_one_attached :image
  has_many :tickets, dependent: :destroy
  belongs_to :owner, class_name: 'User'

  composed_of :period, mapping: [%w[start_at start_at], %w[end_at end_at]]

  validates :image,
            content_type: %i[png jpg jpeg],
            size: { less_than_or_equal_to: 10.megabytes },
            dimension: { width: { max: 2000 }, height: { max: 2000 } }
  validates :name, length: { maximum: Constants::EVENT_MAX_NAME_COLUMN_LENGTH }, presence: true
  validates :place, length: { maximum: Constants::EVENT_MAX_PLACE_COLUMN_LENGTH }, presence: true
  validates :content, length: { maximum: Constants::EVENT_MAX_CONTENT_COLUMN_LENGTH }, presence: true
  validates_with PeriodValidator

  scope :future_events, FutureEventsQuery

  def created_by?(user)
    return false unless user

    self.owner_id == user.id
  end
end
