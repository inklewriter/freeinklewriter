class AddToStoryStat < ActiveRecord::Migration[5.2]
  def change
  	add_column :story_stats, :with_end, :integer
  	add_column :story_stats, :with_image, :integer
  	add_column :story_stats, :with_divert, :integer
  	add_column :story_stats, :with_fake_choice, :integer
  end
end
