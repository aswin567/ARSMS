const db = require("./../../config/db.setup");
const unAuthorisedDAO = db.unAuthorisedDAO;
const userDAO = db.userDAO;
const Op = db.SequelizeType.Op;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.areaName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    areaName: req.body.areaName,
    unAuthorisedAccessList: req.body.unAuthorisedAccessLists,
  };

  unAuthorisedDAO.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Entry."
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  unAuthorisedDAO.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Unauthorised access was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update unauthorsied access with id=${id}. Maybe Unauthorised Access was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Unauthorised Access with id=" + id
      });
    });
};

exports.findAll = (req, res) => {

  unAuthorisedDAO.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Unauthorised Access."
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const unAuthorsiedAcess = await unAuthorisedDAO.findByPk(id);
   // unAuthorsiedAcess.unAuthList.userId = await userDAO.findByPk(nAuthorsiedAcess.unAuthList.userId);
    const userList = await userDAO.findAll();
    console.log(userList);
    unAuthorsiedAcess.unAuthorisedAccessList.forEach((access)=>{
      access.userId = userList.find((user)=> user.roleNo ===  access.userId);
    })
    res.send(unAuthorsiedAcess);
  }
  catch(err) {
    res.status(500).send({
      message: "Error retrieving Unauthorised Access with id=" + id
    });
  }

};

exports.addUnuthorisedEnty = async (req, res) => {
  const id = req.params.id;
  try {
    const areaDetails = await unAuthorisedDAO.findByPk(id);
    console.log(areaDetails.dataValues);
    const updatedEntryList = areaDetails.dataValues.unAuthorisedAccessList.concat(req.body.unAuthorisedAccessList);
    req.body.unAuthorisedAccessList = updatedEntryList;
    const updatedUnauthrosiedList = await unAuthorisedDAO.update(req.body, { where: { id: id } });
    if (updatedUnauthrosiedList == 1) {
      res.send({
        message: "Unauthorised access was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update unauthorsied access with id=${id}. Maybe Unauthorised Access was not found or req.body is empty!`
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message: "Error retrieving Unauthorised Access with id=" + id
    });
  }


};
