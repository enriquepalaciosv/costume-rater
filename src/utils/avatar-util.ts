import youngMale from "../icons/young-male.svg";
import youngFemale from "../icons/young-female.svg";
import adultFemale from "../icons/adult-female.svg";
import adultMale from "../icons/adult-male.svg";
import girl from "../icons/girl.svg";
import boy from "../icons/boy.svg";
import group from "../icons/group.svg";
import person from "../icons/person.svg";
import { Participant } from "../types/Participant";

export const getAvatar = (type?: Participant) => {
  switch (type) {
    case Participant.Group:
      return group;
    case Participant.Boy:
      return boy;
    case Participant.Girl:
      return girl;
    case Participant.YoungFemale:
      return youngFemale;
    case Participant.YoungMale:
      return youngMale;
    case Participant.AdultFemale:
      return adultFemale;
    case Participant.AdultMale:
      return adultMale;
    default:
      return person;
  }
};
