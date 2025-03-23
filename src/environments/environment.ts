const urlBase = 'https://bookingweb.shop';
export const environment = {
  production: false,
  // ===================== ENV LOCAL ===================
  // bookingHubUrl: `https://localhost:44368/hubs/booking`,
  // apiUrl: `https://localhost:44368/api/v1/`,
  // chatHubUrl: `https://localhost:44368/hubs/chat`,
  // registerHubUrl: `https://localhost:44368/hubs/register`,
  // ===================== ENV DOCKER ===================
  // bookingHubUrl: `https://localhost:5000/hubs/booking`,
  // apiUrl: `https://localhost:5000/api/v1/`,
  // chatHubUrl: `https://localhost:5000/hubs/chat`,
  // registerHubUrl: `https://localhost:5000/hubs/register`,
  // ===================== ENV SERVER ===================
  bookingHubUrl: `${urlBase}:5000/hubs/booking`,
  chatHubUrl: `${urlBase}:5000/hubs/chat`,
  paymentHubUrl: `${urlBase}:5000/hubs/payment`,
  apiUrl: `${urlBase}/api/v1/`,
  registerHubUrl: `${urlBase}:5000/hubs/register`,
  storeKey:
    'sp=racwdl&st=2024-12-03T02:58:43Z&se=2025-12-01T10:58:43Z&sv=2022-11-02&sr=c&sig=%2FcMd2m56FCaW7rAeE9HHqbH52LXnIVTIsNhBb2a3HWs%3D',
  storeAccount: 'vietle',
  storeContainer: 'badminton',
};