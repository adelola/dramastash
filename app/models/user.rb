class User < ActiveRecord::Base
  require 'auth_token'

  def search_data
    as_json only: [:first_name, :last_name, :email, :username]
  end

  has_secure_password
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  has_many :lists

  has_many :active_relationships, class_name:  "Relationship", foreign_key: "follower_id", dependent:   :destroy
  has_many :following, through: :active_relationships, source: :followed

  has_many :passive_relationships, class_name:  "Relationship", foreign_key: "followed_id", dependent:   :destroy
  has_many :followers, through: :passive_relationships, source: :follower

  has_many :reviews, foreign_key: :reviewer_id
  has_many :reviewed_dramas,  through: :reviews, source: :drama

  has_many :ratings, foreign_key: :rater_id
  has_many :rated_dramas, through: :ratings, source: :drama

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true, length: { maximum: 20 }, uniqueness: true
  validates :email, presence: true, uniqueness: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, length: { minimum: 6 }

  after_create :create_faves_list, :create_watch_list, :create_watching_list, :create_watched_list

  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def generate_auth_token
    payload = { user_id: self.id }
    AuthToken.issue_token(payload)
  end

  private
    def create_faves_list
      List.create(name: 'Favorites', description:'Greatest of All Time', user_id: self.id)
    end

    def create_watch_list
    	List.create(name: 'Watch', description:'Queued Dramas', user_id: self.id)
    end

    def create_watching_list
    	List.create(name: 'Watching', description:'Dramas in Progress', user_id: self.id)
    end

    def create_watched_list
    	List.create(name: 'Watched', description:'Dramas completed', user_id: self.id)
    end
end
