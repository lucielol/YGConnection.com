import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Authentication middlware
 * Verification token JWT from a header Authorization
 */
export const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

/**
 * Middleware Role-Based Authorization
 * Ensure users have the appropriate role to access certain routes
 * @param {string[]} roles
 * @returns
 */
export const RoleMiddleware = (roles) => {
  return async (req, res, next) => {
    const user = req.user;

    if (!user || !roles.includes("admin")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

export const UploadMiddlware = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = "public/images";

      if (file.fieldname === "artistImage") {
        folder = path.join(folder, "artists");
      } else if (file.fieldname.includes("memberImage")) {
        folder = path.join(folder, "members");
      } else if (file.fieldname === "productImage") {
        folder = path.join(folder, "products");
      } else if (file.fieldname === "concertImage") {
        folder = path.join(folder, "concerts");
      }

      cb(null, folder);
    },

    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage }).any();
};
