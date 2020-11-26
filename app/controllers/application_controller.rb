class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

#new 
    def auth
        token = cookies.permanent.signed[:twitter_session_token]
        session = Session.find_by(token: token)    
          if session
          @user = session.user
          redirect_to '/feedpage'
        else 
         # render json: { authenticated: false }, status: :bad_request
        end
      end
end
