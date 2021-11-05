import './Scoreboard.css'

interface Props {
points: number,
player: string
}

export function Scoreboard(props: Props){
  return(
<div>
  <h1 className="Score">{props.player}</h1>
  <h2 className="Score">{props.points}</h2>
</div>
  )
}