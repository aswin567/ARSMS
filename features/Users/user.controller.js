const db = require("./../../config/db.setup");
const userDAO = db.userDAO;
const Op = db.SequelizeType.Op;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const user = {
    name: req.body.name,
    roleNo: req.body.roleNo,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
  };

  userDAO.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const userDetails = await userDAO.findAll()
    res.send(userDetails);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  }

};