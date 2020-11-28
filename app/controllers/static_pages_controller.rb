class StaticPagesController < ApplicationController
  before_action :authorize, except: [:home]

  def home
    render 'home'
  end

  def feedpage
    render 'feedpage'
  end

  def myfeeds
    render 'myfeeds'
  end

  private

  def authorize
    token = cookies.permanent.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    if !session
      redirect_to :root
      return
    end
    @auth_data = session
  end

end
