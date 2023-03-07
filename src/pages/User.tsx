import { Flex, Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RouteObject, useParams } from "react-router-dom";
import { GlobalData } from "../App";
import { getAvatarLink } from "../utils";
import { WebsiteLink } from "../components/WebsiteLink";

function User() {
  const { userId } = useParams();
  const index = parseInt(userId ?? "") - 1;
  const user = useContext(GlobalData).users[index];

  return (
    <Flex flexDirection={"column"} align="center" w={"100%"} p={4} pb={6}>
      <Image
        src={getAvatarLink(user.username)}
        w={"calc(5rem + 10vw)"}
        maxH={"30vh"}
        maxW={"30vh"}
        border={"4px #DDD solid"}
        outline={"4px #EEE solid"}
        borderRadius={"100%"}
      />
      {descList(user)}
    </Flex>
  );
}

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
        prop === "website" ? <WebsiteLink href={obj[prop]} /> : obj[prop];

      items.push(
        <React.Fragment key={prop}>
          <dt>{prop}</dt> <dd>{dd}</dd>
        </React.Fragment>
      );
    }
  }
  return <dl>{items}</dl>;
}

async function loader() {
  return null;
}

export const UserRoute: RouteObject = {
  path: "users/:userId",
  element: <User />,
  loader: loader,
  errorElement: <p>No user</p>,
};
