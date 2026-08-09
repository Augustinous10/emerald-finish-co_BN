import { ContactMessage } from "../models/ContactMessage.js";

// Public: submit a message
export async function create(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    const doc = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ ok: true, id: doc._id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Admin: list all
export async function listAll(req, res) {
  const items = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(items);
}

// Admin: update status
export async function updateStatus(req, res) {
  const { status } = req.body;
  const item = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!item) return res.status(404).json({ error: "Message not found" });
  res.json(item);
}

// Admin: delete
export async function remove(req, res) {
  const item = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Message not found" });
  res.json({ ok: true });
}
