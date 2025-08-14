import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import { ENV } from './config/env.js';
import UserRouter from './routes/user.route.js';
import job from './config/cron.js';
import FavoritesRouter from './routes/favorites.route.js';
const app = express();
const PORT = ENV.PORT || 5001;
if (ENV.NODE_ENV === "production")
    job.start();
app.use(express.json());
app.use('/api/auth', UserRouter);
app.use('/api/favorites', FavoritesRouter);
app.get('/', (req, res) => {
    res.status(200).json({ success: true });
});
app.use((err, _req, res, _next) => {
    console.error("Global Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});
app.listen(PORT, () => {
    console.log(`Server Running at Port No. :=> ${PORT}`);
});
