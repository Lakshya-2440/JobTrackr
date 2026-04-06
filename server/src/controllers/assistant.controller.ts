import { Request, Response } from 'express';
import { ragService } from '../services/rag.service';
import { ApiError } from '../utils/ApiError';

const getUserId = (req: Request) => {
  if (!req.user?.id) {
    throw new ApiError(401, 'Unauthorized');
  }

  return req.user.id;
};

export const assistantController = {
  async ask(req: Request, res: Response) {
    const question = typeof req.body?.question === 'string' ? req.body.question : '';
    const data = await ragService.answerQuestion(getUserId(req), question);

    res.status(200).json({
      success: true,
      data
    });
  }
};
