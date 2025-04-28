// app/controllers/user.controller.js
export const allAccess = (req, res) => {
    res.status(200).send('Public Content.');
  };
   
  export const userBoard = (req, res) => {
    res.status(200).json({ message: "User Content.", status: "success" });
  };
   
  export const adminBoard = (req, res) => {
    res.status(200).send('Admin Content.');
  };
   
  export const HrdBoard = (req, res) => {
    res.status(200).send('HRD Content.');
  };