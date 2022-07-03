import React, { useMemo, useState } from "react";

const columnData = [
  {
    accessor: "email",
    Header: "Email",
  },
  {
    accessor: "walletID",
    Header: "Wallet ID",
  },
  {
    accessor: "coin_list",
    Header: "Wallet Balance",
  },
  {
    accessor: "created_at",
    Header: "Created At",
  },
  {
    accessor: "edited_at",
    Header: "Edited At",
  },
];

function Members() {
  const [info, setInfo] = useState();

  //   const getTamWallet = () => {
  //     data.getTamWallet().then((item) => setInfo(item));
  //   };

  //   const data = useMemo(() => info, [info]);
  const columns = useMemo(() => columnData, []);
  const data = useMemo(
    () => [
      {
        email: "이메일이에용",
        walletID: "아이디에용",
        created_at: "2021-08-03 01:14:47",
        edited_at: "2021-08-03 01:15:49",
        coin_list: ["TRV", "BTC", "BCH", "ETH"],
      },
    ],
    []
  );
  return <div>Members</div>;
}

export default Members;
