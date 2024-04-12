export const rollDice = (max, times = 1) => {
  const min = 1;
  const rand = () => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  let result = 0;

  if (times > 1) {
    for (let i = 0; i < times; i++) {
      result += rand();
    }
  } else {
    result = rand();
  }

  return result;
}