export async function UploadFile(file) {
  const payload = {
    fileName: file.name,
    contentType: file.type || "application/octet-stream",
    size: file.size,
  };

  const presignRes = await fetch(`/api/upload-files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const presignText = await presignRes.text();

  if (!presignRes.ok) {
    console.error("Upload presign error:", presignText);
    throw new Error("Upload failed");
  }

  const presignData = JSON.parse(presignText);
  const uploadRes = await fetch(presignData.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": payload.contentType,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    console.error("Upload to storage failed:", await uploadRes.text());
    throw new Error("Upload failed");
  }

  return presignData.url;
}