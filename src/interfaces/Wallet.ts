// Wallet interface based on API response
export interface IWallet {
  id: number;
  user: {
    id: number;
    avatar: string;
    full_name: string;
    email: string;
    country: string;
    current_location: [number, number];
    phone_number: string;
  };
  address: string;
  created_at: string;
  updated_at: string;
  balance: {
    lovelace: number;
    ada: number;
  };
}
