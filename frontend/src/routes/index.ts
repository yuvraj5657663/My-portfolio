import { Router, Request, Response } from 'express';
import { contactController } from '../controllers/contactController';
import { projectController } from '../controllers/projectController';
import { authController } from '../controllers/authController';
import { analyticsController } from '../controllers/analyticsController';
import { portfolioController } from '../controllers/portfolioController';
import { aiController } from '../controllers/aiController';
import { protect } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public Routes
router.post('/contact', contactLimiter, contactController.submitContact);
router.get('/resume', portfolioController.getResume);
router.get('/projects', projectController.getProjects);
router.get('/skills', portfolioController.getSkills);
router.get('/experience', portfolioController.getExperience);
router.post('/visit', analyticsController.recordVisit);

// AI Route (Skeleton)
router.post('/chat', aiController.chat);

// Admin Auth
router.post('/auth/login', authController.login);

// Protected Admin Routes
router.get('/admin/contacts', protect, contactController.getContacts);
router.delete('/admin/contacts/:id', protect, contactController.deleteContact);
router.patch('/admin/contacts/:id', protect, contactController.updateContactStatus);
router.get('/admin/projects', protect, projectController.getAllProjects);
router.post('/admin/projects', protect, projectController.addProject);
router.put('/admin/projects/:id', protect, projectController.updateProject);
router.delete('/admin/projects/:id', protect, projectController.deleteProject);
router.get('/admin/visits', protect, analyticsController.getVisits);

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

export default router;
