import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

import PdfViewerController from "./pdf_viewer_controller";
application.register("pdf-viewer", PdfViewerController);

export { application }
