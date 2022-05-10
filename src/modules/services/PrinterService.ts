export class PrinterService {
  private iframe = null;

  public print(blobFile: Blob) {
    const url = URL.createObjectURL(blobFile);
    this.iframe = document.createElement('iframe');
    this.iframe.src = url;
    this.iframe.style.display = 'none';
    document.body.appendChild(this.iframe);
    URL.revokeObjectURL(url);
    this.iframe.contentWindow.print();
  }

  public destroy() {
    /* istanbul ignore else */
    if (this.iframe) this.iframe.remove();
  }
}
