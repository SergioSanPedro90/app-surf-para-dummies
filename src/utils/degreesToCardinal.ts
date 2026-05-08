export const degreesToCardinal = (degrees: number) => {
  const cardinals = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(degrees / 45) % 8;
  return cardinals[index];
}