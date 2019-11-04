export const downloadJSON = data => {
  const JSONobj = JSON.stringify(data);
  const blob = new Blob([JSONobj], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);

  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", "diary.json");
  tempLink.click();
  tempLink.remove();
};
