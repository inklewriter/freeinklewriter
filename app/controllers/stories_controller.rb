class StoriesController < ApplicationController

	# before_action :authenticate_user!, only: [:create, :update, :destroy] 
	before_action :user_logged_in, only: [:create, :update, :destroy]
	before_action :check_story_owner, only: [:update, :destroy]

	def show
		if Story.exists?(params[:id])
			@story = Story.find(params[:id])
			@data = {title: @story.title, data: @story.data}.to_json
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
