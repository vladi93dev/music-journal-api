const requestValidator = (schema, source='body') => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        
        if (!result.success) {
            const errors = Object.values(result.error.flatten().fieldErrors).flat();
            return res.status(400).json({ message: errors.join(", ") });
        }

        req.validated = result.data;
        next()
    }
};

export default requestValidator;