module.exports = (sequelizeDB, SequelizeType) => {
    const UserDetails = sequelizeDB.define("userDetails", {
      name: {
        type: SequelizeType.STRING
      },
      roleNo: {
        type: SequelizeType.STRING,
        primaryKey: true
      },
      mobileNumber: {
        type: SequelizeType.STRING
      },
      email: {
        type: SequelizeType.STRING
      }
    });
  
    return UserDetails;
  };
  