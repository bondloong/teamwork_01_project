export const getIsProfileLoading = (state: IStateSchema): boolean =>
  Boolean(state.user.isProfileLoading);
