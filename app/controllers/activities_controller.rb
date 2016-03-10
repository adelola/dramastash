class ActivitiesController < ApplicationController
  respond_to :json, :html
  
  def index
    @activities = PublicActivity::Activity.order('created_at DESC').where(owner_id: params[:id], owner_type:"User").limit(5)
      .select do |activity|
        !activity.trackable.nil?
      end
    render json:{activities: @activities}
  end

end