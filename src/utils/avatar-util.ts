import youngMale from "../icons/young-male.svg";
import youngFemale from "../icons/young-female.svg";
import adultFemale from "../icons/adult-female.svg";
import adultMale from "../icons/adult-male.svg";
import girl from "../icons/girl.svg";
import boy from "../icons/boy.svg";
import group from "../icons/group.svg";
import person from "../icons/person.svg";
import { Competitor } from "../types/Competitor";

export const getAvatar = (type?: Competitor) => {
  switch (type) {
    case Competitor.Group:
      return group;
    case Competitor.Boy:
      return boy;
    case Competitor.Girl:
      return girl;
    case Competitor.YoungFemale:
      return youngFemale;
    case Competitor.YoungMale:
      return youngMale;
    case Competitor.AdultFemale:
      return adultFemale;
    case Competitor.AdultMale:
      return adultMale;
    default:
      return person;
  }
};
