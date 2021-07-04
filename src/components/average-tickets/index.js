import { useContext } from "react";
import { Heading, Box, Progress, Tooltip } from "@chakra-ui/react";

import { DataContext } from "../../context/data";

function AverageTickets() {
  const context = useContext(DataContext);
  // context.average
  return <Box className='item' borderWidth="0px" p='6' overflow="hidden">
    {console.log(context.average)}
    <Heading size='sm'>Averages</Heading>
    <Box d='flex' h='100%' flexDir='column' justifyContent='space-evenly'>

      <Box>
        <Heading fontWeight='500' pb='5px' size='xs'>Ticket until claim time(minute)</Heading>
        <Tooltip label={(context.average.avgOpened / 60).toFixed(2)+' minutes'} aria-label="A tooltip">
          <Box d='flex' w='100%'>
            0
            <Progress m='5px' w='100%' colorScheme='facebook' value={context.average.avgOpened / 60} max={5} />
            5
          </Box>
        </Tooltip>
      </Box>
      <Box>
        <Heading fontWeight='500' pb='5px' size='xs'>In-Ticket time(minute)</Heading>
        <Tooltip label={(context.average.avgClaimed / 60).toFixed(2)+' minutes'} aria-label="A tooltip">
          <Box d='flex' w='100%'>
            0
            <Progress m='5px' w='100%' colorScheme='facebook' value={context.average.avgClaimed / 60} max={20} />
            20
          </Box>
        </Tooltip>
      </Box>
      <Box>
        <Heading fontWeight='500' pb='5px' size='xs'>Tickets per student</Heading>
        <Tooltip label={(context.average.avgTicketsPerStudent).toFixed(2)+' tickets'} aria-label="A tooltip">
          <Box d='flex' w='100%'>
            0
            <Progress m='5px' w='100%' colorScheme='facebook' value={context.average.avgTicketsPerStudent} max={5} />
            4
          </Box>
        </Tooltip>

      </Box>

    </Box>
  </Box>;
}

export default AverageTickets;
