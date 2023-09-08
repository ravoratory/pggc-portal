import Image from "next/image";

import Correct from "../../../public/assets/correct.svg";
import Nothing from "../../../public/assets/nothing.svg";
import Partial from "../../../public/assets/partial.svg";

interface AnsStatusProps {
  status: string;
}

const StatusIcon = (props: AnsStatusProps) => {
  const { status } = props;
  return (
    <Image
      src={
        status === "correct"
          ? Correct
          : status === "partial"
          ? Partial
          : Nothing
      }
      alt={status}
    />
  );
};
export default StatusIcon;
