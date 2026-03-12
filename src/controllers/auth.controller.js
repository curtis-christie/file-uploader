async function signUp(req, res, next) {
  try {
    const { email, passwordHash } = req.body;

    // const existingUser = findUser(email);

    if (existingUser) {
      return res.status(409).json({
        error: "A user with that email already exists",
      });
    }
  } catch (err) {
    next(err);
  }
}

export { signUp };
