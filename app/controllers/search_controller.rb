class SearchController < ApplicationController
  respond_to :json, :html

  def search
    dramas = Drama.search params[:q], fields: [:name, :also_known_as]
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
      genres = params[:genres].map {|x| x[:value]}
    end
    if params[:country]
      country =  params[:country][0][:name]
    end

    if genres
      dramas = genres.map do |genre|
        Genre.find_by(name: genre).dramas
      end
      @results = dramas.inject(:&)
      if country
        @results = @results.select { |drama| drama.country == country}
      end
    elsif country && !genres
      @results = Drama.where(country: country)
    else
      @results = Drama.fetch
    end

    if @results 
       render json: { dramas: @results}
    else
      render json: { message: "No results found" }
    end

  end

end
