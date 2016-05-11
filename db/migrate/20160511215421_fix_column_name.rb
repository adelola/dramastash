class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :dramas, :language, :country
  end

end
