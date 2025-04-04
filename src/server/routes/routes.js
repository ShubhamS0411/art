import express from 'express';
import rateLimit from 'express-rate-limit';
import { signin } from '../api/signin.js';
import { signup } from '../api/signup.js';
import { getPosts, createPost }  from '../api/post.js';
import createReview from '../api/review.js';
import { refreshToken } from '../security/security.js';
import Authentication from '../api/authentication.js';
import { logout } from '../api/logout.js';



const router = express.Router();

const rateLimiter = rateLimit({
    windowMs: 300 * 1000, 
    max: 5, 
    message: 'Too many requests, please try again later.'
})

const rateLimiter2 = rateLimit({
    windowMs: 1000 * 1000, 
    max: 10, 
    message: 'Too many requests, please try again later.'
})

router.post('/signin', rateLimiter,express.json({ limit: '1kb'}), signin);
router.post('/signup', rateLimiter,express.json({ limit: '1kb'}), signup);
router.post('/post',rateLimiter2, express.json({ limit: '50mb'}), createPost);
router.post('/review',rateLimiter2,express.json({ limit: '1mb'}), createReview);
router.get('/authentication', Authentication);
router.post('/refresh', refreshToken);
router.get('/getPost', rateLimiter2, getPosts);
router.post('/logout', logout);
router.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    
});


export default router;

