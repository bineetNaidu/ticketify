import { Router } from 'express';

const router = Router();

router.post('/api/users/signup', async (req, res) => res.send('Hello world'));

export { router as signupRouter };
