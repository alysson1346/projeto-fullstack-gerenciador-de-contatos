import { IContactrCreate } from "../../interfaces/contact";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";

const contactCreatetService = async ({
  name,
  email,
  phone,
  userEmail,
}: IContactrCreate) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });
  if (user !== null) {
    const contact = new Contact();
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.user = user;

    contactRepository.create(contact);
    await contactRepository.manager.save(contact);

    return contact;
  }
};

export default contactCreatetService;
