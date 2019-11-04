class CreatePackages < ActiveRecord::Migration[5.2]
  def change
    create_table :packages do |t|
      t.integer :weight
      t.string :service_provider
      t.string :service
      t.decimal :cost
      t.string :tracking_num
      t.string :note
      t.integer :sender_id
      t.integer :receiver_id

      t.timestamps
    end
  end
end
