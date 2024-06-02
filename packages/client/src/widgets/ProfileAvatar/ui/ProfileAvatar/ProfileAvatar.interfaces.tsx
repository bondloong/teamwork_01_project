export interface IProfileAvatarProps {
  avatarSrc: string;
  handleBeforeUpload: (file: File) => boolean;
  isLoading: boolean;
}
