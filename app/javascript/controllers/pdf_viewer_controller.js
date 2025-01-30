// import { Controller } from "@hotwired/stimulus";
// import * as pdfjsLib from "pdfjs-dist";
// import { PDFDocument, rgb } from "pdf-lib";

// pdfjsLib.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.js";

// export default class extends Controller {
//   static targets = ["fileInput", "canvas"];

//   connect() {
//     this.pdfBytes = null;
//   }

//   loadPdf(event) {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.pdfBytes = new Uint8Array(e.target.result);
//         this.renderPdf(this.pdfBytes);
//       };
//       reader.readAsArrayBuffer(file);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   }

//   async renderPdf(pdfData) {
//     const temp = pdfData.slice();
//     const pdf = await pdfjsLib.getDocument(pdfData).promise;
//     const page = await pdf.getPage(1); // Display the first page of the PDF

//     const viewport = page.getViewport({ scale: 1 });
//     const canvas = this.canvasTarget;
//     const context = canvas.getContext("2d");
//     canvas.width = viewport.width;
//     canvas.height = viewport.height;

//     const renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };
//     await page.render(renderContext).promise;
//   }
// }
  //   this.canvasContext = context;
  //   this.canvasRect = canvas.getBoundingClientRect();

  //   canvas.addEventListener("dragover", (e) => e.preventDefault());
  //   canvas.addEventListener("drop", this.dropElement.bind(this));

  //   this.pdfBytes = temp
  //   console.log("hererljsadlkfjalskdjf")
  // }

  // startDrag(event) {
  //   this.draggedElement = event.target;
  // }

  // async dropElement(event) {
  //   event.preventDefault();
  //   if (this.pdfBytes) {
  //     const dropX = event.clientX;
  //     const dropY = event.clientY;

  //     console.log(`Dropped at (${dropX}, ${dropY})`);

  //     this.canvasContext.fillStyle = "rgba(0, 0, 255, 0.3)";
  //     this.canvasContext.fillRect(dropX, dropY, 100, 50);

  //     const modifiedPdfBytes = await this.addSignatureField(this.pdfBytes, dropX, dropY);

  //     const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "modified.pdf";
  //     link.click();
  //   }
  // }

  // async addSignatureField(pdfBytes, x, y) {
  //   const pdfDoc = await PDFDocument.load(pdfBytes);
  
  //   const page = pdfDoc.getPage(0);
  
  //   const fieldWidth = 200;
  //   const fieldHeight = 50;
  
  //   const pdfX = x;
  //   const pdfY = this.canvasRect.height - y + 100;

  //   const form = pdfDoc.getForm();
  //   const signatureField = form.createTextField("signature");
  
  //   signatureField.setText("Sign Here");
  //   signatureField.enableMultiline();
  //   // signatureField.setFontSize(12);
  
  //   signatureField.addToPage(page, {
  //     x: pdfX,
  //     y: pdfY,
  //     width: fieldWidth,
  //     height: fieldHeight,
  //   });
  
  //   signatureField.updateAppearances(form.getDefaultFont());
  
  //   return pdfDoc.save();
  // }  
}
