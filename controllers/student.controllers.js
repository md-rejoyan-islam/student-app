const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const verifyAccountMail = require("../utility/mail");
const smsSEND = require("../utility/sms");



//students page
const homepage = (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const verifiedStudent = student.filter(
    (student) => student.isVerified == true
  );
  res.render("students/index", {
    student: verifiedStudent,
    title: "All student",
  });
};

// student add page
const addStudentPage = (req, res) => {
  res.render("students/create", {
    title: "add student",
  });
};

// unverified student page
const unverifiedPage = (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const unverifiedStudent = student.filter(
    (student) => student.isVerified == false
  );
  res.render("students/unverify", {
    student: unverifiedStudent,
    title: "unverified student"
  });
};


// student add form by post method
const createStudent = async (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const { name, email, location, photo, phone } = req.body;
  let lastId = 1;
   const smsVerificationCode = Math.floor(Math.random() * 100000);
  const token = Date.now() + "_" + Math.floor(Math.random() * 1000000);
    
  if (student.length > 0) {
    lastId = student[student.length - 1].id + 1;
  } else {
    lastId = 1;
  }
  student.push({
    id: lastId,
    name,
    email,
    phone,
    photo: req.file ? req.file.filename : "avater.webp",
    location,
    isVerified: false,
    token,
    smsToken: smsVerificationCode
  });
  await verifyAccountMail(email, "testing", { name, token });


  writeFileSync(
    path.join(__dirname, "../DB/studentData.json"),
    JSON.stringify(student)
  );
  res.redirect("/students");
};

//student edit page
const editStudent = (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const { id } = req.params;
  const singleStudent = student.find((singleStudent) => singleStudent.id == id);
  res.render("students/edit", {
    title: "edit student",
    singleStudent,
  });
};

//student data update page
const updateData = (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const { id } = req.params;
  const { name, email, phone, photo, location } = req.body;

  student[student.findIndex((student) => student.id == id)] = {
    ...student[student.findIndex((student) => student.id == id)],
    name,
    email,
    phone,
    photo: req.file ? req.file.filename : "avater.webp",
    location,
  };
  writeFileSync(
    path.join(__dirname, "../DB/studentData.json"),
    JSON.stringify(student)
  );
  res.redirect("/students");
};

//show single student data page
const showSingleStudent = (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const { id } = req.params;
  const singleStudent = student.find((student) => student.id == id);
  res.render("students/show", {
    title: "single student",
    singleStudent,
  });
};

// student delete route
const deleteSingleData = (req, res) => {
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const { id } = req.params;
  const newData = student.filter((data) => data.id != id);

  writeFileSync(
    path.join(__dirname, "../DB/studentData.json"),
    JSON.stringify(newData)
  );
  res.redirect("/students");
};

//email verify route
const verifyAccount = (req, res) => {
  const { token } = req.params;
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  student[student.findIndex((student) => student.token == token)] = {
    ...student[student.findIndex((student) => student.token == token)],
    token: null,
    smsToken:null,
    isVerified: true,
  };
  writeFileSync(
    path.join(__dirname, "../DB/studentData.json"),
    JSON.stringify(student)
  );
  res.redirect("/students");
};

//sms verify
const smsVerifyAccount =async (req,res)=>{
  
  const { id } = req.params;
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  const idStudent = student.find((student) => student.id == id);
  const {phone,smsToken} = student.find((student) => student.id == id);
  await smsSEND(phone, smsToken);
  res.render("students/smsVerify", {
    title: "smsVerification",
    student: idStudent,
  });
}

const smsVerifyRoute = (req, res) => {
  const { token } = req.params;
 
  const student = JSON.parse(
    readFileSync(path.join(__dirname, "../DB/studentData.json"))
  );
  student[student.findIndex((student) => student.smsToken == token)] = {
    ...student[student.findIndex((student) => student.smsToken == token)],
    token: null,
    smsToken:null,
    isVerified: true,
  };
  console.log(student);
  writeFileSync(
    path.join(__dirname, "../DB/studentData.json"),
    JSON.stringify(student)
  );
  res.redirect('/students')
};




// exports controllers
module.exports = {
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
};
