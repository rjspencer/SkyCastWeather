class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :postal_code, :latitude, :longitude
      t.belongs_to :user
      t.timestamps
    end
  end
end
