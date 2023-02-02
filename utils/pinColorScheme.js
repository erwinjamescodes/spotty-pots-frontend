export const pinColorScheme = (intensity) => {
  switch (intensity) {
    case 5:
      return "#5d1847";
    case 4:
      return "#930c41";
    case 3:
      return "#ca043b";
    case 2:
      return "#ff5c36";
    case 1:
      return "#ffc917";
    default:
      return "red";
  }
};
