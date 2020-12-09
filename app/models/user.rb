# frozen_string_literal: true

class User < ApplicationRecord
  has_many :sessions
  has_many :tweets

  validates :username, length: { minimum: 3, maximum: 64 }, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 64 }, presence: true
  validates :email, length: { minimum: 5, maximum: 500 }, presence: true

  after_validation :hash_password

  private

  def hash_password
    self.password = BCrypt::Password.create(password)
  end
end
