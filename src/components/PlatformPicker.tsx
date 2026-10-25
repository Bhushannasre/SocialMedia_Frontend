// import { CheckCircleIcon, ExternalLinkIcon } from "lucide-react";
// import { PLATFORMS } from "../assets/assets";
// import { XIcon } from "lucide-react";


// interface PlatformPickerModelProps{
//     connectedIds: string[];
//     connecting: string | null;
//     onClose: ()=> void;
//     onConnect: (platformId: string)=> void;
// }
// const PlatformPickerModal = ({ connectedIds, connecting, onClose, onConnect }: PlatformPickerModelProps) => {
//     return (
//         <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center blackdrop-blur">
//          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 p-6">
//             {/* header */}
//             <div  className="flex items-center justify-between px-6 py-4 shadow">
//                 <h3 className="text-slate-700">Choose a Platform</h3>
//                 <button className="text-slate-400 hover:text-slate-600 transition-all" onClick={onClose}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                         {/* <XIcon className="size-4" /> */}
//                 </button>

//             </div>
//             {/* Platform list */}
//             <div className="p-6 flex flex-col gap-2">
//                 {PLATFORMS.map((platform) => {
//                     const isConnected = connectedIds.includes(platform.id);
//                     const isConnecting = connecting === platform.id;
//                     return (
//                         <button key={platform.id} className={`flex items-center gap-4 p-3 rounded-lg border ${isConnected ? 'bg-slate-100 border-slate-200' : 'bg-white border-slate-200 hover:bg-slate-50'} transition-all`} disabled={isConnected || isConnecting} onClick={() => onConnect(platform.id)}>
//                             {/* Icon */}

//                             <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
//                                 <platform.icon className={`size-5 ${isConnected ? "text-red-600" : "text-slate-500"}`} />
//                             </div>
//                             <span className="text-slate-700">{platform.name}</span>
//                             {/* Label */}
//                             <div className="flex-1 min-w-0">
//                                 <div className={`text-sm ${isConnected ? "text-red-700" : "text-slate-800"}`}>
//                                     {platform.name}
//                                 </div>
//                                 <div className="text-xs text-slate-500 truncate">
//                                     {isConnected ? "Already connected" : platform.description}
//                                 </div>
//                             </div>

//                             {/* Status */}
//                             {isConnected && <CheckCircleIcon className="size-4 text-red-500 shrink-0" />}
//                             {isConnecting && <div className="size-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin shrink-0" />}
//                             {!isConnected && !isConnecting && <ExternalLinkIcon className="size-4 text-slate-400 shrink-0" />}
//                         </button>
//                     )
//                 })}

//             </div>

//          </div>
//         </div>
//     )
// }
// export default PlatformPickerModal;


import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface PlatformPickerModalProps {
  connectedIds: string[];
  connecting: string | null;
  onClose: () => void;
  onConnect: (platformId: string) => void;
}

const PlatformPickerModal = ({
  connectedIds,
  connecting,
  onClose,
  onConnect,
}: PlatformPickerModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-slate-700">Choose a Platform</h3>
          <button
            className="text-slate-400 hover:text-slate-600 transition-all"
            onClick={onClose}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Platform list */}
        <div className="p-6 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
          {PLATFORMS.map((platform) => {
            const isConnected = connectedIds.includes(platform.value);
            const isConnecting = connecting === platform.value;

            return (
              <button
                key={platform.value}
                className={`flex items-center gap-4 p-3 rounded-lg border text-left transition-all ${
                  isConnected
                    ? "bg-slate-100 border-slate-200"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
                disabled={isConnected || isConnecting}
                onClick={() => onConnect(platform.value)}
              >
                {/* Icon */}
                <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  <platform.icon
                    className={`size-5 ${isConnected ? "text-red-600" : "text-slate-500"}`}
                  />
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${isConnected ? "text-red-700" : "text-slate-800"}`}>
                    {platform.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {isConnected ? "Already connected" : platform.description}
                  </div>
                </div>

                {/* Status */}
                {isConnected && <CheckCircleIcon className="size-4 text-red-500 shrink-0" />}
                {isConnecting && (
                  <div className="size-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                {!isConnected && !isConnecting && (
                  <ExternalLinkIcon className="size-4 text-slate-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformPickerModal;