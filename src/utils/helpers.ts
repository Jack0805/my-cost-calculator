import { CostItem } from "../store/types";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const size = Math.min(40 + firstName.length * 10, 200);

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "12px !important",
      height: "12px !important",
      color: "white !important",
      // height: size,
      // fontSize: size / 2.5,

      padding: 1,
    },
    children: firstName, // Display the full first name
  };
}

function capitalizeFirstChar(str: string) {
  if (!str) return str; // Check for empty or null strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const convertArray = (
  arr: string[],
  totalAmount: number
): { name: string; isShared: boolean; portion: number }[] => {
  return arr.map((name) => ({
    name,
    isShared: true,
    portion: Number((totalAmount / arr.length).toFixed(2)),
  }));
};

interface Debt {
  from: string;
  to: string;
  amount: number;
}

interface Owes {
  name: string;
  owes: number[];
}

interface BillsSummary {
  [key: string]: { itemName: string; amount: number }[];
}

function calculateDetailedDebts(participants: CostItem[]): Debt[] {
  const debts: Debt[] = [];

  // Step 1: Collect all individual debts
  participants.forEach((payer) => {
    const totalAmount = payer.amount || 0;
    const sharePerPerson = totalAmount / payer.shareBy.length;

    payer.shareBy.forEach((participant) => {
      debts.push({
        from: participant.name,
        to: payer.paidBy,
        amount: parseFloat(
          payer.equalSplit === "equal"
            ? sharePerPerson.toFixed(2)
            : participant.portion.toFixed(2)
        ), // Round to 2 decimals
      });
    });
  });

  // Step 2: Generate all possible "from-to" pairs (including self-to-self)
  const allPairs: Debt[] = [];
  participants.forEach((from) => {
    participants.forEach((to) => {
      allPairs.push({ from: from.paidBy, to: to.paidBy, amount: 0.0 }); // Initialize with zero
    });
  });

  // Step 3: Merge actual debts into the complete set of pairs
  const mergedDebts: { [key: string]: Debt } = {};

  debts.forEach((debt) => {
    const key = `${debt.from}-${debt.to}`; // Unique key based on from-to pair
    if (mergedDebts[key]) {
      mergedDebts[key].amount += debt.amount;
    } else {
      mergedDebts[key] = { ...debt };
    }
  });

  // Add any missing zero-value debts
  allPairs.forEach((pair) => {
    const key = `${pair.from}-${pair.to}`;
    if (!mergedDebts[key]) {
      mergedDebts[key] = pair; // Add zero-value debt if missing
    }
  });

  // Step 4: Convert merged debts back into an array
  return Object.values(mergedDebts).map((debt) => ({
    ...debt,
    amount: parseFloat(debt.amount.toFixed(2)), // Ensure rounding to 2 decimals
  }));
}

function mergeDebts(debts: Debt[]): Debt[] {
  const mergedDebts: { [key: string]: Debt } = {};

  // Iterate over the debts and merge identical from-to pairs
  debts.forEach((debt) => {
    const key = `${debt.from}-${debt.to}`; // Unique key based on from-to pair

    if (mergedDebts[key]) {
      // If the key exists, sum the amounts
      mergedDebts[key].amount += debt.amount;
    } else {
      // If the key doesn't exist, create a new entry
      mergedDebts[key] = { ...debt };
    }
  });

  // Convert the merged debts object back to an array
  return Object.values(mergedDebts).map((debt) => ({
    ...debt,
    amount: parseFloat(debt.amount.toFixed(2)), // Ensure rounding to 2 decimals
  }));
}

function filterSharedItems(items: CostItem[]): CostItem[] {
  return items.map((item) => ({
    ...item,
    shareBy: item.shareBy.filter((share) => share.isShared), // Keep only shared items
  }));
}

function convertDebts(debts: Debt[], namesOrder: string[]): Owes[] {
  // Initialize the result with each person and an empty 'owes' array
  const result: Owes[] = namesOrder.map((name) => ({
    name,
    owes: Array(namesOrder.length).fill(0), // Initialize with 0s
  }));

  // Populate the 'owes' arrays with the correct amounts
  debts.forEach((debt) => {
    const fromIndex = namesOrder.indexOf(debt.from); // Find index of debtor
    const toIndex = namesOrder.indexOf(debt.to); // Find index of creditor
    if (fromIndex !== -1 && toIndex !== -1) {
      result[fromIndex].owes[toIndex] = debt.amount; // Assign amount in correct position
    }
  });

  return result;
}

function groupItemsByPaidBy(items: CostItem[], people: string[]): BillsSummary {
  const result: BillsSummary = {};

  // Initialize the result object with empty arrays for each person
  people.forEach((person) => {
    result[person] = [];
  });

  // Group items by the 'paidBy' field
  items.forEach((item) => {
    if (result[item.paidBy]) {
      result[item.paidBy].push({
        itemName: item.itemName,
        amount: item.amount || 0,
      });
    }
  });

  return result;
}

const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100;

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

const simplifySettlement = (
  results: Record<string, Record<string, number>>
): Settlement[] => {
  const balances: Record<string, number> = {};

  // Calculate net balance for each participant
  Object.entries(results).forEach(([from, owes]) => {
    Object.entries(owes).forEach(([to, amount]) => {
      const roundedAmount = roundToTwoDecimals(amount);

      // Subtract from the payer's balance
      balances[from] = (balances[from] || 0) - roundedAmount;

      // Add to the recipient's balance
      balances[to] = (balances[to] || 0) + roundedAmount;
    });
  });

  const creditors: { name: string; amount: number }[] = [];
  const debtors: { name: string; amount: number }[] = [];

  // Separate participants into creditors and debtors
  Object.entries(balances).forEach(([name, balance]) => {
    const roundedBalance = roundToTwoDecimals(balance);

    if (roundedBalance > 0) {
      creditors.push({ name, amount: roundedBalance });
    } else if (roundedBalance < 0) {
      debtors.push({ name, amount: -roundedBalance });
    }
  });

  const settlements: Settlement[] = [];

  // Match debtors to creditors
  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0];
    const creditor = creditors[0];

    const payment = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.name,
      to: creditor.name,
      amount: roundToTwoDecimals(payment),
    });

    debtor.amount -= payment;
    creditor.amount -= payment;

    if (debtor.amount === 0) debtors.shift();
    if (creditor.amount === 0) creditors.shift();
  }

  return settlements;
};

// Define types for participants and results
type Participant = {
  name: string;
  owes: number[];
};

type Results = {
  [key: string]: { [key: string]: number };
};

// Function to transform data into the desired format
const transformToResults = (participants: Participant[]): Results => {
  const names = participants.map((participant) => participant.name);

  const results: Results = {};

  participants.forEach((participant) => {
    const owedTo: { [key: string]: number } = {};
    participant.owes.forEach((amount, index) => {
      if (names[index] !== participant.name) {
        owedTo[names[index]] = amount;
      }
    });
    results[participant.name] = owedTo;
  });

  return results;
};

export {
  stringToColor,
  stringAvatar,
  capitalizeFirstChar,
  convertArray,
  calculateDetailedDebts,
  mergeDebts,
  filterSharedItems,
  convertDebts,
  groupItemsByPaidBy,
  simplifySettlement,
  transformToResults,
};

export type { BillsSummary };
