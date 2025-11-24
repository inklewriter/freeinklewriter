class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #:recoverable, :rememberable, :validatable
  devise :database_authenticatable, :registerable, :rememberable, :recoverable
         
  has_many :stories, dependent: :destroy
  has_one :admin, dependent: :destroy


  validates :email, presence: true
  validates :email, format: { with: /\A\S+@.+\.\S+\z/ }
  validates :email, uniqueness: true
  
end
