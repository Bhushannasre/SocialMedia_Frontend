import { HistoryIcon, Loader2Icon, Wand2  } from "lucide-react";
import { useEffect, useState } from "react";
import { PLATFORMS } from "../assets/assets";


function AIComposer() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([]);

  // Scheduling state
  const [activeSchedule, setActiveSchedule] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduleDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const fetchGeneration = async () => {
    setGenerations(DummyGenerationData);
  };
   useEffect(()=>{
    fetchGeneration();
   },[])

   const handleGenerate = async () => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    }, 2000);
   };
   const tones= ["Professional", "Casual", "Friendly", "Humorous", "Inspirational", "Persuasive", "Informative", "Empathetic", "Authoritative", "Optimistic"];
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-in fade-in duration-700">
      {/* Input Selection */}
      <div className="space-y-6 text-center mt-20 ">
        <h1 className="text-3xl text-slate-700 tracking-tight">What should we create today?</h1>
        <div className="relative group mt-12">
          <textarea 
          className="w-full px-6 py-4 bg-white border border-slate-300 rounded-xl text-slate-900
          placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-32"
          placeholder="Share your idea... (e.g. A post about the launch of new eco-friendly coffee beans)" value={prompt}
          onChange={(e) => setPrompt(e.target.value)} />
          <div className="absolute bottom-4 right-2.5 flex items-center gap-3 text-sm">
            <button className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-slate-700 hover:bg-red-200 focus:outline-none focus:ring-offset-2" onClick={() => setGenerateImage(!generateImage)}>
              <span>AI Image</span>
              <div className={`relative inline-flex h-6 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${generateImage ? 'bg-red-500' : 'bg-slate-200'}`} onClick={() => setGenerateImage(!generateImage)}>
                <span className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full 
                  bg-white transition ${generateImage ? 'translate-x-4.5' : 'translate-x-0.5'}`}/>
              </div>
            </button>
            <button disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 
            px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleGenerate}>
              {loading ? (
                <>
                <Loader2Icon className="size-4 animate-spin" />
                <span>Generating...</span>
                </>
              ) : (
          <>
          Generate 
          <AIComposer className="size-4" />
          </>
              )}
            </button>
          </div>

        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {tones.map((t) => (
            <button key={t} className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${tone === t ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`} onClick={() => setTone(t)}>
              {t}
            </button>
          ))}

        </div>
      </div>
      {/* AI Generated Posts */}
      <div className="space-y-6 pt-12 border-t border-slate-100 ">
        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-2">
            <HistoryIcon className="size-5" />
            <h2 className="text-xl">Recent Generations</h2>
          </div>
          <span className="text-sm text-slate-500 bg-slate-50 px-2">
            {generations.length} total
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {generations.map((gen) => (
            <div key={gen.id} className="group bg-white rounded-2xl border border-slate-100 p-5 
            hover:border-red-200 transition-all relative overflow-hidden">
              <div className="flex flex-col h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">
                    {new Date(gen.createdAt).toLocaleString()}
                  </span>
                   <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                    {gen.tone}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">{gen.content}</p>
                {gen.mediaUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-50 bg-slate-50">
                    <img src={gen.mediaUrl} alt="Generated media" className="w-full h-auto aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
                  <div className="flex item-center gap-2 pt-2">
                    <button onClick={()=>setActiveScheduler(gen)} className="flex-1 bg-slate-100 hover:bg-red-500 hover:text-white 
                    text-slate-600 text-xs py-2.5 rounded-lg transition-all ">
                      Schedule Post
                    </button>
                    </div>

                </div>
              </div>

              ))}
              {
                generations.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-2">]
                  <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                    <Wand2Icon className="size-6"/>
                    </div>
                    <p>No content generated yet. Try generating some content using the AI.</p>
                    </div>
                )
              }
        </div>
      </div>
      {/* Scheduler Modal */}
      {activeScheduler && (
   <div className="fixed insert-0 min-h-screen z-50 flex items-center justify-center p-4 
   bg-slate-900/40 backdrop-blur-md animation-in fade-in duration-300 ">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-slate-50/30">
        <h3 className="text-slate-900 ">Schedule Generation</h3>
        <button onClick={()=> setActiveScheduler(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-100 text-slate-400 transition-colors"> 
          <XIcon className="size-5"/>
        </button>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
          <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
          {activeScheduler.mediaUrl && <img src={activeScheduler.mediaUrl alt="preview" className="w-full aspect-video object-cover rounded-xl border border-slate-200 shadow-sm" />}
          
          <div>
            </div>
            <div className="p-8 bg-slate-50/50 border-t border-slate-50 space-y-8">
              {/* options */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs text-slate-600 uppercase tracking-widest md-4">Select Channels</label>
                <div>
                  {PLATFORMS.map((p)=> {
                    const active= selectedPlatforms.includes(p.id);
                    return (
                      <button key={p.id} onClick={()=> setSelectedPlatforms((prev)=>(prev.includes(p.id)? prev.filter((x)=> x !==p.id): [...prev, p.id ]))}
                      className="{`p-2.5 rounded-md border text-xs ${active ? "bg-red-500/80 text-white" : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 "}`}>

                      <p.icon clasName="size-4.5"/>

                      </button>
                    )
                  })}
                </div>
                </div>
                <div>
                  </div>
            </div>
            </div>
</div>
    </div>
   </div>
)}

    </div>
  )
}

export default AIComposer