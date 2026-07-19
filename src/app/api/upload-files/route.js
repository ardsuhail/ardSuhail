import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

const MAX_DIRECT_UPLOAD_SIZE = 25 * 1024 * 1024;

const buildPublicUrl = (fileName) => {
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!publicUrl) {
    throw new Error("R2_PUBLIC_URL is not configured");
  }

  return `${publicUrl.replace(/\/$/, "")}/${fileName}`;
};

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      const fileName = `${Date.now()}-${(body?.fileName || "upload").replace(/\s+/g, "-")}`;
      const contentTypeHeader = body?.contentType || "application/octet-stream";

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        ContentType: contentTypeHeader,
      });

      const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 600 });

      return NextResponse.json({
        uploadUrl,
        url: buildPublicUrl(fileName),
        fileName,
      });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.byteLength > MAX_DIRECT_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: "File is too large for direct upload. Please use a smaller file or add a video URL instead." },
        { status: 413 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return NextResponse.json({
      url: buildPublicUrl(fileName),
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}