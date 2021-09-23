class License < ApplicationRecord
	belongs_to :story
	before_save :escape_license

	validates :license_name, length: { maximum: 150 }
	
	private

	def escape_license
		self.license_name = ActionController::Base.helpers.strip_tags(self.license_name) if self.license_name.present?
	end
end
