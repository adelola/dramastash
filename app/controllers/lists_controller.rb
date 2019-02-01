class ListsController < ApplicationController
  before_action :find_list, only: [:show, :update, :destroy]
  before_action :authenticate!, only: [:create, :destroy]

  respond_to :json, :html

  def index
  	find_user
  	@lists = @user.lists.where.not(name: 'Favorites')
    respond_with(@lists)
  end

  def show
    @dramas = @list.dramas.map { |drama| drama.add_image_url }
    respond_with({list: @list, dramas: @dramas})
  end

  def check_fave
    drama = Drama.find_by(id: params[:drama_id])
    user = User.find_by(id: params[:user_id])
    fav_list = user.lists.find_by(name: 'Favorites')
    if fav_list.dramas.include?(drama)
      respond_with({status: true, fav_list_id: fav_list.id})
    else
      respond_with({status: false, fav_list_id: fav_list.id})
    end
  end

  def create
  	@list = List.new(list_params)
    @list.user = find_user
  	if @list.save
      @list.create_activity :created, owner: @list.user, params: {username: @list.user.username, list:@list.name}
      render json: { list: @list}
  	else
  	  render json: { errors: "Oops, something went wrong." }
  	end
  end

  def update
    if @list.update_attributes(list_params)
      render json: { message: "List successfully updated" }
    else
      render json: { errors: "Oops, something went wrong." }
    end
  end

  def destroy
  	if @list.destroy
  	  render json: { message: "List successfully created" }
  	else
      render json: { errors: "Oops, something went wrong." }
    end
  end

  def featured
    lists = List.where(user_id: 1)

    results = lists.map do |list|
      {list:list.name, dramas:list.dramas}
    end
    respond_with(results)

  end


  private

  def find_user
  	@user = User.find(params[:user_id])
  end

  def find_list
  	find_user
  	@list = @user.lists.find(params[:id])
  end

  def list_params
    params.permit(:name, :description)
  end


end
