import { create, type StateCreator } from 'zustand';

interface LoaderState {
  loaderVisible: boolean;
  loaderFadeOut: boolean;
}

interface LoaderActions {
  showLoader: () => void;
  hideLoader: () => void;
}

const initialState: LoaderState = {
  loaderVisible: true,
  loaderFadeOut: false,
};

const loaderSlice: StateCreator<
  LoaderState & LoaderActions,
  [],
  [],
  LoaderState & LoaderActions
> = set => ({
  ...initialState,
  showLoader: () => set({ loaderVisible: true, loaderFadeOut: false }),

  hideLoader: () => {
    set({ loaderFadeOut: true });
    setTimeout(() => set({ loaderVisible: false }), 250);
  },
});

export const useLoaderStore = create<LoaderState & LoaderActions>()(loaderSlice);
