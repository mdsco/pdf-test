class AddHtmlPathToDocuments < ActiveRecord::Migration[7.1]
  def change
    add_column :documents, :html_path, :string
  end
end
