class StoriesController < ApplicationController

	# before_action :authenticate_user!, only: [:create, :update, :destroy] 
	
	# before_action :current_user_x_story_id, only: [:show, :destroy]
	before_action :set_user, only: [:create, :update, :index, :destroy]
	before_action :check_story_owner, only: [:update, :destroy]

	def show
		if Story.exists?(params[:id])
			@story = Story.find(params[:id])
			@data = {title: @story.title, data: @story.data}.to_json
		else
		render "stories/not_found"	
		end
	end


	def index
		@stories = @user.stories		
  		if @stories.empty?
  			render json: [], :status => 200
  		else
  			render json:  @stories.to_a , :status => 200
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
		@story = @user.stories.new(data: params[:data], title: params[:title])
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

	

	# def current_user_x_story_id
	# 	unless current_user.id == params[:user_id]
 #      		redirect_to root_path
 #    	end
	# end

	def set_user
		@user = current_user
	end

	def check_story_owner
		unless @user.id == Story.find(params[:id]).user.id
	      	redirect_to root_path
	    end	    
	end

	def story_params
    	params.require(:story).permit(:data, :title)
  	end

  	
end
