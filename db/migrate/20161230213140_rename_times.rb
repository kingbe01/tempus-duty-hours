class RenameTimes < ActiveRecord::Migration[5.0]
  def change
  	rename_column :shifts, :start_time, :start
  	rename_column :shifts, :end_time, :end
  end
end
