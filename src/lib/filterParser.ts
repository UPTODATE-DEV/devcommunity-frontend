interface Parser {
  field: string;
  data: any[];
}

export const filterParser = ({ field, data }: Parser): unknown[] => {
  return data?.map((item) => ({ ...item, value: item[field] }));
};
