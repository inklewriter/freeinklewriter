class UserMailer < ApplicationMailer

	def test(id)
		@user = User.find_by(email: id)
		# testing if USER email field is a real email address. Regexp taken here http://emailregex.com/
		# then email is sent
		if @user.match /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
			mail(to: @user.email, subject: "email de test")
		end
	end
end
