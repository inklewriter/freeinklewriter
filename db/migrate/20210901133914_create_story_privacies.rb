class CreateStoryPrivacies < ActiveRecord::Migration[5.2]
  def change
    create_table :story_privacies do |t|
      t.boolean :user_private, default: false
      t.boolean :flagged_for_privacy, default: false
      t.boolean :admin_private, default: false
      t.references :story, foreign_key: true

      t.timestamps
    end
  end
end
