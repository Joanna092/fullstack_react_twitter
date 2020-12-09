# frozen_string_literal: true

class AddUserIdToTweets < ActiveRecord::Migration[6.0]
  def change
    add_belongs_to :tweets, :user, index: true, foreign_key: true
  end
end
