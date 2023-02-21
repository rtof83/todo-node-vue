const checkMinNumber = (req, res, next) => {
  try {
    if (req.body.pageSize < 1)
      return res.status(409).json({ message: 'size pagination must be greater than 1' });

    if (req.body.dateSize < 1)
      return res.status(409).json({ message: 'size pagination must be greater than 1' });

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
};

module.exports = checkMinNumber;
