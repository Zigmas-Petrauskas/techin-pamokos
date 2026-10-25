export const hexalColor = () => {
  const str = '0123456789abcdef';
  let color = '';

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * str.length);
    color += str[index];
  }

  return '#' + color;
};
