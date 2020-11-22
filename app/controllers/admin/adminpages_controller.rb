class Admin::AdminpagesController < Admin::AuthorizerController

	# Be careful to make every admin controller a child of Admin::AuthorizerController
	# as this is where the Admins authorization happen

	def index
	end
end
