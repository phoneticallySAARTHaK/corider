import { Flex } from "@chakra-ui/react";
import React, { ReactElement, useContext } from "react";
import { RouteObject, useParams } from "react-router-dom";
import { GlobalData } from "../App";
import Avatar from "../components/Avatar/Avatar";
import { WebsiteLink } from "../components/WebsiteLink";

function User() {
  const { userId } = useParams();
  const index = parseInt(userId ?? "") - 1;

  const user = useContext(GlobalData).users[index];

  if (!user) throw new Error("User not Found");

  return (
    <Flex flexDirection={"column"} align="center" w={"100%"} p={4} pb={6}>
      <Avatar className="large-pfp" user={user} />
      {descList(user)}
    </Flex>
  );
}

const Li: React.FC<{ dt: string; dd: ReactElement | string | number }> = ({
  dt,
  dd,
}) => (
  <>
    <dt>{dt}</dt> <dd>{dd}</dd>
  </>
);

function descList(obj: any) {
  const items = [];
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      items.push(<Li key={prop} dt={prop} dd={descList(obj[prop])} />);
    } else {
      const dd =
        prop === "website" ? <WebsiteLink href={obj[prop]} /> : obj[prop];

      items.push(<Li key={prop} dt={prop} dd={dd} />);
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
};
