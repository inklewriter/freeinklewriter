class ApplicationController < ActionController::Base
	include Pundit
	rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
	# This is the root controller
	# All app wide methods may append here
  
  	private

  	def user_not_authorized(exception)
	    policy_name = exception.policy.class.to_s.underscore

	    respond_to do |format|
	      format.html { 
	        flash[:flash_error] = t "#{policy_name}.#{exception.query}", scope: "pundit", default: :default
	        redirect_to root_path
	       }
	      format.json { render json: {message: "Not Authorized"}, status: 401 }
	    end	   
	end
  	

end
