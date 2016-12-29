class CreateShifts < ActiveRecord::Migration[5.0]
  def change
    create_table :shifts do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.string :notes
      t.string :title
      t.integer :account_id

      t.timestamps
    end
  end
end
