class StoriesController < ApplicationController

	# before_action :authenticate_user!, only: [:create, :update, :destroy] 
	before_action :user_logged_in, only: [:create, :update, :destroy]
	before_action :check_story_owner, only: [:update, :destroy]

	def show
		if Story.exists?(params[:id])
			@story = Story.find(params[:id])
			@data = {title: @story.title, data: @story.data}.to_json
			@author = @story.data["editorData"]["authorName"]
			@title = @story.title
			@story.data["stitches"][@story.data["initial"]]["content"].each do |elem|
				if elem.is_a?String 
					@first_stitch_content = elem
				end
			end

			finding_option(@story.data["stitches"][@story.data["initial"]])

		else
          @id = params[:id]
          render "stories/not_found"
		end
	end


	def index
		if current_user.present?
			@stories = set_user.stories
			render json:  @stories.to_a , :status => 200	  		
  		else
  			render "stories/cannot_display_stories"
  		end
	end

	def update
		@story = Story.find(params[:id])
		
		if params[:data].present? and params[:title].present?
			@story.data = params[:data]
			@story.title = params[:title]
			@story.save
			render json: { message: "ok" }, :status => 201
		else
			render json: {}, :status => 400
		end
		
	end


	def create		
		@story = set_user.stories.new(data: params[:data], title: params[:title])
		if @story.save
			render json: { title: @story.title, data: @story.data, url_key: @story.url_key }, :status => 201
		else
			render json: {}, :status => 400
		end		
	end

	def destroy 
		@story = Story.find(params[:id])
		if @story.destroy
			render json: { message: "ok" }, :status => 201
		else
			render json: {}, :status => 400
		end	
	end

	private 

	def find_next_stitch(current_stitch)
		found = false
  		current_stitch["content"].each do |elem|
			if elem.is_a?Hash 
				if elem.has_key?("divert")
					found = @story.data["stitches"][elem["divert"]]	
				end
			end
		end
		return found
  	end	

  	def is_an_option(current_stitch)
  		found = false
  		answer = []
  		current_stitch["content"].each do |elem|
			if elem.is_a?Hash 
				if elem.has_key?("option")
					answer << elem["option"]
					found = true												
				end
			end
		end
		if found
			return answer
		else
			return false
		end

  	end

  	  		
  	def finding_option(current_stitch)
  		 
  		if is_an_option(current_stitch)  			
  			@first_option_content = is_an_option(current_stitch)
  		else
  			if find_next_stitch(current_stitch)
  				finding_option(find_next_stitch(current_stitch))
  			else
  				@first_option_content = ""
  			end
  		end
  	end 

	

	def user_logged_in
		unless current_user.present?
			redirect_to root_path
		end
	end

	def set_user
		return current_user				
	end

	def check_story_owner
		unless set_user.id == Story.find(params[:id]).user.id
	      	redirect_to "stories/not_story_owner"
	    end	    
	end

	def story_params
    	params.require(:story).permit(:data, :title)
  	end

  		
  	
end
