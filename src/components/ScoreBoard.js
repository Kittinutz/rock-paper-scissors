import { Grid, Box, Typography } from "@mui/material"
import { memo } from "react"

const ScoreBoard = ({ scoreBoard, robotScore, humanScore, mappingScore }) => {
  return (
    <Box minHeight="348px">
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
      <Box my={2}>
        <Grid container >
          <Grid item xs={4}>
            <Typography>Human pick</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Robot pick</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Result</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box maxHeight="300px" sx={{ overflowX: 'hidden' }}>
        {scoreBoard.map((selected, index) => {
          const [human, robot] = selected.split('-')
          const isDraw = human === robot
          const isLose = !isDraw && mappingScore[selected] !== 1;
          return (
            <Box key={index}>
              <Grid container >
                <Grid item xs={4} >
                  {human}
                </Grid>
                <Grid item xs={4}>
                  {robot}
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    {isDraw ? 'Draw' : ''}
                    {isLose ? 'Robot win' : ''}
                    {mappingScore[selected] === 1 ? 'Human Win' : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )
        })}
      </Box>
    </Box >
  )
}

export default memo(ScoreBoard)