import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Upload, AlertCircle, RefreshCw, QrCode } from 'lucide-react';
import { getDocumentos } from '../data/mockDatabase';
import RRVLogo from './RRVLogo';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeScanned: (code: string) => void;
}

export default function ScannerModal({ isOpen, onClose, onCodeScanned }: ScannerModalProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const sampleDocs = getDocumentos();

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setErrorMsg(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Câmera não suportada neste dispositivo.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);

      // Native BarcodeDetector API if available
      if ('BarcodeDetector' in window) {
        const barcodeDetector = new (window as any).BarcodeDetector({
          formats: ['qr_code']
        });

        const scanLoop = async () => {
          if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
            try {
              const barcodes = await barcodeDetector.detect(videoRef.current);
              if (barcodes && barcodes.length > 0) {
                const rawValue = barcodes[0].rawValue;
                handleCodeExtracted(rawValue);
                return;
              }
            } catch (e) {
              // continue loop
            }
          }
          animationFrameRef.current = requestAnimationFrame(scanLoop);
        };
        animationFrameRef.current = requestAnimationFrame(scanLoop);
      }
    } catch (err: any) {
      console.warn('Não foi possível iniciar a câmera:', err);
      setCameraActive(false);
      setErrorMsg('Não foi possível acessar a câmera do dispositivo. Você pode escolher um documento de amostra ou carregar uma imagem do QR Code.');
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleCodeExtracted = (rawText: string) => {
    stopCamera();
    let code = rawText.trim();
    try {
      if (code.includes('?')) {
        const url = new URL(code.startsWith('http') ? code : `https://${code}`);
        const param = url.searchParams.get('codigo') || url.searchParams.get('uuid') || url.searchParams.get('id');
        if (param) {
          code = param;
        }
      }
    } catch (e) {
      // ignore
    }
    onCodeScanned(code);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    if ('BarcodeDetector' in window) {
      createImageBitmap(file)
        .then(async (bitmap) => {
          const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
          const barcodes = await barcodeDetector.detect(bitmap);
          if (barcodes.length > 0) {
            handleCodeExtracted(barcodes[0].rawValue);
          } else {
            setErrorMsg('Nenhum QR Code legível foi detectado na imagem selecionada.');
          }
        })
        .catch(() => {
          setErrorMsg('Falha ao processar a imagem do QR Code.');
        })
        .finally(() => setIsProcessing(false));
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        handleCodeExtracted('6bccd30d-c287-4002-91c5-f07bba3907bc');
      }, 700);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f1f3d]/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#162e5b] text-white">
          <div className="flex items-center space-x-2 font-black text-base">
            <RRVLogo variant="emblem" className="w-6 h-6" />
            <span>Leitor de QR Code • RRV SST</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {cameraActive ? (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center border-2 border-[#162e5b]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-dashed border-[#80b833] m-8 rounded-xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] bg-[#162e5b]/80 text-white px-3 py-1 rounded-full font-bold">
                  Aponte para o QR Code do documento
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-[#f3f9eb]/50 border border-[#c8e49b] rounded-xl p-5 text-center space-y-3">
              <div className="w-12 h-12 bg-[#162e5b] text-[#80b833] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <Camera size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#162e5b]">Câmera do Dispositivo</p>
                <p className="text-xs text-slate-600 mt-1">
                  Ative a câmera ou carregue a foto do QR Code emitido pela RRV Consultoria.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 text-left flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={startCamera}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#162e5b] hover:bg-[#0f1f3d] text-white text-xs font-bold transition shadow"
                >
                  <RefreshCw size={14} className="text-[#80b833]" />
                  <span>Tentar Ativar Câmera</span>
                </button>

                <label className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold cursor-pointer transition">
                  <Upload size={14} className="text-[#162e5b]" />
                  <span>{isProcessing ? 'Lendo...' : 'Carregar Imagem'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Quick Clickable Samples */}
          <div>
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Ou selecione um documento de teste da RRV:
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {sampleDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleCodeExtracted(doc.codigoDocumento)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#80b833] hover:bg-[#f3f9eb] transition flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="block text-xs font-bold text-slate-800 truncate group-hover:text-[#162e5b]">
                      {doc.tipoDocumento}
                    </span>
                    <span className="block text-[11px] text-slate-500 truncate">
                      {doc.trabalhador} • {doc.empresa}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold shrink-0 ${
                    doc.statusTipo === 'valido' ? 'bg-[#f3f9eb] text-[#162e5b] border border-[#c8e49b]' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doc.statusTipo.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
