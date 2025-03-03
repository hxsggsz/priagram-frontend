export function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "priagram.png");
  a.setAttribute("href", dataUrl);
  a.click();
}
