import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/user";

const updateUserServices = async (email: string, obj: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });
  if (user !== null) {
    const update = { ...user, ...obj };

    await userRepository.update(user?.id, update);
    return update;
  }
};

export default updateUserServices;
