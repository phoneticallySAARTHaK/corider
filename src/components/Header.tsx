import { Box, Heading, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalData } from "../App";

export default function Header() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users } = useContext(GlobalData);

  const currentUser = users[parseInt(userId ?? "") - 1];
  if (userId && !currentUser) {
    throw new Error(`User Not found`);
  }

  return (
    <Box
      as="header"
      mb={4}
      display="flex"
      alignItems={"center"}
      gap={4}
      bg="blackAlpha.100"
      p={4}
      fontSize="calc(1.25rem + min(1vw, 1vh))"
    >
      {userId ? (
        <>
          <IconButton
            onClick={() => navigate("/")}
            variant={"outline"}
            colorScheme={"blackAlpha"}
            icon={<AiOutlineArrowLeft />}
            aria-label={"back"}
            fontSize={"larger"}
            title="Back"
            borderRadius={"100%"}
          />
          <Heading fontSize={"inherit"}>{`User: ${currentUser.name}`}</Heading>
        </>
      ) : (
        <Heading textAlign={"center"} flex={1} fontSize={"inherit"}>
          Users
        </Heading>
      )}
    </Box>
  );
}
