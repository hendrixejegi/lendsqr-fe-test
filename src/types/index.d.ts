type Status = 'active' | 'inactive' | 'pending';

type AccountDetails = {
  number: string;
  bank: string;
  balance: number;
};

type EmploymentDetails = {
  type: string;
  sector: string;
  duration: number;
  income: {
    min: number;
    max: number;
  };
};

interface Guarantor {
  id: string;
  f_name: string;
  l_name: string;
  phone: string;
  email: string;
  relationship: string;
}

interface User {
  id: string;
  f_name: string;
  l_name: string;
  organization: string;
  tier: number;
  status: Status;
  gender: string;
  phone: string;
  email: string;
  bvn: string;
  account: AccountDetails;
  relationship: string;
  children: number;
  residence: string;
  education: string;
  employment: EmploymentDetails;
  repayment: number;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  guarantor: Guarantor[];
  joined: string;
}
