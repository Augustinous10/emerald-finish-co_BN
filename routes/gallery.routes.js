import { Router } from "express";
import { GalleryItem } from "../models/GalleryItem.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadGalleryImage } from "../middleware/upload.js";

const router = Router();

// Public: list published items, sorted
router.get("/", async (req, res) => {
  const items = await GalleryItem.find({ published: true }).sort({ sortOrder: 1, createdAt: -1 });
  res.json(items);
});

// Admin: list all items (published + hidden)
router.get("/admin/all", requireAuth, async (req, res) => {
  const items = await GalleryItem.find().sort({ sortOrder: 1, createdAt: -1 });
  res.json(items);
});

// Admin: upload image + create gallery item in one call
router.post("/", requireAuth, uploadGalleryImage, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });
    const { title, category } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const maxOrder = await GalleryItem.findOne().sort({ sortOrder: -1 }).select("sortOrder");

    const item = await GalleryItem.create({
      title,
      category: category || "featured",
      imageUrl: req.file.path,
      published: true,
      sortOrder: (maxOrder?.sortOrder ?? 0) + 1,
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: toggle publish
router.patch("/:id/publish", requireAuth, async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  item.published = !item.published;
  await item.save();
  res.json(item);
});

// Admin: update title/category/order
router.put("/:id", requireAuth, async (req, res) => {
  const { title, category, sortOrder } = req.body;
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  if (title !== undefined) item.title = title;
  if (category !== undefined) item.category = category;
  if (sortOrder !== undefined) item.sortOrder = sortOrder;
  await item.save();
  res.json(item);
});

// Admin: delete
router.delete("/:id", requireAuth, async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json({ ok: true });
});

export default router;