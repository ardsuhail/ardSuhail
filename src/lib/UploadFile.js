export async function UploadFile(file,) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/upload-files`, {
    method: "POST",
    body: formData,
  });

  const text = await res.text(); // 🔥 pehle text padho

  if (!res.ok) {
    console.error("Upload API error:", text);
    throw new Error("Upload failed");
  }

  if (!text) {
    throw new Error("Empty response from server");
  }

  const data = JSON.parse(text);
  return data.url;
}