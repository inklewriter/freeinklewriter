class Story < ApplicationRecord
	belongs_to :user
	attr_accessor :url_key
	

end
