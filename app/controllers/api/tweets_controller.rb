# frozen_string_literal: true

module Api
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all.reverse
      render 'api/tweets/index'
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets.reverse
        render 'api/tweets/index'
      else
        render json: { tweets: [] }
      end
    end

    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session
        user = session.user
        @tweet = user.tweets.new(tweets_params)

        if @tweet.save
          render json: {
            tweet:
              {
                username: user.username,
                message: @tweet.message
              }
          }
        else
          render json: { success: false }
        end
      else
        render json: { success: false }
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      @tweet = Tweet.find_by(id: params[:id])

      if !session
        render json: { success: false }
      elsif @tweet&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def tweets_params
      params.require(:tweet).permit(:message)
    end
  end
end
