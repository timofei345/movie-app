export const formatNumberAbbreviation = (number) => {
    const abbreviations = ["", "k", "mio", "bio", "t"];
    let index = 0;
  
    while (number >= 1000 && index < abbreviations.length - 1) {
      number /= 1000;
      index++;
    }
  
    return `${number.toFixed(2)} ${abbreviations[index]}`;
  }