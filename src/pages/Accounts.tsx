
// import { useState } from "react";
// import { dummyAccountsData, PLATFORMS } from "../assets/assets";
// import { PlusIcon } from "lucide-react";
// import {AccountsList} from "../components/Home/AccountList";
// function Accounts() {
//   const [accounts, setAccounts] = useState<any[]>([]);
//   const [connecting, setConnecting] = useState<string | null>(null);
//   const [showPlatformPicker, setShowPlatformPicker] = useState(false);

//   const fetchAccounts = async (isSync = false , platform?: string | null, successMsg?: string)=>{
//     setAccounts(dummyAccountsData);
//     console.log(isSync, platform, successMsg);
//   }

//   const handleDisconnect = async (accountId: string) => {
//     setAccounts(accounts.filter((a)=> a.id !== accountId));
//   }
//   const connectedIds = accounts.map((a)=> a.platform);
//   return (
//     <div  className="space-y-8 max-w-4xl">
//      {/* Header */}
//      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
//       <div>
//         <h2 className="text-xl text-slate-900">Connected Accounts</h2>
//       <p className="text-slate-500 text-sm mt-0.5">{accounts.length} of {PLATFORMS.length} platforms connected</p>
//       </div>
//       <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-medium transition-all w-full sm:w-auto justify-center" onClick={() => setShowPlatformPicker(true)}>
//         <PlusIcon className="size-4" />Connect Account
//       </button>  
//      </div>
//      {/* connected accounts list */}
//      <AccountsList accounts={accounts} onDisconnect={handleDisconnect} />

//     </div>
//   )
// }

// export default Accounts


import { useState, useEffect } from "react";
import { dummyAccountsData, PLATFORMS } from "../assets/assets";
import { PlusIcon } from "lucide-react";
import AccountList from "../components/Home/AccountList";
import PlatformPickerModal from "../components/PlatformPicker";

function Accounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async () => {
    setAccounts(dummyAccountsData);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleConnect = async (platformValue: string) => {
    // Simulate connecting an account
    setConnecting(platformValue);
    setTimeout(() => {
      const meta = PLATFORMS.find((p) => p.value === platformValue);
      setAccounts((prev) => [
        ...prev,
        {
          ...dummyAccountsData[0],
          id: `${platformValue}-${Date.now()}`,
          platform: platformValue,
          handle: `@your_${meta?.name?.toLowerCase() ?? platformValue}`,
          status: "connected",
        },
      ]);
      setConnecting(null);
      setShowPlatformPicker(false);
    }, 1000);
  };

  const handleDisconnect = async (accountId: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== accountId));
  };

  const connectedIds = accounts.map((a) => a.platform);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
        <div>
          <h2 className="text-xl text-slate-900">Connected Accounts</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-medium transition-all w-full sm:w-auto justify-center"
          onClick={() => setShowPlatformPicker(true)}
        >
          <PlusIcon className="size-4" />
          Connect Account
        </button>
      </div>

      {/* Platform picker modal */}
      {showPlatformPicker && (
        <PlatformPickerModal
          connectedIds={connectedIds}
          connecting={connecting}
          onClose={() => setShowPlatformPicker(false)}
          onConnect={handleConnect}
        />
      )}

      {/* Connected accounts list */}
      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />
    </div>
  );
}

export default Accounts;