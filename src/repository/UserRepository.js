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

    createUser = async (createUserDto) => {

        const userRepository = dataSource.getRepository(UserEntity);

        const newUser = new UserEntity(createUserDto);

        newUser = createUserDto.userId;
        newUser = createUserDto.password;
        newUser = createUserDto.name;
        newUser = 0;

        await userRepository.save(newUser);

        return true;
    }

}

module.exports = UserRepository;
