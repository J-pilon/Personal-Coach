# frozen_string_literal: true

# User model for authentication
# Handles user authentication with email and password
# Has one profile for user details and many tasks/smart_goals
class User < ApplicationRecord
  has_secure_password

  has_one :profile, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  after_create :create_profile

  private

  def create_profile
    build_profile.save!
  end
end
