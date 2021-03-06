import { PlayOptions, ITimelineModel } from '../core/types'
import { loopOn } from '../core/timeloop'
import { _ } from '../utils/constants'
import { update } from './update'
import { PLAY } from '../actions'
import { IReducerContext } from '../core/types'
import { isDefined, isNumber } from '../utils/inspect'
import { seek } from './seek'
import { updateRate } from './update-rate'

export function play(model: ITimelineModel, options: PlayOptions, ctx: IReducerContext) {
  const { playerConfig, timing } = model
  if (options) {
    // transfer options to model
    playerConfig.repeat = options.repeat
    playerConfig.yoyo = !!options.alternate
    playerConfig.destroy = !!options.destroy

    if (isDefined(options.to)) {
      // setup the next automatic pause time
      playerConfig.to = isNumber(options.to) ? options.to as number : model.labels[options.to]
    }
  }

  // ensure default play options
  playerConfig.repeat = playerConfig.repeat || 1
  playerConfig.yoyo = playerConfig.yoyo || false

  // set state to playing
  model.timing.playing = true
  model.timing.active = true

  // reset current time if out of bounds or first time playing
  const isForwards = timing.rate >= 0
  if (isForwards && timing.time === timing.duration) {
    timing.time = 0
  } else if (!isForwards && timing.time === 0) {
    timing.time = timing.duration
  }

  if (options && isDefined(options.from)) {
    // if from is specified, seek to it
    seek(model, options.from, ctx)
  }

  // determine if the rate needs to be reversed
  const shouldReverse =
    isDefined(playerConfig.to) && (isForwards && timing.time > playerConfig.to) ||
    (!isForwards && timing.time < playerConfig.to)

  if (shouldReverse) {
    updateRate(model, timing.rate * -1, ctx)
  }

  // start auto-updating players
  loopOn(model.id)

  // update the first frame of players, also make active if not already
  update(model, _, ctx)

  // send play event
  ctx.trigger(PLAY)
}
