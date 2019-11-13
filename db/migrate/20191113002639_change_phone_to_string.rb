class ChangePhoneToString < ActiveRecord::Migration[5.2]
  def change
    change_column :senders, :phone, :string, :limit => 10
    change_column :receivers, :phone, :string, :limit => 10
  end
end
