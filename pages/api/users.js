import prisma from "../../prisma/prisma";

export default async function requestHandler(req, res) {
  const { method } = req;
  const { RANDOM_SHA } = process.env;
  const { authorization } = req.headers;

  if (authorization !== `Bearer ${RANDOM_SHA}`) {
    return res.status(401).json({ error: "Unauthorized", success: false });
  }

  switch (method) {
    case "GET":
      return await getUsers(req, res);
    case "DELETE":
      return await deleteUsers(req, res);
    default:
      return res
        .status(405)
        .json({ error: "Method not allowed", success: false });
  }
}

// A get request to /api/users will return all users
async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users, { success: true });
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error fetching users`,
      success: false,
    });
  }
}

// WARNING: This will delete all users in the database
// A delete request to /api/users will delete all users
async function deleteUsers(req, res) {
  try {
    const users = await prisma.user.deleteMany();
    return res.status(200).json(users, { success: true });
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error deleting users`,
      success: false,
    });
  }
}
