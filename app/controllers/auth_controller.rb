class AuthController < ApplicationController
  require 'auth_token'

  def login
  	user = User.find_by(username: params[:username]) 
    if user && user.authenticate(params[:password])
      render json: { user: user, token: user.generate_auth_token }
    else
      render json: { error: 'Invalid username/password combination' }, status: :unauthorized
    end
  end

end 