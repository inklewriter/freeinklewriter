class Story < ApplicationRecord
	after_create :assign_url_key
	after_save :process_stats, if: :data_is_present
	after_save :process_rating, if: :data_is_present
	before_save :sanitize_title

	belongs_to :user
	has_one :story_stat, dependent: :destroy

	validates :data, presence: true

	private

	def assign_url_key
		self.url_key = self.id
		self.save	
	end

	def data_is_present
		self.data.present?
	end

	def process_stats
		unless self.story_stat.present? 
			self.build_story_stat				
		end

		stat_results = Stats::Story.new(self).stats	

		stat_results.each do |k,v|
			self.story_stat[k]=v
		end

		self.story_stat.save

	end

	def process_rating
		
		if self.story_stat.present?						
			ratings = Rating::S_m_l_rating.new(self).calc
			ratings.each do |k,v|
				self.story_stat[k]=v
			end
			self.story_stat.save
		end
		
	end

	def sanitize_title
		if self.title.present?
			self.title = ActionController::Base.helpers.sanitize(self.title)
		end
	end

end
