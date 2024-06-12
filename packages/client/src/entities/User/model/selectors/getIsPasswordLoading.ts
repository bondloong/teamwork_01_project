export const getIsPasswordLoading = (state: IStateSchema): boolean =>
  Boolean(state.user.isPasswordLoading);
