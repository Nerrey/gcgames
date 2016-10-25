class RemoveColumsFromWorks < ActiveRecord::Migration[5.0]
  def change
    remove_column :works, :image_file_name, :string
    remove_column :works, :image_content_type, :string
    remove_column :works, :image_file_size, :integer
    remove_column :works, :image_updated_at, :datetime
  end
end
