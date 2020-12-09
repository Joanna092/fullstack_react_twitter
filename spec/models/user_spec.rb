# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.create' do
    it 'should have many sessions' do
      user = FactoryBot.create(:user)
      expect(user.sessions).to eq([])
    end

    it 'should have many tweets' do
      user = FactoryBot.create(:user)
      expect(user.tweets).to eq([])
    end

    it 'must have the presence of email' do
      expect do
        FactoryBot.create(:user, email: nil)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have the presence of username' do
      expect do
        FactoryBot.create(:user, username: nil)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have the presence of password' do
      expect do
        FactoryBot.create(:user, password: nil)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username with min. 3 characters' do
      expect do
        FactoryBot.create(:user, username: 'c' * 2)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a username with max. 64 characters' do
      expect do
        FactoryBot.create(:user, username: 'c' * 65)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password with min. 8 characters' do
      expect do
        FactoryBot.create(:user, password: 'c' * 7)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password with max. 64 characters' do
      expect do
        FactoryBot.create(:user, password: 'c' * 65)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a email with min. 5 characters' do
      expect do
        FactoryBot.create(:user, email: 'c' * 4)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a email with max. 500 characters' do
      expect do
        FactoryBot.create(:user, email: 'c' * 501)
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique email' do
      FactoryBot.create(:user, email: 'unique@test.com')

      expect do
        FactoryBot.create(:user, email: 'unique@test.com')
      end.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique username' do
      FactoryBot.create(:user, username: '12345678')

      expect do
        FactoryBot.create(:user, username: '12345678')
      end.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
