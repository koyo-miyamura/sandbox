class Book < ApplicationRecord
  enum sales_status: {
    reservation: 0, # 予約受付
    now_on_sale: 1, # 販売中
    end_of_print: 2 # 販売終了
  }

  scope :costly, -> { where('price > ?', 3000) }
  scope :find_price, ->(price) { find_by(price: price) }

  def self.costly_method
    where('price > ?', 3000)
  end

  def self.find_price_method(price)
    find_by(price: price)
  end

  belongs_to :publisher
  has_many :book_authors
  has_many :authors, through: :book_authors

  validates :name, presence: true
  validates :name, length: { maximum: 25 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }

  def is_published=(is_published)
    self.published_on = (Date.current if is_published)
  end
end
