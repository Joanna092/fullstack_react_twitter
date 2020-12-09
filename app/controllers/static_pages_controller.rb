# frozen_string_literal: true

class StaticPagesController < ApplicationController
  def home
    @user_data = authorize
    return unless @user_data

    render 'feedpage'
  end

  def login
    render 'home'
  end

  def myfeeds
    @user_data = authorize
    return unless @user_data

    render 'myfeeds'
  end

  private

  def authorize
    token = cookies.permanent.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    unless session
      redirect_to '/login'
      return
    end
    session.user.to_json
  end
end
