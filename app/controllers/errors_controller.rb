class ErrorsController < ApplicationController

	# handling custom errors

	def not_found
    respond_to do |format|
      format.html {render status: 404}
      format.json {render json: {}, status: 404}
    end
  end

  def internal_server_error
    respond_to do |format|
      format.html {render status: 500}
      format.json {render json: {}, status: 500}
     end 
  end

end
