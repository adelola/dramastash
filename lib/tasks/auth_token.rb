require 'jwt'

module AuthToken
  def self.issue_token(payload, exp=24.hours.from_now)
    payload['exp'] = exp.to_i 
    JWT.encode(payload, Rails.application.secrets.client_secret, 'HS256')
  end

  def self.valid?(token)
    begin 
      JWT.decode(token, Rails.application.secrets.client_secret, true, { :algorithm => 'HS256' })
    rescue
      false
    end 
  end

  def token_status
    token = params[:token]
    if self.valid?(token)
      head 200
    else
      head 401
    end
  end

end