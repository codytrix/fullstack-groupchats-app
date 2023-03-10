const { Router } = require("express");
const editProfileController = require("../controllers/editProfileController");
const multer = require("multer");
const { verifyToken } = require("../middlewares/verifyTokenMiddleware");
const fs = require("fs");

//Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/users/${req.decodedToken.id}`;
    //create the user folder if dosn't exist
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: async function (req, file, cb) {
    const fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, `avatar-temp.${fileExtension}`);
  },
});

const upload = multer({
  storage,
});

//Router

const router = Router();

router.put(
  "/user/profile",
  verifyToken,
  upload.single("file"),
  editProfileController.editProfile_put
);

router.put("/user/info", verifyToken, editProfileController.editInfo_put);

module.exports = router;
