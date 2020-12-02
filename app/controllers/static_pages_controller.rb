class StaticPagesController < ApplicationController
  # before_action :authorize, except: [:home]

  def home
    @user_data = authorize
    return if not @user_data
    render 'feedpage'
  end

  def login
    render 'home'
  end

  def myfeeds
    @user_data = authorize
    return if not @user_data
    render 'myfeeds'
  end

  private

  def authorize
    token = cookies.permanent.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    if !session
      redirect_to '/login'
      return
    end
    return session.user.to_json
  end

end
