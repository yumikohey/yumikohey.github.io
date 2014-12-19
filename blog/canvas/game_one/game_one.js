gameStateTitle()
-- Display the title screen text and waits for the space bar to be pressed before the game starts.

gameStateNewGame()
-- Sets up all the defaults for a new game. All of the arrays for holding display objects are reinitialized -- the game level is reset to 0, and the game score is set to 0.

gameStateNewLevel()
-- Increases the level value by one and then sets the "game knob" values to control the level difficulty. See the upcoming section "Level Knobs" on page 479 for details.

gameStatePlayerStart()
-- Fades the player graphic onto the screen from 0 alpha to 1. When this is complete, level play will start.

gameStatePlayLevel()
-- Controls the play of the game level. It calls the update() and render() functions, as well as the functions for evaluating keyboard input for player ship control.

gameStatePlayerDie()
-- Starts up an explosion at the location where the player ship was when it was hit by a rock, saucer, or saucer missile. When the explosion is complete (all particles in the explosion have exhausted their individual life values), it sets the move to the GAME_STATE_PLAYER_START date.

gameStateGameOver()
-- Display the "Game Over" screen and starts a new game when the space bar is pressed.

Game application functions

Aside from the game application state functions, there are a number of functions we need for the game to run. Each state function will call these functions needed:

resetPlayer()
-- Resets the player to the center of the game screen and readies it for game play.

checkForExtraShip()
-- Checks to see whether the player should be awarded an extra ship. See the section "Awarding the Player Extra Ships" on page 481 for details about this algorithm.

checkForEndOfLevel()
-- Checks to see whether all the rocks have been destroyed on a given level and if so, starts up a new level. See the section "Level and Game End" on page 480 for details about this algorithm.

fillBackground()
-- Fills the canvas with the background color on each frame tick.

setTextStyle()
-- Sets the base text style before text is written to the game screen.

renderScoreBoard()
-- In called on each frame tick. It displays the updated score, number of ships remaining, and the current FPS for the game.

checkKeys()
-- Checks the keyPressList array and then modifies the player ship attributes based on the values found to be true.

update()
-- Is called from GAME_STATE_PLAY_LEVEL. It in turn calls the update() function for each individual display object array.
  -- updatePlayer()
  -- updatePlayerMissiles()
  -- updateRocks()
  -- updateSaucers()
  -- updateSaucerMissiles()
  -- updateParticles()

render()
-- Is called from GAME_STATE_PLAY_LEVEL. It in turn calls the render() function for each individual display object array.
  -- renderPlayer()
  -- renderPlayerMissiles()
  -- renderRocks()
  -- renderSaucers()
  -- renderSaucerMissiles()
  -- renderParticles()

checkCollisions()
-- Loops through the individual game display objects and checks them for collisions. See the section "Apply collision detection" on page 481 for a detailed discussion of this topic.

firePlayerMissile()
-- Creates a playerMissile object at the center of the player ship and fires it in the direction the player ship is facing.

fireSaucerMissile()
-- Creates a saucerMissile object at the center of the saucer and fires it in the direction of the player ship.

playerDie()
-- Creates an explosion for the player by calling createExplode(), as well as changing the game application state to GAME_STATE_PLAYER_DIE.

createExplode()
-- Accepts in the location for the explosion to start and the number of particles for the explosion.

boudingBoxCollide()
-- Determines whether the rectangular box that encompasses an object width and height is overlapping the bounding box of another object. It takes in two logical display objects as parameters and returns true if they are overlapping and false if they are not.