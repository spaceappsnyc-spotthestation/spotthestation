class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fsq_token


      t.timestamps
    end
    add_index :users, :fsq_token, :name => 'fsq_token_id_ix'
  end
end
