export interface Restaurant {
    name: string;
    latitude: number;
    longitude: number;
    image: string;
  }
  
  export const restaurants: Restaurant[] = [
    { name: 'Restaurante A', latitude: 38.7167, longitude: -9.1399, image: 'https://via.placeholder.com/40' },
    { name: 'Restaurante B', latitude: 38.7177, longitude: -9.1389, image: 'https://via.placeholder.com/40' },
    { name: 'Restaurante C', latitude: 38.7187, longitude: -9.1379, image: 'https://via.placeholder.com/40' },
    { name: 'Restaurante D', latitude: 38.7197, longitude: -9.1369, image: 'https://via.placeholder.com/40' },
    { name: 'Restaurante E', latitude: 38.7207, longitude: -9.1359, image: 'https://via.placeholder.com/40' },
  ];