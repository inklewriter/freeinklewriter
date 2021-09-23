class RenameLicenseNameFieldToLicenseNameField < ActiveRecord::Migration[5.2]
  def change
    rename_column :licenses, :name, :license_name
  end
end
