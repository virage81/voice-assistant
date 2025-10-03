// Types for Vapi.ai integration

export interface UserInfo {
  name: string | null;
  preferredDateTime: string | null;
  selectedSlot: string | null;
}

export interface AvailableSlot {
  day: string;
  time: string;
  formattedString: string;
}

export interface VapiAssistantState {
  currentStep: 'greeting' | 'name' | 'dateTime' | 'slotSuggestion' | 'slotSelection' | 'confirmation' | 'completed';
  userInfo: UserInfo;
  availableSlots: AvailableSlot[];
}