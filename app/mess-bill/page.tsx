"use client";
import { useSearchParams } from "next/navigation";

const MessBillPage = () => {
  // const { bd } = searchParams;

  let params = useSearchParams();
  return (
    <div>
      <h1>Mess Bill Page</h1>
      <h2>{params.get("bd")}</h2>
    </div>
  );
};

export default MessBillPage;
