import { Flex, Image, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalData } from "../App";
import { getAvatarLink } from "../utils";
import { BiLinkExternal } from "react-icons/bi";

function descList(obj: any) {
  const items = [];
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      items.push(
        <>
          <dt>{prop}</dt> <dd>{descList(obj[prop])}</dd>
        </>
      );
    } else {
      const dd =
        prop === "website" ? (
          <Link
            isExternal
            href={`https://${obj[prop]}`}
            display={"flex"}
            gap={1}
            alignItems="center"
          >
            {obj[prop]} <BiLinkExternal />
          </Link>
        ) : (
          obj[prop]
        );

      items.push(
        <>
          <dt>{prop}</dt> <dd>{dd}</dd>
        </>
      );
    }
  }
  return <dl>{items}</dl>;
}

function User() {
  const { userId } = useParams();
  const index = parseInt(userId ?? "") - 1;
  const user = useContext(GlobalData).users[isNaN(index) ? 0 : index];

  return (
    <Flex flexDirection={"column"} align="center" w={"100%"} p={4} pb={6}>
      <Image
        src={getAvatarLink(user.username)}
        w={"calc(5rem + 10vw)"}
        maxH={"30vh"}
        border={"2px gray solid"}
        borderRadius={"full"}
      />
      {descList(user)}
    </Flex>
  );
}

async function loader() {
  return null;
}

export const UserRoute = {
  path: "users/:userId",
  element: <User />,
  loader: loader,
};
