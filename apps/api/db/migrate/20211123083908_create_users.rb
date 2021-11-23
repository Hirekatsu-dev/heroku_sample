class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: false do |t|
      t.uuid :uuid, null: false, primary_key: true, default: 'gen_random_uuid()'
      t.string :name, null: false
      t.timestamps
    end
  end
end
