class AddPhoneToSenders < ActiveRecord::Migration[5.2]
  def change
    add_column :senders, :phone, :bigint
  end
end
