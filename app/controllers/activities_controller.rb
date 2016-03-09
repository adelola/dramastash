class ActivitiesController < ApplicationController
  respond_to :json, :html
  
  def index
    @activities = PublicActivity::Activity.order('created_at DESC').where('id < ?', params[:id]).limit(5)
      .select do |activity|
        !activity.trackable.nil?
      end
    render json:{activities: @activities}

  end
end