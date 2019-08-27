class Story < ApplicationRecord
	before_create :assign_url_key

	belongs_to :user

	private

	def assign_url_key
		self.url_key = self.id
	end

end
