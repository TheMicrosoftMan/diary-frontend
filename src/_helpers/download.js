export const downloadJSON = data => {
  const JSONobj = JSON.stringify(data);

  download(JSONobj, "application/json", "json");
};

export const downloadTXT = data => {
  let textData = "";
  data.forEach(day => {
    textData += `${day.date}\n${day.text}\n\n`;
  });

  download(textData, "text/plain", "txt");
};

const download = (data, type, extensions) => {
  const blob = new Blob([data], { type: type });
  const url = window.URL.createObjectURL(blob);

  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", `diary.${extensions}`);
  tempLink.click();
  tempLink.remove();
};
