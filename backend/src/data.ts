export var userRecords = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$aJwvuDxKnlKCQDBwQwgUy.Rf3Txz87ytwG2pJNwiIvaRTNjVjRVye',
    points: 1000,
  },
  {
    id: 2,
    username: 'user2',
    password: '$2b$10$aJwvuDxKnlKCQDBwQwgUy.Rf3Txz87ytwG2pJNwiIvaRTNjVjRVye',
    points: 1000,
  },
  {
    id: 3,
    username: 'user3',
    password: '$2b$10$aJwvuDxKnlKCQDBwQwgUy.Rf3Txz87ytwG2pJNwiIvaRTNjVjRVye',
    points: 1000,
  },
];

export const productRecords = [
  {
    id: 1,
    name: 'Facemask Mockup',
    description: 'Description 1',
    pointsRequired: 100,
    expirationDate: '2024-12-31T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.23.37-pm.png',
    redeemedBy: [],
  },
  {
    id: 2,
    name: 'Coffee Mug Mockup',
    description: 'Description 2',
    pointsRequired: 200,
    expirationDate: '2024-09-30T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.31.59-pm.png',
    redeemedBy: [],
  },
  {
    id: 3,
    name: 'Hoodie Mockup',
    description: 'Description 3',
    pointsRequired: 300,
    expirationDate: '2024-10-31T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.34.20-pm.png',
    redeemedBy: [],
  },
  {
    id: 4,
    name: 'Facemask Mockup Clone',
    description: 'Description 1',
    pointsRequired: 100,
    expirationDate: '2024-12-31T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.23.37-pm.png',
    redeemedBy: [],
  },
  {
    id: 5,
    name: 'Coffee Mug Mockup Clone',
    description: 'Description 2',
    pointsRequired: 200,
    expirationDate: '2024-09-30T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.31.59-pm.png',
    redeemedBy: [],
  },
  {
    id: 6,
    name: 'Hoodie Mockup Clone',
    description: 'Description 3',
    pointsRequired: 300,
    expirationDate: '2024-10-31T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.34.20-pm.png',
    redeemedBy: [],
  },
];

export const getUserPoints = (userId: number): number => {
  const user = userRecords.find((user) => user.id === userId);
  return user ? user.points : 0;
};
