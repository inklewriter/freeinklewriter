class Story < ApplicationRecord
	after_create :assign_url_key

	belongs_to :user

	private

	def assign_url_key
		self.url_key = self.id
		self.save	
	end

end
