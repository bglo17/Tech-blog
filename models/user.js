const { DataTypes } = require("sequilize/types");
const sequelize = require("../config/connection");
 
const bcrypt = require("bcryptjs"); 

class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type= DataTypes.Integer,
        allowNull: false, 
        autoIncrement: true, 
        primaryKeys: true
    }, 
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            len: [8],
        },
    },
},
{
hooks: {
    beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10); return newUser; 
    },
    beforeCreate: async (updateUser) => {
        updateUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser; 
    }, 
}, 
sequelize, 
timestamps: false, 
freezeTableName: true, 
modelName: 'user', 
}
);

module.exports = User; 