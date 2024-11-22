
import {Router, Request, Response} from 'express';
import PointsController from '../controllers/points-controller';

const router = Router();
const pointsController = PointsController.getInstance();


router.post('/getBenefitInfo', async (req, res) => {
    try {
        const info = await pointsController.getBenefitInfo(req.body.username);
        res.status(201).json(info);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

export default router;
