const selectors = {
  getChatData(state) {
    return (state?.chatReducer ? state.chatReducer?.data : {});
  },
  getAllChannels(state) {
    return (state?.chatReducer ? state.chatReducer?.data?.channels : []);
  },
};

export const {
  getChatData,
  getAllChannels,
} = selectors;
