import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '@znuta-tickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentuser: req.currentUser || null });
});

export { router as currentUserRouter };
