import { NextResponse } from "next/server";
import multiparty from "multiparty";
import path from "path";
import fs from "fs";
import { Readable } from "stream";

export async function POST(request: Request) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "需要 multipart/form-data" }, { status: 400 });
  }

  const buffer = Buffer.from(await request.arrayBuffer());

  return new Promise((resolve) => {
    const form = new multiparty.Form({ uploadDir });
    const req = new Readable({
      read() { this.push(buffer); this.push(null); }
    });
    (req as any).headers = Object.fromEntries(request.headers);

    form.parse(req as any, (err: any, _fields: any, files: any) => {
      if (err || !files.file || !files.file[0]) {
        resolve(NextResponse.json({ error: "上传失败" }, { status: 400 }));
        return;
      }
      const uploaded = files.file[0];
      const ext = path.extname(uploaded.originalFilename || ".jpg") || ".jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
      const destPath = path.join(uploadDir, filename);
      fs.renameSync(uploaded.path, destPath);
      const url = `/uploads/${filename}`;
      resolve(NextResponse.json({ url }));
    });
  });
}

export const dynamic = "force-dynamic";
