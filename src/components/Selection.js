import { Box, IconButton } from "@mui/material"
import { memo, useCallback } from "react"

const Selection = ({ selector, onSelect }) => {
  const handleSelect = useCallback(() => {
    onSelect(selector)
  }, [selector, onSelect])
  return (
    <Box>
      <IconButton color="secondary" size="medium" onClick={handleSelect}>{selector}</IconButton>
    </Box>
  )

}

export default memo(Selection)