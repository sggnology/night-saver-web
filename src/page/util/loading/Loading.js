import loading from "../../../assets/loading.gif";

export default function Loading({isLoading}) {
  console.log("HIHI")
  return (
    <>
      {isLoading ? <img src={loading} alt="loading" width="40px"/> : null}
    </>
  );
}