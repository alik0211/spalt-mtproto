const typesList = [
  {
    name: "email",
    validate: (value) => {
      // https://emailregex.com/
      // eslint-disable-next-line no-useless-escape
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return regex.test(value);
    },
  },
  {
    name: "phone",
    validate: (value) => {
      // https://stackoverflow.com/a/29767609/10789936
      // eslint-disable-next-line no-useless-escape
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

      return regex.test(value);
    },
  },
  {
    name: "ip",
    validate: (value) => {
      const list = value.split(".");

      if (list.length !== 4) {
        return false;
      }

      const isValid = list.every((rawBlock) => {
        const block = Number(rawBlock);

        if (!Number.isInteger(block)) {
          return false;
        }

        return block >= 0 && block <= 255;
      });

      return isValid;
    },
  },
  {
    name: "fullName",
    validate: (value) => {
      const regex = /^([A-Za-z'`~.-]+(\s|$)){2}$/;

      return regex.test(value);
    },
  },
  {
    name: "nickname",
    validate: (value) => {
      const regex = /^@?[A-Za-z'`~._-]+$/;

      return regex.test(value);
    },
  },
];

export const getSearchType = (searchString) => {
  const result = typesList.find(({ validate }) => validate(searchString));

  if (!result) {
    return null;
  }

  return result.name;
};
