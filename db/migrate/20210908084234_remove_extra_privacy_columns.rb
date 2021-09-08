class RemoveExtraPrivacyColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :story_privacies, :flagged_for_privacy
    remove_column :story_privacies, :admin_private
  end
end
