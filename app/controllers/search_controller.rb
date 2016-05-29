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

end
