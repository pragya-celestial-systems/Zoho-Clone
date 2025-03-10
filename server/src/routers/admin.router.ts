import { Router, Request, Response } from "express";
import { handleChangePassword, handleDeleteUser, handleFileUpload, handleGetChartData, handleGetFilteredUsers, handleGetUsers, handleUpdateUser } from "../controllers/admin.controller";
import { upload } from "../config/file.upload";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    handleGetUsers(req, res);
})

router.route('/:userId')
.delete((req: Request, res: Response) => {
    handleDeleteUser(req, res);
})
.patch((req: Request, res: Response) => {
    handleUpdateUser(req, res);
})

router.get('/filter', (req: Request, res: Response) => {
    handleGetFilteredUsers(req, res);
})

router.post('/upload', upload.single('employees-data'), (req: Request, res: Response) => {
    handleFileUpload(req, res);
})

router.get('/chart-data', (req: Request, res: Response) => {
    handleGetChartData(req, res);
})

router.post('/change-password', (req: Request, res: Response) => {
    handleChangePassword(req, res);
})

export default router;