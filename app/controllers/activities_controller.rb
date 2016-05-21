class ActivitiesController < ApplicationController
  respond_to :json, :html
  before_action :authenticate!
  
  def index
    @activities = PublicActivity::Activity.where(owner_id: current_user.following_ids, owner_type:"User").order('created_at DESC').limit(15)
      .select do |activity|
        !activity.trackable.nil?
      end
    render json:{activities: @activities}
  end

end