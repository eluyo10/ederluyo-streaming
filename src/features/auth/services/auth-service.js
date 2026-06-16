const SESSION_KEY = 'thiago-streaming-session';
const PROFILE_KEY = 'thiago-streaming-profile';
const USERS_KEY = 'thiago-streaming-users';

const defaultAvatar = 'https://api.dicebear.com/8.x/adventurer/svg?seed=Thiago';

const adminUser = {
  dni: '00000000',
  fullName: 'Administrador Thiago',
  email: 'admin@thiagostreaming.pe',
  username: 'admin',
  password: 'Thiago123',
  avatar: defaultAvatar,
  role: 'ADM',
};

function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function publicUser(user) {
  return {
    dni: user.dni,
    fullName: user.fullName,
    email: user.email,
    username: user.username,
    avatar: user.avatar || defaultAvatar,
    role: user.role || 'USER',
  };
}

function getStoredUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const authService = {
  getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  getProfile() {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  getProfiles() {
    const users = getStoredUsers();

    return [
      {
        name: adminUser.fullName,
        avatar: adminUser.avatar,
        type: adminUser.role,
        email: adminUser.email,
      },
      ...users.map((user) => ({
        name: user.fullName,
        avatar: user.avatar || defaultAvatar,
        type: user.role || 'USER',
        email: user.email,
      })),
    ];
  },

  async login({ username, password }) {
    await delay();

    const cleanUsername = username.trim().toLowerCase();

    const isAdmin =
      cleanUsername === adminUser.username &&
      password === adminUser.password;

    if (isAdmin) {
      const session = publicUser(adminUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }

    const users = getStoredUsers();

    const foundUser = users.find(
      (user) =>
        (user.email.toLowerCase() === cleanUsername ||
          user.username.toLowerCase() === cleanUsername) &&
        user.password === password
    );

    if (!foundUser) {
      throw new Error('Credenciales incorrectas.');
    }

    const session = publicUser(foundUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async register(payload) {
    await delay();

    const users = getStoredUsers();

    const emailAlreadyExists = users.some(
      (user) => user.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (emailAlreadyExists) {
      throw new Error('Este correo ya está registrado.');
    }

    const newUser = {
      dni: payload.dni,
      fullName: payload.fullName,
      email: payload.email,
      username: payload.email,
      password: payload.password,
      avatar: payload.avatar || defaultAvatar,
      role: 'USER',
    };

    const updatedUsers = [...users, newUser];
    saveStoredUsers(updatedUsers);

    const session = publicUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return session;
  },

  saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  clearProfile() {
    localStorage.removeItem(PROFILE_KEY);
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
  },
};