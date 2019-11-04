class CreateReceivers < ActiveRecord::Migration[5.2]
  def change
    create_table :receivers do |t|
      t.string :firstname
      t.string :lastname
      t.string :company
      t.string :street1
      t.string :street2
      t.string :city
      t.string :state
      t.integer :zip

      t.timestamps
    end
  end
end
