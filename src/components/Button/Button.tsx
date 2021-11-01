import { ButtonHTMLAttributes } from "react";


//Define interface props and extended properties from button html element
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  symbol: 'X' | 'O' | null
}

export function Button(props: Props){
  return(
    //if there's a symbol, disabled = true, else disabled = false
    <button disabled={!!props.symbol}{...props}>{props.symbol}</button>
  )
}