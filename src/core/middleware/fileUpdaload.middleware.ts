import fileUpload from "express-fileupload";

export const FileUploadMiddleware = fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: "./uploads",
  createParentPath: true,
});