import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["pdfPreview"];

  connect() {
    this.draggedElement = null;
  }

  startDrag(event) {
    event.preventDefault();
    this.draggedElement = event.target.cloneNode(true);
    this.draggedElement.style.position = "absolute";
    this.draggedElement.style.cursor = "grabbing";
    this.draggedElement.style.opacity = "0.7";
    document.body.appendChild(this.draggedElement);

    document.addEventListener("mousemove", this.moveElement);
    document.addEventListener("mouseup", this.dropElement);
  }

  moveElement = (event) => {
    if (!this.draggedElement) return;

    // Move element to follow cursor
    this.draggedElement.style.left = `${event.pageX}px`;
    this.draggedElement.style.top = `${event.pageY}px`;
  };

  dropElement = (event) => {
    if (!this.draggedElement) return;

    document.removeEventListener("mousemove", this.moveElement);
    document.removeEventListener("mouseup", this.dropElement);

    // Get the PDF preview container
    const pdfPreview = this.pdfPreviewTarget;
    const pdfRect = pdfPreview.getBoundingClientRect();

    // Ensure drop is inside the PDF preview
    if (
      event.pageX >= pdfRect.left &&
      event.pageX <= pdfRect.right &&
      event.pageY >= pdfRect.top &&
      event.pageY <= pdfRect.bottom
    ) {
      // Adjust position relative to pdf preview
      this.draggedElement.style.left = `${event.pageX - pdfRect.left}px`;
      this.draggedElement.style.top = `${event.pageY - pdfRect.top}px`;


      // Append inside the PDF preview
      const page_container = pdfPreview.querySelector('#page-container')
      page_container.appendChild(this.draggedElement);
    } else {
      // Remove if dropped outside
      this.draggedElement.remove();
    }

    this.draggedElement.style.opacity = "1"; // Reset opacity
    this.draggedElement = null; // Reset dragged element
  };
}