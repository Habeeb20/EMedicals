// middleware/auth.js
const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Access Denied: Admins Only' });
};

// Usage in routes
app.post('/api/admin/add-drug', authMiddleware, adminAuth, (req, res) => {
    // Admin-only operation
});
