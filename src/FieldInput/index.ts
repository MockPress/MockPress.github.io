import AutoIncrement from "./AutoIncrement";
import KoreanName from "./KoreanName";
import Image from "./Image";
import Date from "./Date";
import Integer from "./Integer";
import KoreanAddress from "./KoreanAddress";
import Money from "./Money";
import Text from "./Text";

export const fieldComponentMapper = {
  autoIncrement: AutoIncrement,
  koreanName: KoreanName,
  image: Image,
  date: Date,
  integer: Integer,
  koreanAddress: KoreanAddress,
  money: Money,
  text: Text,
};
