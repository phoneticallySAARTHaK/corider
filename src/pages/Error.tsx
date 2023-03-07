import { Box, VStack } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <VStack>
      <h1>Oops!</h1>
      <Box>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </Box>
    </VStack>
  );
}
