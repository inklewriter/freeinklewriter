class AddBypassTokenToStoryPrivacies < ActiveRecord::Migration[5.2]
  def change
    add_column :story_privacies, :bypass_token, :string
  end
end
