class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :code
      t.belongs_to :user
      t.timestamps
    end
  end
end
