class DocumentsController < ApplicationController
  require 'securerandom'
  def index
    @documents = Document.all
  end

  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_params)

    if @document.save
      convert_pdf_to_html(@document)
      redirect_to document_path(@document)
    else
      render :new
    end
  end

  def show
    @document = Document.find(params[:id])
  end

  private

  def document_params
    params.require(:document).permit(:name, :file)
  end

  def convert_pdf_to_html(document)
    output_dir = 'public/uploads/'
    FileUtils.mkdir_p(output_dir) unless Dir.exist?(output_dir)
    output_filename = "pdf_#{SecureRandom.hex(5)}.html"
    output_path = output_dir.concat(output_filename)

    pdf_path = ActiveStorage::Blob.service.path_for(document.file.key)
    
    command = "pdf2htmlEX --zoom 1.3 #{Shellwords.escape(pdf_path)} #{Shellwords.escape(output_path)}"
    system(command)

    @document.update(html_path: output_filename)
  end
end
