class ApplicationController < ActionController::Base
	include Pundit
	rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
	# This is the root controller
	# All app wide methods may append here
  

  before_action :set_locale
  
  

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

  
  
  def set_locale
    locale_from_cookie = parse_language_from_cookie
<<<<<<< HEAD
=======
    p "FROM COOKIE #{locale_from_cookie}"
>>>>>>> c76cbb8297a823d224921ece4038077a3c532ad4
    if locale_from_cookie.present? && I18n.available_locales.include?(locale_from_cookie.to_sym)
      # language has been set by user and it is a known locale for the backend
      I18n.locale = locale_from_cookie.to_sym
      return
    end

    locale_from_browser = parse_language_from_browser
<<<<<<< HEAD
=======
    p "FROM BROWSER #{locale_from_browser}"
>>>>>>> c76cbb8297a823d224921ece4038077a3c532ad4
    if locale_from_browser.present? && I18n.available_locales.include?(locale_from_browser.to_sym)
      # if a language is found in browser then we use it
      I18n.locale = locale_from_browser.to_sym
      return
    end

    # else we default to the I18n.default_language
    I18n.locale = I18n.default_locale

    # Here we don't create the cookie, we update the cookie only from a hard selection
    # from the user
    # need to create a specific route to update locale in cookie

  end

  def parse_language_from_cookie
    if cookies[:_inklewriter_language].present?
      cookies[:_inklewriter_language]  
    else 
      nil    
    end
  end

  def parse_language_from_browser
    browser_locale = request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/)[0]
    if browser_locale.present?
      browser_locale
    else
      nil 
    end
  end

  def update_language_cookie(lang = I18n.default_locale)
    # this method is called from the community#update_language action
    cookies[:_inklewriter_language] = { 
      value: lang, 
      expires: Time.now + 360.days
    }
  end


  # below is only used if locale is set from the URL
  # def default_url_options
  #   { locale: I18n.locale }
  # end

  # around action syntax
  # def set_locale(&action) 
    # here we define the locale     
    # I18n.with_locale(locale, &action)
  # end   

end
