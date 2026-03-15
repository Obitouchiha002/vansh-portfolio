import { useState } from 'react';
import { Calculator, ArrowRightLeft, FileDigit } from 'lucide-react';

interface UtilityToolsProps {
  toolType: 'unit-converter' | 'file-size';
}

export default function UtilityTools({ toolType }: UtilityToolsProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [result, setResult] = useState<string | null>(null);

  const [fileSizeInput, setFileSizeInput] = useState<string>('');
  const [fileSizeUnit, setFileSizeUnit] = useState<string>('MB');
  const [fileSizeResult, setFileSizeResult] = useState<any>(null);

  const units = {
    length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch'],
    weight: ['kilogram', 'gram', 'milligram', 'metric ton', 'pound', 'ounce'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  };

  const convertUnit = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return;

    // Simplified conversion logic for demonstration
    // In a real app, you'd use a comprehensive conversion library
    let converted = val;
    if (fromUnit === 'meter' && toUnit === 'kilometer') converted = val / 1000;
    if (fromUnit === 'kilometer' && toUnit === 'meter') converted = val * 1000;
    if (fromUnit === 'kilogram' && toUnit === 'pound') converted = val * 2.20462;
    if (fromUnit === 'pound' && toUnit === 'kilogram') converted = val / 2.20462;
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') converted = (val * 9/5) + 32;
    if (fromUnit === 'fahrenheit' && toUnit === 'celsius') converted = (val - 32) * 5/9;

    setResult(`${converted.toFixed(4)} ${toUnit}`);
  };

  const calculateFileSize = () => {
    const val = parseFloat(fileSizeInput);
    if (isNaN(val)) return;

    let bytes = val;
    if (fileSizeUnit === 'KB') bytes = val * 1024;
    if (fileSizeUnit === 'MB') bytes = val * 1024 * 1024;
    if (fileSizeUnit === 'GB') bytes = val * 1024 * 1024 * 1024;

    setFileSizeResult({
      bytes: bytes,
      kb: bytes / 1024,
      mb: bytes / (1024 * 1024),
      gb: bytes / (1024 * 1024 * 1024)
    });
  };

  return (
    <div className="w-full space-y-6">
      {toolType === 'unit-converter' && (
        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-6">
            <Calculator size={24} className="text-purple-500" />
            Unit Converter
          </h3>
          
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">From</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
                      setInputValue(val);
                    }
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter value"
                />
                <select 
                  value={fromUnit} 
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none"
                >
                  {Object.values(units).flat().map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button 
                onClick={() => {
                  const temp = fromUnit;
                  setFromUnit(toUnit);
                  setToUnit(temp);
                }}
                className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 text-zinc-300 transition-colors"
              >
                <ArrowRightLeft size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">To</label>
              <div className="flex gap-2">
                <select 
                  value={toUnit} 
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none"
                >
                  {Object.values(units).flat().map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col items-center">
            <button 
              onClick={convertUnit}
              className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors w-full sm:w-auto"
            >
              Convert
            </button>
            
            {result && (
              <div className="mt-6 text-center">
                <p className="text-sm text-zinc-400 mb-1">Result:</p>
                <p className="text-3xl font-bold text-neon-green">{result}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {toolType === 'file-size' && (
        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-6">
            <FileDigit size={24} className="text-purple-500" />
            File Size Calculator
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={fileSizeInput} 
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  setFileSizeInput(val);
                }
              }}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:border-purple-500 focus:outline-none text-lg"
              placeholder="Enter file size"
            />
            <select 
              value={fileSizeUnit} 
              onChange={(e) => setFileSizeUnit(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-6 py-3 text-zinc-100 focus:border-purple-500 focus:outline-none text-lg font-bold"
            >
              <option value="Bytes">Bytes</option>
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option value="GB">GB</option>
            </select>
            <button 
              onClick={calculateFileSize}
              className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
            >
              Calculate
            </button>
          </div>

          {fileSizeResult && (
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-400 mb-1">Bytes</p>
                <p className="text-xl font-mono text-zinc-100">{fileSizeResult.bytes.toLocaleString()}</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-400 mb-1">Kilobytes (KB)</p>
                <p className="text-xl font-mono text-zinc-100">{fileSizeResult.kb.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-400 mb-1">Megabytes (MB)</p>
                <p className="text-xl font-mono text-neon-green font-bold">{fileSizeResult.mb.toLocaleString(undefined, {maximumFractionDigits: 4})}</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-400 mb-1">Gigabytes (GB)</p>
                <p className="text-xl font-mono text-neon-blue font-bold">{fileSizeResult.gb.toLocaleString(undefined, {maximumFractionDigits: 6})}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
