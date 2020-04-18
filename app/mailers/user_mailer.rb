class UserMailer < ApplicationMailer

	def test(id)
		@user = User.find_by(email: id)
		mail(to: @user.email, subject: "email de test")
	end
end
