module.exports = (sequelizeDB, SequelizeType) => {
    const UnAuthorisedAccessList = sequelizeDB.define("unAuthorisedAccessList", {
        areaName: {
            type: SequelizeType.STRING,
            unique: true,
        },
        unAuthorisedAccessList: {
            type: SequelizeType.ARRAY(SequelizeType.JSON)
        }
    });

    return UnAuthorisedAccessList;
};
