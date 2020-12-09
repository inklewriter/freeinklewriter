class Story < ApplicationRecord
	after_create :assign_url_key

	belongs_to :user
	has_one :story_stat, dependent: :destroy

	private

	def assign_url_key
		self.url_key = self.id
		self.save	
	end

end
