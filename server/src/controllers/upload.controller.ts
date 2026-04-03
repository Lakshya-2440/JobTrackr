import { Request, Response } from 'express';
import { uploadService } from '../services/upload.service';
import { ApiError } from '../utils/ApiError';

export const uploadController = {
  async uploadResume(req: Request, res: Response) {
    if (!req.user?.id) {
      throw new ApiError(401, 'Unauthorized');
    }

    if (!req.file) {
      throw new ApiError(400, 'Resume file is required');
    }

    const data = await uploadService.uploadResume(req.user.id, req.file);

    res.status(200).json({
      success: true,
      data
    });
  }
};

