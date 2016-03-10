class Rating < ActiveRecord::Base
  include PublicActivity::Common

  belongs_to :drama
  belongs_to :rater, class_name: "User"

  validates :weight, numericality: { only_integer: true, less_than_or_equal_to: 5 }

  def review
    Review.find_by({drama: self.drama, reviewer: self.rater})
  end

  def update_review
    review.update(rating_weight: self.weight, rating_id: self.id) if review
  end
end