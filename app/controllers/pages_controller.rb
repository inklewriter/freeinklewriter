class PagesController < ApplicationController
	
	before_action :authenticate_user, only: ["user_account", "story_params", "update_story_params"]
	before_action :set_user, only: ["user_account", "story_params", "update_story_params"]  
	before_action :set_story, only: ["story_params", "update_story_params"]
	# static pages here

	def community
		
	end

	

	def how_it_works
	end

    def privacy 
		respond_to do |format|
				format.html 
		end
    end

	def health
		@status = {}
		@status[:database_connected] = ::ActiveRecord::Base.connection_pool.with_connection(&:active?) rescue false

		respond_to do |format|
				format.html 
				format.json {render json: @status}
		end

	end

	# with authentication and validation

	def user_account
		
	end

	def story_params
		
		authorize @story

		unless @story.license.present?
			@story.build_license
			@story.license.save
		end
		unless @story.story_privacy.present?
			@story.build_story_privacy
			@story.story_privacy.save
		end
		
	end

	def update_story_params
		
		authorize @story		

		if @story.update(story_params_attributes)
			flash[:flash_success] = "story parameters saved"
			redirect_to user_account_path
		else
			render "story_params"
		end
	end

	private 

	def pundit_user
	    @user = User.includes(:stories).find_by(id: current_user.id)
	end  

	def set_user
	    @user = current_user# || current_client    
	end

	def set_story
		if Story.exists?(params[:id])
			@story = Story.find(params[:id])
		else
			flash[:flash_error] = "story doesn't exist"
			redirect_to request.referer ||root_path 
		end
	end

	def story_params_attributes
		params.require(:story).permit(story_privacy_attributes: [:user_private, :id, :bypass_token], license_attributes: [:name, :id])
	end

	def authenticate_user
		unless user_signed_in?
			flash[:flash_error] = "Please authenticate to access this page"
			redirect_to root_path
		end
	end

	
end
