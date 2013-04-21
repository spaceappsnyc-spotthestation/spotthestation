class AddNextSightingToUser < ActiveRecord::Migration
  def change
    add_column :users, :next_sighting, :integer
  end
end
