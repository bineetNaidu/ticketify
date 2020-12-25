import { Request, Response, Router } from 'express';
const router = Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  res.json({});
});

export { router as indexOrderRoute };
