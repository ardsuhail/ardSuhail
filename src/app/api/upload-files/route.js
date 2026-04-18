import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { error: "No file received" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicUrl = process.env.R2_PUBLIC_URL
    if (!publicUrl) {
      console.error('R2_PUBLIC_URL is not configured')
      return Response.json(
        { error: 'R2_PUBLIC_URL is not configured' },
        { status: 500 }
      )
    }

    const normalizedUrl = publicUrl.replace(/\/$/, '')
    return Response.json({
      url: `${normalizedUrl}/${fileName}`,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return Response.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}