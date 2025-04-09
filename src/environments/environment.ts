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
    'sp=racwdl&st=2025-03-23T14:40:24Z&se=2025-04-30T22:40:24Z&spr=https&sv=2024-11-04&sr=c&sig=tB2g0aJAH16rfuI82ZNwfVofNiBR0E7kA%2Frcs3ZIVbM%3D',
  storeAccount: 'vietle',
  storeContainer: 'badminton',
  chatBotUrl: "https://bookingweb.shop/webhooks/rest/webhook",
};