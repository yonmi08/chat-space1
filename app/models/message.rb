class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :text, presence: true, unless: :image?
  mount_uploader :image, ImageUploader # app/uploaders/image_uploader.rb で初登場
end
