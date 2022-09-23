import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";

const contactListOneService = async (userEmail: string, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });

  const contact = await contactRepository.findOne({
    where: {
      id: id,
    },
    relations: { user: true },
  });

  if (contact?.user.id === user?.id) {
    return contact;
  }
};

export default contactListOneService;
