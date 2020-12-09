class AddScore < ActiveRecord::Migration[5.2]
  def change
  	remove_column :story_stats, :score_short
  	remove_column :story_stats, :score_medium
  	remove_column :story_stats, :score_long
  	add_column :story_stats, :score, :float
  end
end
