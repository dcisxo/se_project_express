// 404 handler
app.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

// Global error handler - MUST have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
  if (err && err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(ERROR_400).send({ message: "Invalid id" });
  }

  console.error(err);
  return res.status(err.statusCode || ERROR_500).send({
    message: err.message || "Internal Server Error",
  });
});
