class StoriesController < ApplicationController

	# before_action :authenticate_user!, only: [:create, :update, :destroy] 
	# before_action :check_story_owner, only: [:update, :destroy]
	# before_action :current_user_x_story_id, only: [:show, :destroy]


	def index
		@user = current_user
		@stories = @user.stories

		@stories.each do |s|
			s.url_key = s.id
		end
		
		# if @stories.empty?
  #   		render json: {  }, :status => 200
  #   	else
  #   		render json: { @stories.to_a }, :status => 200
  #   	end
  		if @stories.empty?
  			render json: [], :status => 200
  		else
  			render json:  @stories.to_a , :status => 200
  		end
	end

	# def update
	# 	@user = current_user

	# end


	def create
		@user = current_user
		@story = @user.stories.new(data: params[:data], title: params[:title])

		if @story.save
			render json: { title: @story.title, data: @story.data }, :status => 201
		else
			render json: {}, :status => 400
		end
		
	end

	private 

	def check_story_owner
		unless current_user.id == Story.find(params[:id]).user.id
	      	redirect_to root_path
	    end	    
	end

	def current_user_x_story_id
		unless current_user.id == params[:user_id]
      		redirect_to root_path
    	end
	end

	def story_params
    	params.require(:story).permit(:data)
  	end
end
