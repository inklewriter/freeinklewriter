class Admin::AdminpagesController < Admin::AuthorizerController

	# Be careful to make every admin controller a child of Admin::AuthorizerController
	# as this is where the Admins authorization happen

	# in order to make a preexisting user an admin
	# open Rails console and type "Admin.create(user_id: XXX)" with the user id
	# and voila 

	# Here lies the adhoc admin pages. 
	# specific logic is handled by specific Admin namespaced controllers in controllers/admin folder

	def index
	end
end
