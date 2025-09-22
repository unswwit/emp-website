import { hoursTag } from "../../types/hours";

const mapTagText = (tag: hoursTag) => {
  switch (tag) {
    case hoursTag.MENTOR:
      return '1-1 Mentor Meeting';
    case hoursTag.TRAINING:
      return 'Compulsory Training';
    case hoursTag.EVENT:
      return 'WIT Events';
    default:
      return '';
  }
};

export { mapTagText };
