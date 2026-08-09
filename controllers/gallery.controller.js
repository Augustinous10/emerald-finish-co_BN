import { GalleryItem } from "../models/GalleryItem.js";

// Public: list published items, sorted
export async function listPublished(req, res) {
  const items = await GalleryItem.find({ published: true }).sort({ sortOrder: 1, createdAt: -1 });
  res.json(items);
}

// Admin: list all items (published + hidden)
export async function listAll(req, res) {
  const items = await GalleryItem.find().sort({ sortOrder: 1, createdAt: -1 });
  res.json(items);
}

// Admin: upload image + create gallery item in one call
export async function create(req, res) {
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
}

// Admin: toggle publish
export async function togglePublish(req, res) {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  item.published = !item.published;
  await item.save();
  res.json(item);
}

// Admin: update title/category/order
export async function update(req, res) {
  const { title, category, sortOrder } = req.body;
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  if (title !== undefined) item.title = title;
  if (category !== undefined) item.category = category;
  if (sortOrder !== undefined) item.sortOrder = sortOrder;
  await item.save();
  res.json(item);
}

// Admin: delete
export async function remove(req, res) {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json({ ok: true });
}
