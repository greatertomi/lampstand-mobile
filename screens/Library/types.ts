export type TabComponentProps = {
  onPress: () => void;
};

export type ReadingLogLocation = {
  cfi: string;
  pages: {
    totalPages: number;
    currentPage: number;
  };
  href: string;
  percentage: number;
};
