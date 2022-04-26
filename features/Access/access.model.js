module.exports = (sequelizeDB, SequelizeType) => {
    const AccessDetails = sequelizeDB.define("accessDetails", {
      name: {
        type: SequelizeType.STRING,
        unique: true,
      },
      allowedUsers: {
        type: SequelizeType.ARRAY(SequelizeType.STRING),
      },
      cameraUrl: {
        type: SequelizeType.STRING,
      }
    });
  
    return AccessDetails;
  };
  