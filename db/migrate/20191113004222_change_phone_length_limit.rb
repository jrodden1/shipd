class ChangePhoneLengthLimit < ActiveRecord::Migration[5.2]
  def change
    change_column :senders, :phone, :string, :limit => 12
    change_column :receivers, :phone, :string, :limit => 12
  end
end
