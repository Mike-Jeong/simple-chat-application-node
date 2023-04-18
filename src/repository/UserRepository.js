const { dataSource } = require("../../dataSource");
const { Not, Equal } = require("typeorm");
const UserEntity = require("../entity/User.entity.js");

class UserRepository {

    getUsers = async (loginUserId) => {

        const userRepository = dataSource.getRepository(UserEntity);

        const users = await userRepository.find({
            where: { id: Not(Equal(loginUserId)) },
        });

        return users;

    }

    getUser = async (loginUserId) => {

        const userRepository = dataSource.getRepository(UserEntity);

        const loginUser = await userRepository.findOne({where: { id: loginUserId }, relations: ["friends"] });

        return loginUser;
    }

}

module.exports = UserRepository;
