module.exports = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    res.status(500).json({ error: 'Internal server error' });
};
