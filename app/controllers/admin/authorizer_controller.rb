class Admin::AuthorizerController < ApplicationController

	before_action :authorize_admin


	private

	def authorize_admin
		unless current_user.present? and current_user.admin.present?
			redirect_to root_path
		end
	end

end
