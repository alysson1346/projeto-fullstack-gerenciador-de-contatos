import { IUserCreate, IUser } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";

const currentDate = new Date();

const userCreateService = async ({
  name,
  email,
  phone,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = new User();
  user.name = name;
  user.email = email;
  user.phone = phone;
  user.password = bcrypt.hashSync(password, 10);
  user.created_at = currentDate;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default userCreateService;
