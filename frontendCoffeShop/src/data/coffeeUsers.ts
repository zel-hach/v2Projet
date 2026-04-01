export type CoffeeUser = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  phone: string;
  city: string;
  status: string;
  coffeeType: string;
  cupsToday: string;
};


export const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error fetching');
  }

  return data;
};

export const fetchUsers = async (): Promise<CoffeeUser[]> => {
  const token = await localStorage.getItem("token");
  console.log("token: ",token);
  
  try {
    const response = await fetch('http://localhost:7000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch');
    }

    return data;
  } catch (error) {
    console.error('Error fetching users');
    return [];
  }
};

// export const coffeeUsers: CoffeeUser[] =  [
//   {
//     id: 1,
//     first_name: "Walid",
//     last_name: "Habibi",
//     age: 22,
//     email: "walid.habibi@gmail.com",
//     phone: "0612345678",
//     city: "Casablanca",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id:2,
//     first_name: "Yassine",
//     last_name: "El Amrani",
//     age: 25,
//     email: "yassine.amrani@gmail.com",
//     phone: "0623456789",
//     city: "Rabat",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 3,
//     first_name: "Sara",
//     last_name: "Bennani",
//     age: 21,
//     email: "sara.bennani@gmail.com",
//     phone: "0634567890",
//     city: "Marrakech",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 4,
//     first_name: "Hamza",
//     last_name: "Zerouali",
//     age: 28,
//     email: "hamza.zerouali@gmail.com",
//     phone: "0645678901",
//     city: "Fes",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 5,
//     first_name: "Imane",
//     last_name: "Tazi",
//     age: 24,
//     email: "imane.tazi@gmail.com",
//     phone: "0656789012",
//     city: "Tangier",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 6,
//     first_name: "Omar",
//     last_name: "Lahlou",
//     age: 30,
//     email: "omar.lahlou@gmail.com",
//     phone: "0667890123",
//     city: "Agadir",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 7,
//     first_name: "Nadia",
//     last_name: "Kabbaj",
//     age: 27,
//     email: "nadia.kabbaj@gmail.com",
//     phone: "0678901234",
//     city: "Kenitra",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 8,
//     first_name: "Mehdi",
//     last_name: "Boulahfa",
//     age: 23,
//     email: "mehdi.boulahfa@gmail.com",
//     phone: "0689012345",
//     city: "Oujda",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 9,
//     first_name: "Salma",
//     last_name: "El Idrissi",
//     age: 26,
//     email: "salma.idrissi@gmail.com",
//     phone: "0690123456",
//     city: "Tetouan",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 10,
//     first_name: "Ayoub",
//     last_name: "Chakir",
//     age: 29,
//     email: "ayoub.chakir@gmail.com",
//     phone: "0601234567",
//     city: "El Jadida",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 11,
//     first_name: "Hajar",
//     last_name: "Mansouri",
//     age: 22,
//     email: "hajar.mansouri@gmail.com",
//     phone: "0611111111",
//     city: "Beni Mellal",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 12,
//     first_name: "Rachid",
//     last_name: "Ouali",
//     age: 31,
//     email: "rachid.ouali@gmail.com",
//     phone: "0622222222",
//     city: "Safi",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 13,
//     first_name: "Khadija",
//     last_name: "Ait Ali",
//     age: 20,
//     email: "khadija.aitali@gmail.com",
//     phone: "0633333333",
//     city: "Nador",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 14,
//     first_name: "Soufiane",
//     last_name: "Berrada",
//     age: 27,
//     email: "soufiane.berrada@gmail.com",
//     phone: "0644444444",
//     city: "Taza",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 15,
//     first_name: "Laila",
//     last_name: "Fassi",
//     age: 24,
//     email: "laila.fassi@gmail.com",
//     phone: "0655555555",
//     city: "Meknes",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 16,
//     first_name: "Karim",
//     last_name: "Daoudi",
//     age: 33,
//     email: "karim.daoudi@gmail.com",
//     phone: "0666666666",
//     city: "Ouarzazate",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 17,
//     first_name: "Zineb",
//     last_name: "Benali",
//     age: 23,
//     email: "zineb.benali@gmail.com",
//     phone: "0677777777",
//     city: "Larache",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 18,
//     first_name: "Anas",
//     last_name: "Rami",
//     age: 26,
//     email: "anas.rami@gmail.com",
//     phone: "0688888888",
//     city: "Khouribga",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 19,
//     first_name: "Fatima",
//     last_name: "Zahraoui",
//     age: 28,
//     email: "fatima.zahraoui@gmail.com",
//     phone: "0699999999",
//     city: "Settat",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   },
//   {
//     id: 20,
//     first_name: "Younes",
//     last_name: "Alaoui",
//     age: 25,
//     email: "younes.alaoui@gmail.com",
//     phone: "0600000000",
//     city: "Essaouira",
//     status: "Servi",
//     coffeeType: "Espresso",
//     cupsToday: "1"
//   }
// ];