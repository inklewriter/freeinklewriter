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

		@first_story = Story.first
		@last_story = Story.last

	end

	def score_search
		# https://stackoverflow.com/questions/42686139/strong-parameters-permit-an-array-of-symbols
		if %i( minwords maxwords minday maxday minmonth maxmonth minyear maxyear).all? { |key| params[:rating_search][key].present? }
			
			subselection = Story.joins(:story_stat).where(created_at: Date.civil(params[:rating_search][:minyear].to_i, params[:rating_search][:minmonth].to_i, params[:rating_search][:minday].to_i)..Date.civil(params[:rating_search][:maxyear].to_i, params[:rating_search][:maxmonth].to_i, params[:rating_search][:maxday].to_i), story_stats: {total_words: params[:rating_search][:minwords].to_i..params[:rating_search][:maxwords].to_i}).order(score: :desc).first(10)
			subselection_ids = subselection.map {|e| [e.id, e.title, e.data["editorData"]["authorName"], e.user.email, e.story_stat.score]}
			if subselection_ids.present? 
				message = "Search successful. Hourray some results have been found"
			else
				message = "Search successful. Yet it returned no record."
			end
			render json: {message: message, story_selection: subselection_ids}, status: 200
		else
			render json: {message: "search failed. No sufficient params"}, status: 400
		end
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
