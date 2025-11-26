class Story < ApplicationRecord

	after_create :assign_url_key
	after_create :generate_privacy
	after_save :process_stats, if: :data_is_present
	after_save :process_rating, if: :data_is_present
	
	before_validation :set_a_default_title
	before_save :sanitize_title
	before_save :sanitize_author
	# before_save :sanitize_stitches

	belongs_to :user
	has_one :story_stat, dependent: :destroy
	has_one :story_privacy, dependent: :destroy
	has_one :license, dependent: :destroy

	accepts_nested_attributes_for :story_privacy, :license

	validates :data, presence: true
	validates :title, presence: true

	def sanitize_s
		
		if self.data.present?			
			nh = {}
			olds = self.data
			
			olds.each do |k1,v1|				
				if k1 == "stitches"						
					nh[k1] = {}

					v1.each do |k2,v2|						
						nh[k1][k2] = {}

						v2.each do |k3,v3|							

							if k3 == "content"
								cont = []
								v3.each do |elem|
									if elem.is_a?String
										st = ActionController::Base.helpers.sanitize(elem)
										cont << st
									elsif elem.is_a?Hash
										sh = {}
										elem.each do |k4,v4|
											if k4 == "option"	
												sh[k4] = ActionController::Base.helpers.sanitize(v4)
											else
												sh[k4] = v4												
											end											
										end											
										cont << sh								
									else
										cont << elem
									end
								end
								nh[k1][k2][k3] = cont
							else
								nh[k1][k2][k3] = v3
							end

						end

					end	
				else 
					nh[k1] = v1					
				end				
			end
			return nh
		else
			return {}
		end
		
	end
	

	private

	def assign_url_key
		self.url_key = self.id
		self.save	
	end

	def generate_privacy
		self.build_story_privacy(user_private: "public")
		self.story_privacy.save
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

	def set_a_default_title
		self.title = "Untitled Story" unless self.title.present?
	end

	def sanitize_title
		if self.title.present?
			self.title = ActionController::Base.helpers.sanitize(self.title)
		end
	end

	def sanitize_author
		if self.data.present? && self.data["editorData"].present? && self.data["editorData"]["authorName"].present?
			self.data["editorData"]["authorName"] = ActionController::Base.helpers.sanitize(self.data["editorData"]["authorName"], tags: [])
			self.data_will_change!  # Mark JSON column as changed
		end
	end

	def sanitize_stitches
		
		if self.data.present?			
			nh = {}
			olds = self.data
			
			olds.each do |k1,v1|				
				if k1 == "stitches"						
					nh[k1] = {}

					v1.each do |k2,v2|						
						nh[k1][k2] = {}

						v2.each do |k3,v3|							

							if k3 == "content"
								cont = []
								v3.each do |elem|
									if elem.is_a?String
										st = ActionController::Base.helpers.sanitize(elem)
										cont << st
									elsif elem.is_a?Hash
										sh = {}
										elem.each do |k4,v4|
											if k4 == "option"	
												sh[k4] = ActionController::Base.helpers.sanitize(v4)
											else
												sh[k4] = v4												
											end											
										end											
										cont << sh								
									else
										cont << elem
									end
								end
								nh[k1][k2][k3] = cont
							else
								nh[k1][k2][k3] = v3
							end

						end

					end	
				else 
					nh[k1] = v1					
				end				
			end
			self.data = nh
		end
		
	end

end
