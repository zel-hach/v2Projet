import mongoose from "mongoose";
import User from "../models/User.js";

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Correspondance insensible à la casse sur le champ `status`. */
function statusMatchesAny(values) {
  return {
    $or: values.map((v) => ({
      status: new RegExp(`^${escapeRegex(v)}$`, "i"),
    })),
  };
}

export async function getUsers(req, res) {
  try {
    const query = req.query;
    const emailTerm = query.emailTerm || "";
    const segment = String(query.segment || "all").toLowerCase();

    const andParts = [
      { email: { $regex: emailTerm, $options: "i" } },
      { $nor: [{ role: "admin" }, { role: "viewer" }] },
    ];

    if (segment === "investisseur") {
      andParts.push(statusMatchesAny(["fonctionnaire", "cto", "entrepreneur"]));
    } else if (segment === "etudiant") {
      andParts.push(statusMatchesAny(["titulaire", "étudiant", "etudiant"]));
    }

    const users = await User.find({ $and: andParts }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const updates = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
    };
    if (typeof req.body.status === "string") {
      updates.status = req.body.status;
    }
    if (req.body.cupsToday !== undefined && req.body.cupsToday !== "") {
      const n = Number(req.body.cupsToday);
      if (!Number.isNaN(n) && n >= 0) {
        updates.cupsToday = Math.floor(n);
      }
    }

    const files = req.files;
    if (files?.image?.[0]) {
      updates.imageUrl = `/uploads/users/${files.image[0].filename}`;
    }
    if (files?.video?.[0]) {
      updates.videoUrl = `/uploads/users/${files.video[0].filename}`;
    }

    const user = await User.findByIdAndUpdate(id, { $set: updates }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
