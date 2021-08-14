class PagesController < ApplicationController

	# static pages here

	def community
		
	end

	def user_account
		@user = User.includes(:stories).find_by(id: current_user.id)
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
end
