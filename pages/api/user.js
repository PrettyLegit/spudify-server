import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function requestHandler(req, res) {
  const { method } = req;
  const { RANDOM_SHA } = process.env;
  const { authorization } = req.headers;

  if (authorization !== `Bearer ${RANDOM_SHA}`) {
    return res.status(401).json({ error: "Unauthorized", success: false });
  }

  switch (method) {
    case "GET":
      return await getUser(req, res);
    case "POST":
      return await createUser(req, res);
    case "PUT":
      return await updateUser(req, res);
    case "DELETE":
      return await deleteUser(req, res);
    default:
      return res
        .status(405)
        .json({ error: "Method not allowed", success: false });
  }
}

// A get request to /api/user will returns a specific user
async function getUser(req, res) {
  const { spotifyId } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: {
        spotifyId: spotifyId,
      },
    });
    return res.status(200).json(user, { success: true });
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error fetching user with spotifyId: ${req.query.spotifyId}`,
      success: false,
    });
  }
}

// Check if a user exists in the database
// If the user exists, return the user
// If the user does not exist, create the user and return the user
export async function getUserOrCreate(spotifyId, name) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        spotifyId: spotifyId,
      },
    });

    if (user) {
      return user;
    } else {
      const newUser = await prisma.user.create({
        data: {
          spotifyId: spotifyId,
          name: name,
        },
      });
      return res.status(200).json(newUser, { success: true });
    }
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error fetching user with spotifyId: ${spotifyId}`,
      success: false,
    });
  }
}

// A post request to /api/user will create a new user
async function createUser(req, res) {
  const body = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        spotifyId: body.spotifyId,
        name: body.name,
      },
    });
    return res.status(200).json(user, { success: true });
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error creating user with spotifyId: ${req.body.spotifyId}`,
      success: false,
    });
  }
}

// A update request to /api/user that will update a user given at an spotifyId
async function updateUser(req, res) {
  const body = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        spotifyId: body.spotifyId,
      },
      data: {
        name: body.name,
      },
    });
    return res.status(200).json(user, { success: true });
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error updating user with spotifyId: ${req.body.spotifyId}`,
      success: false,
    });
  }
}

// A delete request to /api/user that will delete a user given at an email
async function deleteUser(req, res) {
  const body = req.body;
  try {
    const user = await prisma.user.delete({
      where: {
        spotifyId: body.spotifyId,
      },
    });
    return res.status(200).json(user, { success: true });
  } catch (e) {
    console.error("Request error", e);
    return res.status(500).json({
      error: `Error deleting user with spotifyId: ${req.body.spotifyId}`,
      success: false,
    });
  }
}
