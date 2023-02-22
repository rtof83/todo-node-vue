const checkMinNumber = (req, res, next) => {
  const path = req.path.substring(0, req.path.search('/'+req.params.id));
  
  if (path === '/configs') {
    try {
      if (req.body.pageSize < 1)
        return res.status(409).json({ message: 'size pagination must be greater than 1' });

      if (req.body.dateSize < 1)
        return res.status(409).json({ message: 'size pagination must be greater than 1' });

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  } else {
    next();
  }
};

module.exports = checkMinNumber;
