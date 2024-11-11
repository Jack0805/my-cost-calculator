export interface GroupMemberInitialState {
  names: string[];
}

type ShareBy = {
  name: string;
  isShared: boolean;
};

export type CostItem = {
  itemName: string;
  amount?: number;
  shareBy: ShareBy[];
  paidBy: string;
  accordionExpended?: boolean;
};

export interface CostItemsInitialState {
  items: CostItem[];
}

export type EditItemTypePayload = {
  itemIndex: number;
  shareByIndex: number;
  isShared: boolean;
};

export type EditItemExpendedTypePayload = {
  itemIndex: number;
  expanded: boolean;
};
