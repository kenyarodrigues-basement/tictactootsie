import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{}

export function RestartButton(props: Props){
return(
  <button {...props}>Play again?</button>
)
}