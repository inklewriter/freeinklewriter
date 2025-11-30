class StoryPrivacy < ApplicationRecord
  belongs_to :story

  before_save :set_token

  validates :user_private, inclusion: { in: ["public","private","public and searchable"] }

  private 

  def set_token
    unless self.bypass_token.present?
      chain = 'abcdefghijklmnopqrstuvwxyz0123456789'
      numberdigits = 15
      token = ''
      begin
        token = ''
        numberdigits.times do
          token << chain[rand(0..chain.size - 1)]
        end
      end while StoryPrivacy.exists?(bypass_token: token)

      self.bypass_token = token
    end
  end

end
