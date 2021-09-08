class ModifyUserPrivacy < ActiveRecord::Migration[5.2]
  def change
    change_column :story_privacies, :user_private, :string, default: "public"
  end
end
