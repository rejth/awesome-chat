export default function getValidationSchema(channels) {
  return {
    required: 'Channel name is required',
    minLength: {
      value: 2,
      message: 'Must be at least 2 characters',
    },
    maxLength: {
      value: 20,
      message: 'Must be 20 characters or less',
    },
    validate: (value) => {
      const isExist = !!channels.find((item) => item?.name === value);
      return !isExist || 'The channel with the same name already exists';
    },
  };
}
