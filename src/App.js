import './App.css';
import { Box, Button, Grid, Stack, Typography, Zoom } from '@mui/material';
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
  const [userSelected, setUserSelect] = useState('')
  const [isSelecting, setIsSelecting] = useState(false)

  const optionArr = useMemo(() => {
    return Object.keys(rcsMapping)
  }, [rcsMapping])

  const updateRemainingScore = useCallback((updateScore) => {
    localStorage.setItem('scoreRemain', JSON.stringify(updateScore))
  }, [])

  const updateScoreBoard = useCallback(async (recordScore) => {
    await setTimeout(() => {
      setScoreBoard(v => {
        const updateScore = [recordScore, ...v,]
        updateRemainingScore(updateScore)
        return updateScore
      }
      )
    }, 1000)
  }, [updateRemainingScore])

  const handleSelected = useCallback((userSelected) => {
    const botSelected = Math.floor(Math.random() * 100 % 3)
    const recordScore = `${userSelected}-${optionArr[botSelected]}`
    setUserSelect(userSelected);
    setRobotSelect(optionArr[botSelected])
    updateScoreBoard(recordScore)
    setIsSelecting(true)
  }, [optionArr, setIsSelecting, updateScoreBoard])

  const handleClearScoreBoard = async () => {
    setScoreBoard([])
    await updateRemainingScore([])
  }

  useEffect(() => {
    function initialRemainingScore() {
      const scoreRemain = localStorage.getItem('scoreRemain');
      setScoreBoard(JSON.parse(scoreRemain))
    }
    initialRemainingScore();
    return () => {
      setScoreBoard([])
    }
  }, [])

  useEffect(() => {
    let timeout;
    async function setRemoveAnimation() {
      timeout = await setTimeout(() => {
        setUserSelect('')
        setRobotSelect('')
        setIsSelecting(false)
      }
        , 1000)
    }

    if (isSelecting) {
      setRemoveAnimation()
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isSelecting])

  const { humanScore, robotScore } = useMemo(() => getScore(scoreBoard, mappingScore), [scoreBoard, mappingScore])

  return (
    <div className="App">
      <header className="App-header">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container alignItems="center">
              <Grid item xs={12} m={2} minHeight="100px">
                <Box minHeight="76px">
                  <Zoom in={!!robotSelected} style={{ transitionDelay: userSelected ? '500ms' : '0ms' }}>
                    <Box fontSize="58px">
                      {robotSelected}
                    </Box>
                  </Zoom>
                </Box>
                <Typography>Robots</Typography>
              </Grid>
              <Grid item xs={12} m={2} minHeight="100px">
                <Box minHeight="76px">
                  <Zoom in={!!userSelected}>
                    <Box fontSize="58px">
                      {userSelected}
                    </Box>
                  </Zoom>
                </Box>
                <Typography>User</Typography>
              </Grid>
              <Grid item xs={12} m={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  {
                    optionArr.map((option) => {
                      return (
                        <Selection key={option} selector={option} onSelect={handleSelected} disabled={isSelecting} />
                      )
                    })
                  }
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <ScoreBoard scoreBoard={scoreBoard} mappingScore={mappingScore} humanScore={humanScore} robotScore={robotScore} />
            <Button onClick={handleClearScoreBoard}>Clear score board</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
