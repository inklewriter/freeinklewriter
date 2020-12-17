class CreateStoryStats < ActiveRecord::Migration[5.2]
  def change
    create_table :story_stats do |t|
      t.integer :stitches
      t.integer :with_choice
      t.integer :with_condition
      t.integer :with_flag
      t.float :avg_words
      t.integer :total_words
      t.integer :advanced_syntax
      t.float :score_short
      t.float :score_medium
      t.float :score_long

      t.timestamps
    end
  end
end
