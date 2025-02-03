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

  def update_html
    @document = Document.find(params[:id])

    html_path = Rails.root.join("public", "uploads", @document.html_path)
    File.write(html_path, params[:html])  # Overwrite the file with new HTML

    render json: { status: "ok" }
  rescue StandardError => e
    render json: { status: "error", message: e.message }, status: 500
  end

  private

  def document_params
    params.require(:document).permit(:name, :file)
  end

  def convert_pdf_to_html(document)
    output_dir = 'public/uploads/'
    FileUtils.mkdir_p(output_dir) unless Dir.exist?(output_dir)
    output_filename = "pdf_#{DateTime.now().to_i}.html"
    output_path = output_dir.concat(output_filename)

    pdf_path = ActiveStorage::Blob.service.path_for(document.file.key)
    command = "pdf2htmlEX --zoom 1.3 #{Shellwords.escape(pdf_path)} #{Shellwords.escape(output_path)}"
    system(command)

    if File.exist?(output_path)
      html_content = File.read(output_path)
      doc = Nokogiri::HTML(html_content)  
      doc.css('div#sidebar').remove

      page_container = doc.at_css('div#page-container')
      if page_container
        page_container['style'] = "position: relative; padding: 10px 20px; width: 850px;"
      end

      File.write(output_path, doc.to_html)
    end

    @document.update(html_path: output_filename)
  end
end
