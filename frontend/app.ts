import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { apiLimiter } from './src/middleware/rateLimiter.js';
import { errorHandler } from './src/middleware/error.js';
import routes from './src/routes/index.js';
const apiApp = express();

// Trust proxy to allow express-rate-limit to correctly identify IPs behind reverse proxies
apiApp.set('trust proxy', 1);

// Security Middleware
apiApp.use(helmet());
apiApp.use(cors({ origin: process.env.APP_URL || '*' }));
apiApp.use(express.json({ limit: '10kb' })); // Body parser with limit
apiApp.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  apiApp.use(morgan('dev'));
}

// Rate Limiting
apiApp.use(apiLimiter);

// Routes
apiApp.use('/', routes);

// Error Handling
apiApp.use(errorHandler);

export { apiApp };
