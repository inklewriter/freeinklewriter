class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #:recoverable, :rememberable, :validatable
  devise :database_authenticatable, :registerable, :rememberable
         
  has_many :stories, dependent: :destroy

  validates :password, presence: true
  validates :email, presence: true
  validates :email, format: { with: /\A\S+@.+\.\S+\z/ }
  
end
