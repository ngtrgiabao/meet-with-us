interface Props {
  url: string;
  onIsCopy: (value: boolean) => void; // Define onIsCopy as a function
}

const useCopy = ({ url, onIsCopy }: Props) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      onIsCopy(true);
    })
    .catch((error) => {
      console.error("[COPY_POST_URL]", error);
    });
};

export default useCopy;
