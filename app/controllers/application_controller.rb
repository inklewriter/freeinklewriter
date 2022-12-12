class ApplicationController < ActionController::Base
	include Pundit
	rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
	# This is the root controller
	# All app wide methods may append here
  around_action :set_locale

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

  def default_url_options
    { locale: I18n.locale }
  end
  	
  def set_locale(&action) 

    locale = params[:locale] || I18n.default_locale
    # locale = params[:locale] || locale_from_header || I18n.default_locale
    
    # if curr_user.present? && curr_user.respond_to?("last_used_locale") && curr_user.last_used_locale != locale.to_s
    #      curr_user.update_columns(last_used_locale: locale.to_s)
    # end
       
    I18n.with_locale(locale, &action)
  end  

  def locale_from_header
      parsed_locale = params[:locale] || request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/)[0]
      I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end

end
