import { postCategoryMap } from '../../constants/post';

const DEFAULT_CATEGORY = '';

const categoryKeys = Object.keys(postCategoryMap) as string[];

const isValidCategory = (value: string): boolean => {
  return value === '' || categoryKeys.includes(value);
};

const createSelectChangeHandler =
  (validator: (value: string) => boolean) => (value: string, onChange: (value: string) => void) => {
    if (validator(value)) {
      onChange(value);
    }
  };

export function usePostForm() {
  const onChangeHandlers = {
    category: createSelectChangeHandler(isValidCategory),
  };

  return {
    onChangeHandlers,
    defaults: {
      category: DEFAULT_CATEGORY,
    },
  };
}

