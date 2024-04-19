export type LinkResultSuccess = {
  type: 'LinkResultSuccess';
  linkToken: string;
  accountId: string;
  accountHolder: {
    name: string | null;
    address: string | null;
    balances: {
      snap: number | null;
      cash: number | null;
    };
    lastTransactionDate: string | null;
  };
};

export type LinkResult = LinkResultSuccess;
