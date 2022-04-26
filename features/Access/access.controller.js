const db = require("./../../config/db.setup");
const accessDAO = db.accessDAO;
const Op = db.SequelizeType.Op;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const access = {
    name: req.body.name,
    allowedUsers: req.body.allowedUsers,
    cameraUrl: req.body.cameraUrl,
  };

  accessDAO.create(access)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Access."
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const accessInfo = await accessDAO.update(req.body, {
      where: { id: id }
    });
    if (accessInfo == 1) {
      res.send({
        message: "Access was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot access with id=${id}. Maybe Access was not found or req.body is empty!`
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message: "Error updating Access with id=" + id
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const userDetails = await accessDAO.findAll()
    res.send(userDetails);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving access list."
    });
  }

};