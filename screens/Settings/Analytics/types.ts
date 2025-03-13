export type SelectedDateType = 'last_Seven_days' | 'last_two_weeks' | 'last_month' | 'last_six_month' | 'last_year';

export type DropdownDataType = {
  label: string;
  value: SelectedDateType;
};
