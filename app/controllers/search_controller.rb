require 'json'

class SearchController < ApplicationController
  respond_to :json, :html

  def search
    dramas = Drama.search params[:q], fields: [:name, :non_english_name, :also_known_as]
    users = User.where(username: params[:q])
    casts = Cast.search params[:q], fields: [:name, :non_english_name]
    @results = {dramas: dramas, users: users, casts: casts}
    if @results
      respond_with(@results)
    else
      render json: { errors: "Oops, something went wrong." }
    end
  end

  def filter
    if params[:genres]
      if params[:genres].respond_to?(:map)
        genres = params[:genres].map {|x| JSON.parse(x)}.map {|x| x["name"]}
      else
        genres = JSON.parse(params[:genres])
      end
    end
    
    if params[:country]
      country = JSON.parse(params[:country])["name"]
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

end
