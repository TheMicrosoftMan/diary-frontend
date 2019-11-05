import React, { useState } from "react";

const loadFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const ExportModal = ({ user, upload }) => {
  const [selectedFile, setFile] = useState();

  return (
    <div className="exportModal">
      <input
        className="exportModal__file-inp"
        onChange={e => {
          setFile(e.target.files[0]);
        }}
        type="file"
        accept=".csv"
      />
      <button
        className="exportModal__btn"
        onClick={async () => {
          try {
            const base64 = await loadFile(selectedFile);
            await upload(user.token, user.id, base64);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Export
      </button>
    </div>
  );
};

export default ExportModal;
