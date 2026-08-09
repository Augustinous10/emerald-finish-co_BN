import { QuoteRequest } from "../models/QuoteRequest.js";

// Public: submit a quote request
export async function create(req, res) {
  try {
    const { name, email, phone, location, serviceType, propertyType, budgetRange, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required" });
    }
    const doc = await QuoteRequest.create({
      name,
      email,
      phone,
      location,
      serviceType,
      propertyType,
      budgetRange,
      message,
    });
    res.status(201).json({ ok: true, id: doc._id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Admin: list all
export async function listAll(req, res) {
  const items = await QuoteRequest.find().sort({ createdAt: -1 });
  res.json(items);
}

// Admin: update status
export async function updateStatus(req, res) {
  const { status } = req.body;
  const item = await QuoteRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!item) return res.status(404).json({ error: "Quote request not found" });
  res.json(item);
}

// Admin: delete
export async function remove(req, res) {
  const item = await QuoteRequest.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Quote request not found" });
  res.json({ ok: true });
}
