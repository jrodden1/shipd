class AddPhoneToReceivers < ActiveRecord::Migration[5.2]
  def change
    add_column :receivers, :phone, :bigint
  end
end
