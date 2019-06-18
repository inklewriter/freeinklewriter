class DeviseOverrides::SessionsController < Devise::SessionsController
    # Respond only to JSON calls
    clear_respond_to
    respond_to :json
  end


