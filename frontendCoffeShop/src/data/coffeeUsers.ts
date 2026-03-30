export type CoffeeUser = {
  id: number;
  fullName: string;
  email: string;
  coffeeType: string;
  cupsToday: number;
  lastCoffeeAt: string;
  status: 'Servi' | 'En attente';
};

export const coffeeUsers: CoffeeUser[] = [
  {
    id: 1,
    fullName: 'Amina Benali',
    email: 'amina@coffee.local',
    coffeeType: 'Espresso',
    cupsToday: 2,
    lastCoffeeAt: '08:25',
    status: 'Servi',
  },
  {
    id: 2,
    fullName: 'Yassine El Idrissi',
    email: 'yassine@coffee.local',
    coffeeType: 'Cappuccino',
    cupsToday: 1,
    lastCoffeeAt: '09:40',
    status: 'Servi',
  },
  {
    id: 3,
    fullName: 'Sara Mechri',
    email: 'sara@coffee.local',
    coffeeType: 'Latte',
    cupsToday: 3,
    lastCoffeeAt: '10:10',
    status: 'Servi',
  },
  {
    id: 4,
    fullName: 'Nabil Rahmani',
    email: 'nabil@coffee.local',
    coffeeType: 'Americano',
    cupsToday: 0,
    lastCoffeeAt: '-',
    status: 'En attente',
  },
  {
    id: 5,
    fullName: 'Lina Kacem',
    email: 'lina@coffee.local',
    coffeeType: 'Mocha',
    cupsToday: 1,
    lastCoffeeAt: '11:05',
    status: 'Servi',
  },
];
