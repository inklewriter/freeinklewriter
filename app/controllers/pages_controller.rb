class PagesController < ApplicationController

	def index
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
