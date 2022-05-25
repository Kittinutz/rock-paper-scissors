import logo from './logo.svg';
import './App.css';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Selection from './components/Selection';
import ScoreBoard from './components/ScoreBoard';
const getScore = (scoreBoardArr, mappingScore) => {
  let humanScore = 0
  let drawScore = 0;
  for (let i = 0; i < scoreBoardArr.length; i++) {
    const settleScore = scoreBoardArr[i]
    const [humanSelect, botSelect] = settleScore.split('-')
    humanScore += (mappingScore[settleScore] || 0)
    if (humanSelect === botSelect) {
      drawScore += 1;
    }
  }
  const robotScore = scoreBoardArr.length - humanScore - drawScore
  return {
    humanScore,
    robotScore
  }
}
function App() {
  const rcsMapping = useMemo(() => ({
    '🪨': '🪨',
    '✂️': '✂️',
    '📜': '📜',
  }), [])

  const mappingScore = useMemo(() => ({
    '🪨-✂️': 1,
    '📜-🪨': 1,
    '✂️-📜': 1,
  }), [])

  const [scoreBoard, setScoreBoard] = useState([])
  const [robotSelected, setRobotSelect] = useState('')
  const optionArr = useMemo(() => {
    return Object.keys(rcsMapping)
  }, [rcsMapping])

  const handleSelected = useCallback((userSelected) => {
    const botSelected = Math.floor(Math.random() * 100 % 3)
    const recordScore = `${userSelected}-${optionArr[botSelected]}`
    setRobotSelect(optionArr[botSelected])
    setScoreBoard(v => [...v, recordScore])
  }, [optionArr])

  const { humanScore, robotScore } = useMemo(() => getScore(scoreBoard, mappingScore), [scoreBoard, mappingScore])

  return (
    <div className="App">
      <header className="App-header">
        <Grid container>
          <Grid item xs={6}>
            <Grid container alignItems="center">
              <Grid item xs={12} m={2}>
                {robotSelected}
                <Typography>Robots</Typography>
              </Grid>
              <Grid item xs={12} m={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  {
                    optionArr.map((option) => {
                      return (
                        <Selection key={option} selector={option} onSelect={handleSelected} />
                      )
                    })
                  }
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <ScoreBoard scoreBoard={scoreBoard} mappingScore={mappingScore} humanScore={humanScore} robotScore={robotScore} />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
