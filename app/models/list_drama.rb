class ListDrama < ActiveRecord::Base
  include PublicActivity::Common

  belongs_to :drama
  belongs_to :list
end