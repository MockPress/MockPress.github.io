export const copyToClipboard = async (
  text: string,
  successAction?: () => void,
  failAction?: () => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    successAction && successAction();
  } catch (error) {
    failAction && failAction();
  }
};
