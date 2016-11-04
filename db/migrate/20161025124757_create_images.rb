class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.attachment :image
      t.belongs_to :work, index: true
    end
  end
end
