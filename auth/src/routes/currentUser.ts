import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/currentUser';

const router = Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  res.json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
