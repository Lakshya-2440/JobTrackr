import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export const uploadService = {
  async uploadResume(userId: string, file: Express.Multer.File) {
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'job-tracker/resumes',
          public_id: `${userId}_${Date.now()}`,
          overwrite: true
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result?.secure_url) {
            reject(new ApiError(500, 'Resume upload failed'));
            return;
          }

          resolve({ secure_url: result.secure_url });
        }
      );

      stream.end(file.buffer);
    });

    return {
      url: uploadResult.secure_url
    };
  }
};

