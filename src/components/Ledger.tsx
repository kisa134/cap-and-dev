import React from 'react';
import { LedgerEntry } from '../types';

interface LedgerProps {
  entries: LedgerEntry[];
}

const Ledger: React.FC<LedgerProps> = ({ entries }) => {
  return (
    <div className="w-full font-mono text-xs">
      <div className="border border-white/20 mb-2 p-2 flex justify-between items-center bg-white/5">
        <span className="uppercase tracking-widest">Immutable Log</span>
        <span>BLOCKS: {entries.length}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20 text-white/40 uppercase tracking-wider">
              <th className="p-3 font-normal">Time</th>
              <th className="p-3 font-normal">Entity</th>
              <th className="p-3 font-normal">Operation</th>
              <th className="p-3 font-normal">Result</th>
              <th className="p-3 font-normal">Hash / Metadata</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-12 text-center text-white/30 border-b border-white/10">
                  // SYSTEM IDLE. WAITING FOR INPUT.
                </td>
              </tr>
            ) : (
              entries.slice().reverse().map((entry) => (
                <tr key={entry.id} className="border-b border-white/10 hover:bg-white hover:text-black transition-colors group">
                  <td className="p-3 opacity-60 group-hover:opacity-100">{new Date(entry.timestamp).toLocaleTimeString()}</td>
                  <td className="p-3 font-bold">{entry.entityId}</td>
                  <td className="p-3">{entry.action}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 border text-[10px] uppercase tracking-wider ${
                      entry.status === 'SUCCESS' 
                        ? 'border-white group-hover:border-black' 
                        : 'border-white/40 text-white/40 group-hover:border-black/40 group-hover:text-black/60'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="p-3 opacity-60 truncate max-w-[200px] group-hover:opacity-100">
                     {entry.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ledger;