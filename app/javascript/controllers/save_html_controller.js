import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["pdfPreview"];

  connect() {}

  saveHtml(event) {
    const documentId = event.target.dataset.saveHtmlDocumentId;
    const preview_target = this.pdfPreviewTarget; // Get modified content
    const preview_target_html = preview_target.innerHTML; // Get modified content

    fetch(`/documents/${documentId}/update_html`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ html: preview_target_html })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok") {
          alert("Document saved successfully!");
        } else {
          alert("Error saving document.");
        }
      })
      .catch(error => console.error("Error:", error));
  }
}