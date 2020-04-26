class CustomDeviseMailerPreview < ActionMailer::Preview
  
  def password_change
  	CustomDeviseMailer.password_change(User.all.sample, {})
  end

  def reset_password_instructions
    CustomDeviseMailer.reset_password_instructions(User.all.sample, "faketoken")
  end
end