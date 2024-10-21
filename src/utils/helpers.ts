function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const size = Math.min(40 + firstName.length * 10, 200);

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      // height: size,
      // fontSize: size / 2.5,
      padding: 1,
    },
    children: firstName, // Display the full first name
  };
}

function capitalizeFirstChar(str: string) {
  if (!str) return str; // Check for empty or null strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const convertArray = (arr: string[]): { name: string; isShared: boolean }[] => {
  return arr.map((name) => ({ name, isShared: true }));
};

export { stringToColor, stringAvatar, capitalizeFirstChar, convertArray };
