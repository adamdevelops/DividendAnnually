export interface Stock {
  id: string, 
  ticker: string, 
  shares_owned: number, 
  div_yield: number, 
  previously_owned: boolean,
  details: any
}