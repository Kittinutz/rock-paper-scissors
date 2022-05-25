import { Grid, Box, Typography } from "@mui/material"
import { Fragment, memo } from "react"

const ScoreBoard = ({ scoreBoard, robotScore, humanScore, mappingScore }) => {
  return (
    <Box>
      <Typography> Score board</Typography>
      <Grid container >
        <Grid item xs={6}>
          <Typography variant="body1">
            Human Score:{humanScore}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            Bot Score:{robotScore}
          </Typography>
        </Grid>
      </Grid>
      <Grid container overflow="scroll" minHeight="300px" maxHeight="300px" sx={{ overflowX: 'hidden' }}>
        {scoreBoard.map((selected, index) => {
          const [human, robot] = selected.split('-')
          return (
            <Fragment key={`${selected}-${index}`}>
              <Grid item xs={4} >
                {human}
              </Grid>
              <Grid item xs={4}>
                {robot}
              </Grid>
              <Grid item xs={4}>
                {mappingScore[selected] == 1 ? 'Human Win' : ""}
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
    </Box >
  )
}

export default memo(ScoreBoard)