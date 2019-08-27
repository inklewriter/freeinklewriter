class AddTitleToStories < ActiveRecord::Migration[5.2]
  def change
    add_column :stories, :title, :string
  end
end
