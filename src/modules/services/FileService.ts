export class FileService {
  public download(filename: string, blobFile: Blob) {
    const url = URL.createObjectURL(blobFile);
    var element = document.createElement('a');
    element.href = url;
    element.download = filename;
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  }
}
