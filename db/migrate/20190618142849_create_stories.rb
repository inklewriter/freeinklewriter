class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories do |t|
      t.references :user, foreign_key: true
      t.json :data

      t.timestamps
    end
  end
end
