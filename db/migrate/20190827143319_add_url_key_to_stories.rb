class AddUrlKeyToStories < ActiveRecord::Migration[5.2]
  def change
    add_column :stories, :url_key, :integer
  end
end
