import { Request, Response, Router } from 'express';
const router = Router();

router.get('/api/orders/:orderId', async (req: Request, res: Response) => {
  res.json({});
});

export { router as showOrderRoute };
