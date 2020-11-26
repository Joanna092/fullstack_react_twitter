class StaticPagesController < ApplicationController
  before_action :auth

    def home
      render 'home'
    end

  # def feedpage
     # @auth_data = authorize
   #   render 'feedpage'
   # end

    def myfeeds
     # @auth_data = authorize
      render 'myfeeds'
    end 
    
=begin 
   def authorize
      token = cookies.permanent.signed[:twitter_session_token]
      session = Session.find_by(token: token)  

     if session
        return {
          user: session.user,
        }
     else  
        return { authenticated: false }
     end  
end
=end 

  end
