export interface GroupMemberInitialState {
  names: string[];
}

export type ShareBy = {
  name: string;
  isShared: boolean;
  portion: number;
};

export type CostItem = {
  itemName: string;
  amount?: number;
  shareBy: ShareBy[];
  paidBy: string;
  accordionExpended?: boolean;
  equalSplit: string;
};

export interface CostItemsInitialState {
  items: CostItem[];
}

export type EditItemTypePayload = {
  itemIndex: number;
  shareByIndex: number;
  isShared: boolean;
};

export type EditPortionPayload = {
  itemIndex: number;
  shareByIndex: number;
  portion: number;
};

export type EditItemExpendedTypePayload = {
  itemIndex: number;
  expanded: boolean;
};

export type EditItemEqualSplitPayload = {
  itemIndex: number;
  equalSplit: string;
};
