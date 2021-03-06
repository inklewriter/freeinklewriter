class Admin::AdminpagesController < Admin::AuthorizerController

	# Be careful to make every admin controller a child of Admin::AuthorizerController
	# as this is where the Admins authorization happen

	# in order to make a preexisting user an admin
	# open Rails console and type "Admin.create(user_id: XXX)" with the user id
	# and voila 

	# Here lies the adhoc admin pages. 
	# specific logic is handled by specific Admin namespaced controllers in controllers/admin folder

	def index
		
		@current_year = Time.now.year.to_i
		@last_three_years = {@current_year.to_s => stories_created_monthly_in(@current_year), (@current_year-1).to_s => stories_created_monthly_in(@current_year-1), (@current_year-2).to_s => stories_created_monthly_in(@current_year-2) }

	end



	private

	def stories_created_monthly_in(year)
		monthly_stories = {}
		if year.to_i.in?(2000..2050)
			12.times do |m|
				monthly_stories[(m+1).to_s] = Story.where(created_at: Date.civil(year, m+1, 1)..Date.civil(year, m+1, -1)).count
			end
		end	
		return monthly_stories
	end
end
