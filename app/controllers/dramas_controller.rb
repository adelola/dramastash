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
    if params[:genre]
      genres = params[:genre].split(",")
    end

    if params[:country]
      country = params[:country]
    end

    if genres
      dramas = genres.map do |genre|
        Genre.find_by(name: genre).dramas
      end
      dramas_for_genre = dramas.inject(:&)
      @results = Kaminari.paginate_array(dramas_for_genre).page(params[:page]).per(24)
      @count = dramas_for_genre.count
      if country
        dramas_for_country_and_genre = dramas_for_genre.select { |drama| drama.country == country}
        @results= Kaminari.paginate_array(dramas_for_country_and_genre).page(params[:page]).per(24)
        @count = dramas_for_country_and_genre.count
      end
    elsif country && !genres
      dramas_for_country_only = Drama.where(country: country)
      @results = Kaminari.paginate_array(dramas_for_country_only).page(params[:page]).per(24)
      @count = dramas_for_country_only.count
    else
      all_dramas = Drama.fetch
      @results = all_dramas.page(params[:page]).per(24)
      @count = all_dramas.count
    end

    if @results
       render json: { items: @results, count: @count}
    else
      render json: { message: "No results found" }
    end
  end

  def show
    @drama = Drama.find_by(id: params[:id])
    @casts = @drama.casts
    respond_with(drama: @drama, casts: @casts)
  end

  def create
    list = List.find_by(id: params[:list_id])
    drama = Drama.find_by(id: params[:id])

    if list.name == '*9psuu7wDcvUi*' && list.dramas.count >= 5
      render json: { message: "Aigoo, your Favorities Bar is full." }
    elsif list.name == '*9psuu7wDcvUi*' && list.dramas.find_by(id: drama.id)
      render json: { message: "Drama already in your Favorites Bar."}
    elsif list.name == '*9psuu7wDcvUi*' && list.dramas.count < 5 && !list.dramas.find_by(id: drama.id)
      list.dramas << drama
      drama.create_activity :favorited, owner: list.user, params: {username: list.user.username, drama: drama}
      render json: { message: "Drama added to your Favorites Bar.", status: true}
    elsif list.dramas.find_by(id: drama.id)
      render json: { message: "Drama is already in #{list.name}" }
    else
      new_list_drama = drama.add_to_list(list)
      if new_list_drama.save
        drama.create_activity :added, owner: list.user, params: {username: list.user.username, drama: drama, list: list}
        render json: { message: "Drama successfully added to #{list.name}" }
      else
        render json: { errors: "Oops, something went wrong." }
      end
    end
  end

  def destroy
    drama = ListDrama.find_by({drama_id: params[:id], list_id: params[:list_id]})
    if drama.destroy
      render json: { message: "Drama unfavorited." }
    else
      render json: { errors: "Oops, something went wrong." }
    end
  end
end
