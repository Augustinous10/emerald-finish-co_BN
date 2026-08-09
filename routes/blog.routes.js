import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { uploadBlogCover } from "../middleware/upload.js";
import * as blogController from "../controllers/posts.controller.js";

const router = Router();

// Public
router.get("/", blogController.listPublished);
router.get("/slug/:slug", blogController.getBySlug);

// Admin
router.get("/admin/all", requireAuth, blogController.listAll);
router.get("/admin/:id", requireAuth, blogController.getById);
router.post("/upload-cover", requireAuth, uploadBlogCover, blogController.uploadCover);
router.post("/", requireAuth, blogController.create);
router.put("/:id", requireAuth, blogController.update);
router.patch("/:id/publish", requireAuth, blogController.togglePublish);
router.delete("/:id", requireAuth, blogController.remove);

export default router;
