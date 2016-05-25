class DramasController < ApplicationController
  respond_to :json, :html

  def all
    @dramas = Drama.all.order(:non_english_name).page(params[:page]).per(24)
    render 'dramas/all'
  end

  def delete
    drama = Drama.find(params[:id])
    drama.destroy
    redirect_to all_path
  end

  def index
    @dramas = Drama.fetch.page(params[:page]).per(24)
    @count = Drama.fetch.count
    respond_with(items:@dramas, count: @count)
  end

  def show
    @drama = Drama.find_by(id: params[:id])
    @casts = @drama.casts
    respond_with(drama: @drama, casts: @casts)
  end

  def create
    list = List.find_by(id: params[:list_id])
    drama = Drama.find_by(id: params[:id])
    if list.dramas.find_by(id: drama.id)
      render json: { message: "Drama is already in #{list.name}" }
    elsif list.name == 'Favorites' && list.dramas.count >= 5
      render json: { message: "You have five favorites. Remove one to add one." }
    else
      new_list_drama = drama.add_to_list(list)
      if new_list_drama.save
        drama.create_activity :added, owner: list.user, params: {username: list.user.username, drama: drama, list: list}
        list.create_activity key: 'Drama', owner: @current_user
        render json: { message: "Drama successfully added to #{list.name}" }
      else
        render json: { errors: "Oops, something went wrong." }
      end
    end
  end

  def destroy
    drama = ListDrama.find_by({drama_id: params[:id], list_id: params[:list_id]})
    if drama.destroy
      render json: { message: "Drama successfully deleted." }
    else
      render json: { errors: "Oops, something went wrong." }
    end
  end
end
