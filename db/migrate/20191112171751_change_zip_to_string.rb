class ChangeZipToString < ActiveRecord::Migration[5.2]
  def change
    change_column :senders, :zip, :string, :limit => 5
    change_column :receivers, :zip, :string, :limit => 5
  end
end
