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

    this.draggedElement.style.left = `${event.pageX}px`;
    this.draggedElement.style.top = `${event.pageY}px`;
  };

  dropElement = (event) => {
    if (!this.draggedElement) return;
  
    document.removeEventListener("mousemove", this.moveElement);
    document.removeEventListener("mouseup", this.dropElement);
  
    const pdfPreview = this.pdfPreviewTarget;
    const pageContainer = pdfPreview.querySelector("#page-container");
  
    if (!pageContainer) {
      console.error("Page container not found.");
      this.draggedElement.remove();
      return;
    }
  
    const pages = pageContainer.querySelectorAll(".pf");
    let droppedPage = null;
  
    pages.forEach(page => {
      const pageRect = page.getBoundingClientRect();
      if (
        event.pageX >= pageRect.left &&
        event.pageX <= pageRect.right &&
        event.pageY >= pageRect.top &&
        event.pageY <= pageRect.bottom
      ) {
        droppedPage = page;
      }
    });
  
    if (droppedPage) {
      const pageRect = droppedPage.getBoundingClientRect();
  
      this.draggedElement.style.left = `${event.pageX - pageRect.left}px`;
      this.draggedElement.style.top = `${event.pageY - pageRect.top}px`;
  
      this.draggedElement.style.position = "absolute";
      this.draggedElement.style.fontSize = "16px";
      this.draggedElement.style.padding = "5px 10px";
      droppedPage.appendChild(this.draggedElement);
    } else {
      this.draggedElement.remove();
    }
  
    this.draggedElement.style.opacity = "1";
    this.draggedElement = null;
  };
}
