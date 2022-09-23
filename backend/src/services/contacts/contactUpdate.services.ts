import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { IContactUpdate } from "../../interfaces/contact";

const contactUpdateOneService = async (
  userEmail: string,
  id: string,
  obj: IContactUpdate
) => {
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
    const update = { ...contact, ...obj };
    await contactRepository.update(id, update);
    return update;
  }
};

export default contactUpdateOneService;
