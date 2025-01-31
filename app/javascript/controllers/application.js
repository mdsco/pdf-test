import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

import DragDropController from "./drag_drop_controller";
application.register("drag-drop", DragDropController);

import SaveHtmlController from "./save_html_controller";
application.register("save-html", SaveHtmlController);

export { application }
