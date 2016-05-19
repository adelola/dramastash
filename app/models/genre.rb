class Genre < ActiveRecord::Base
  has_many :drama_genres
  has_many :dramas, through: :drama_genres
end
