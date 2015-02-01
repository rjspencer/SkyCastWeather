class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :latitude, :longitude, :address, :type
      t.belongs_to :user
      t.timestamps
    end
  end
end
