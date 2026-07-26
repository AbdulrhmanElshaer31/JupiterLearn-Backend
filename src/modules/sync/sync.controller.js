const service = require('./sync.service');

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
    await service.upsert(req.params.table, req.body);
    res.json({ success: true, id: req.body.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};