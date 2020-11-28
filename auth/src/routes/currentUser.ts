import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/api/users/currentuser', async (req, res) => {
  if (!req.session?.ticketifyJwt) {
    return res.json({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.ticketifyJwt, process.env.JWT_KEY!);
    res.json({ currentUser: payload });
  } catch (e) {
    res.json({ currentUser: null });
  }
});

export { router as currentUserRouter };
