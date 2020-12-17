class AddForeignKeyToStoryStats < ActiveRecord::Migration[5.2]
  def change
    add_reference :story_stats, :story, foreign_key: true
  end
end
