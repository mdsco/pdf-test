# app/controllers/documents_controller.rb
class DocumentsController < ApplicationController
  def index
    @documents = Document.all
  end

  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_params)
    if @document.save
      redirect_to documents_path, notice: 'Document uploaded successfully.'
    else
      render :new, alert: 'Error uploading document.'
    end
  end

  private

  def document_params
    params.require(:document).permit(:name, :file)
  end
end
