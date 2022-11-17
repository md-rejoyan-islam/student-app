const multer = require("multer");
const path = require("path");

//photo upload multer config
const imageStorage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, path.join(__dirname, "../public/images/students"));
  },
  filename: (req, file, cd) => {
    cd(
      null,
      Date.now() + "_" + Math.floor(Math.random() * 10000000) +"_"+ file.originalname
    );
  },
});
const studentPhotoMulter = multer({
  storage: imageStorage,
}).single("photo");

//exports
module.exports = studentPhotoMulter;
