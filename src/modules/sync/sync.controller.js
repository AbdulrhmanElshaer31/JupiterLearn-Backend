const service = require("./sync.service");

exports.getAll = async (req, res) => {
  try {
    const result = await service.getAll(req.params.table);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAfter = async (req, res) => {
  try {
    const result = await service.getAfter(req.params.table, req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const result = await service.upsert(req.params.table, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ دالة جديدة: Soft Delete
exports.softDelete = async (req, res) => {
  try {
    const result = await service.softDelete(req.params.table, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ دالة جديدة: Hard Delete
exports.hardDelete = async (req, res) => {
  try {
    const result = await service.hardDelete(req.params.table, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ دالة جديدة: جلب المحذوفات
exports.getDeleted = async (req, res) => {
  try {
    const result = await service.getDeleted(req.params.table);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
