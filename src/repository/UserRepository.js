const { dataSource } = require("../../dataSource");
const { Not, Equal } = require("typeorm");
const UserEntity = require("../entity/User.js");

class UserRepository {

    getUsers = async (loginUserId) => {

        const userRepository = dataSource.getRepository(UserEntity);

        const users = await userRepository.find({
            where: { id: Not(Equal(loginUserId)) },
        });

        return users;

    }

}

module.exports = UserRepository;