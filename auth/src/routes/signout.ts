import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', async (req, res) => res.send('Hello world'));

export { router as signoutRouter };
