class UsersController < ApplicationController
  require 'auth_token'
  before_action :authenticate!, only: [:index, :show]
  respond_to :json, :html

  def index
    @users = User.all
    respond_with(@users)
  end

  def new
    @user = User.new
  end

  def create
    user = User.new(user_params)
    if user.save
      token = AuthToken.issue_token({ user_id: user.id })
      render json: { user: user,
                   token: token }
    else
      render json: { errors: user.errors.full_messages }
    end
  end

  def show
    @user     = User.find(params[:id])
    @lists    = @user.lists.where.not(name: '*9psuu7wDcvUi*')
    @fav_list = @user.lists.find_by(name: '*9psuu7wDcvUi*')
    @fav_dramas = @fav_list.dramas
    respond_with({user: @user, lists: @lists, fav_list: @fav_list, fav_dramas: @fav_dramas})
  end

  # def following
  #   @title = "Following"
  #   @user  = User.find(params[:id])
  #   @users = @user.following
  #   render 'show_follow'
  # end

  # def followers
  #   @title = "Followers"
  #   @user  = User.find(params[:id])
  #   @users = @user.followers
  #   render 'show_follow'
  # end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
    end
end
