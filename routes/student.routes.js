const express = require("express");
const path = require("path");
const router = express.Router();
const photoUploaderMulter = require("../middlewares/photoUploader");
const {
  homepage,
  addStudentPage,
  createStudent,
  showSingleStudent,
  editStudent,
  updateData,
  deleteSingleData,
  unverifiedPage,
  verifyAccount,
  smsVerifyAccount,
  smsVerifyRoute,
} = require("../controllers/student.controllers");

//page routes
router.get("/", homepage);
router.get("/create", addStudentPage);
router.get("/unverified", unverifiedPage); 
router.post("/createData", photoUploaderMulter, createStudent);
router.get("/edit/:id", editStudent);
router.get("/verify/:token", verifyAccount); 
router.get("/smsVerify/:id", smsVerifyAccount);
router.get("/smsVerifyByToken/:token", smsVerifyRoute);
router.post("/update/:id", photoUploaderMulter, updateData);
router.get("/delete/:id", deleteSingleData);
router.get("/:id", showSingleStudent);

//exports
module.exports = router;
