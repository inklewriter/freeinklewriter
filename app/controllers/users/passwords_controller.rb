# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController



  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?
    
    if successfully_sent?(resource)
      render json: { message: "Success, an email has been sent over to you" }, status: 200
    else
      render json: { errors: "Invalid or not found email address." }, status: 200
    end
    
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
