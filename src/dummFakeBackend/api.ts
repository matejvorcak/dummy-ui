const ONLY_ONE_REGISTERED_USER = {
  name: 'john.doe',
  id: 7864
};

// eslint-disable-next-line max-len
const ONLY_ONE_REGISTERED_USER_TOKEN = `thisbackendissoodummytousejwttokensothisstringmustbefine.youruseridis.${ONLY_ONE_REGISTERED_USER.id}`;

interface ILogin {
  token?: string;
  errors?: {
    [key: string]: string;
  };
}

interface IMe {
  user?: {
    name: string;
    id: number;
  };
  errors?: {
    [key: string]: string;
  };
}

/** Fake dummy backend login function. Only allows to logged in as a john.doe */
export const login = (username: string, password: string): Promise<ILogin> => {
  return new Promise<ILogin>((resolve, reject) => {
    setTimeout(() => {
      if (username === ONLY_ONE_REGISTERED_USER.name && !!password) {
        resolve({
          token: ONLY_ONE_REGISTERED_USER_TOKEN
        });
      } else {
        reject({
          errors: {
            // eslint-disable-next-line max-len
            credentials: `Wrong password. This password is taken by user ${ONLY_ONE_REGISTERED_USER.name}. Are you ${ONLY_ONE_REGISTERED_USER.name}?`
          }
        });
      }
    }, Math.random() * 1000);
  });
};

export const me = (token: string): Promise<IMe> => {
  return new Promise<IMe>((resolve, reject) => {
    setTimeout(() => {
      if (token === ONLY_ONE_REGISTERED_USER_TOKEN) {
        resolve({
          user: ONLY_ONE_REGISTERED_USER
        });
      } else {
        reject({
          errors: {
            auth: 'Not authorized'
          }
        });
      }
    }, Math.random() * 1000);
  });
};
